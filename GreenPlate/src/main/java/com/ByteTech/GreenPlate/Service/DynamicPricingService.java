package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.model.OrderItem;
import com.ByteTech.GreenPlate.Repository.FarmerListingRepository;
import com.ByteTech.GreenPlate.Repository.RestaurantListingRepository;
import com.ByteTech.GreenPlate.Repository.CartItemRepository;
import com.ByteTech.GreenPlate.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class DynamicPricingService {

    private final FarmerListingRepository       farmerRepo;
    private final RestaurantListingRepository   restaurantRepo;
    private final CartItemRepository            cartItemRepo;
    private final OrderItemRepository           orderItemRepo;

    @Autowired
    public DynamicPricingService(
            FarmerListingRepository farmerRepo,
            RestaurantListingRepository restaurantRepo,
            CartItemRepository cartItemRepo,
            OrderItemRepository orderItemRepo
    ) {
        this.farmerRepo     = farmerRepo;
        this.restaurantRepo = restaurantRepo;
        this.cartItemRepo   = cartItemRepo;
        this.orderItemRepo  = orderItemRepo;
    }

    /**
     * Run hourly to adjust prices based on demand and expiration urgency.
     */
    @Scheduled(cron = "0 0 * * * *")
    public void adjustAllListings() {
        farmerRepo.findAll().forEach(this::adjustFarmerListingPrice);
        restaurantRepo.findAll().forEach(this::adjustRestaurantListingPrice);
    }

    private void adjustFarmerListingPrice(FarmerListing listing) {
        adjustPrice(
                listing.getListingId(),
                BigDecimal.valueOf(listing.getBasePrice()),
                listing.getDateCreated().toInstant().atZone(ZoneId.systemDefault()),
                listing.getExpiryDate().toInstant().atZone(ZoneId.systemDefault()),
                listing.getMinDiscount(),
                listing.getMaxDiscount(),
                /* produce */ true
        );
    }

    private void adjustRestaurantListingPrice(RestaurantListing listing) {
        adjustPrice(
                listing.getListingId(),
                BigDecimal.valueOf(listing.getBasePrice()),
                listing.getDateCreated().toInstant().atZone(ZoneId.systemDefault()),
                listing.getExpiryDate().toInstant().atZone(ZoneId.systemDefault()),
                listing.getMinDiscount(),
                listing.getMaxDiscount(),
                /* produce */ false
        );
    }

    private void adjustPrice(
            UUID listingId,
            BigDecimal originalPrice,
            ZonedDateTime createdAt,
            ZonedDateTime expiresAt,
            int minDiscount,
            int maxDiscount,
            boolean isProduce
    ) {
        // 24h window
        Instant now = Instant.now();
        Date since = Date.from(now.minus(1, ChronoUnit.DAYS));
        LocalDateTime sinceLdt = LocalDateTime.ofInstant(now.minus(1, ChronoUnit.DAYS), ZoneId.systemDefault());

        int carts = isProduce
                ? cartItemRepo.countByProduce_ListingIdAndCreatedAtAfter(listingId, since)
                : cartItemRepo.countByMeal_ListingIdAndCreatedAtAfter(listingId, since);
        int orders = isProduce
                ? orderItemRepo.countByProduce_ListingIdAndCreatedAtAfter(listingId, sinceLdt)
                : orderItemRepo.countByMeal_ListingIdAndCreatedAtAfter(listingId, sinceLdt);

        Optional<OrderItem> lastOrderOpt = isProduce
                ? orderItemRepo.findFirstByProduce_ListingIdOrderByCreatedAtDesc(listingId)
                : orderItemRepo.findFirstByMeal_ListingIdOrderByCreatedAtDesc(listingId);
        ZonedDateTime lastOrderAt = lastOrderOpt
                .map(oi -> oi.getCreatedAt().atZone(ZoneId.systemDefault()))
                .orElse(createdAt);

        double orderConversionWeight = 0.3;
        double timeDecayWeight = 0.1;
        // Tunable parameters for the dynamic pricing formula
        double cartDemandWeight = 0.5;
        double expiryUrgencyWeight = 0.2;
        double newPrice = DynamicPricing.computeDynamicPrice(
                originalPrice.doubleValue(),
                createdAt,
                expiresAt,
                lastOrderAt,
                minDiscount,
                maxDiscount,
                cartDemandWeight,
                orderConversionWeight,
                timeDecayWeight,
                expiryUrgencyWeight,
                /* views */ 0,
                carts,
                orders,
                /* likes */ 0
        );

        // Persist the updated price
        BigDecimal updated = BigDecimal.valueOf(newPrice);
        if (isProduce) {
            FarmerListing fl = farmerRepo.findById(listingId).orElseThrow();
            fl.setCurrentPrice(updated.floatValue());
            farmerRepo.save(fl);
        } else {
            RestaurantListing rl = restaurantRepo.findById(listingId).orElseThrow();
            rl.setCurrentPrice(updated.floatValue());
            restaurantRepo.save(rl);
        }
    }
}
