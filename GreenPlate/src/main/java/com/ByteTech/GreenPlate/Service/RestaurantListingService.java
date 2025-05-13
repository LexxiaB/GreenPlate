package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.dto.RestaurantListingDto;
import com.ByteTech.GreenPlate.dto.NutritionalFactsDto;
import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.model.Restaurant;
import com.ByteTech.GreenPlate.model.NutritionalFacts;
import com.ByteTech.GreenPlate.Repository.RestaurantListingRepository;
import com.ByteTech.GreenPlate.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class RestaurantListingService {

    private final RestaurantListingRepository listingRepo;
    private final RestaurantRepository        restaurantRepo;

    @Autowired
    public RestaurantListingService(
            RestaurantListingRepository listingRepo,
            RestaurantRepository restaurantRepo
    ) {
        this.listingRepo    = listingRepo;
        this.restaurantRepo = restaurantRepo;
    }

    public List<RestaurantListing> getAllRestaurantListings() {
        return listingRepo.findAll();
    }

    public RestaurantListing getRestaurantListingById(UUID id) {
        return listingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Listing not found: " + id));
    }

    public RestaurantListing createListing(RestaurantListingDto dto) {
        Restaurant restaurant = restaurantRepo.findById(dto.getRestaurantId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Restaurant not found: " + dto.getRestaurantId()));

        NutritionalFactsDto nfDto = dto.getNutritionalFacts();
        NutritionalFacts nf = new NutritionalFacts();
        nf.setCalories(nfDto.getCalories());
        nf.setFat(nfDto.getFat());
        nf.setProtein(nfDto.getProtein());
        nf.setCarbs(nfDto.getCarbs());
        nf.setFiber(nfDto.getFiber());
        nf.setLactoseFree(nfDto.getLactoseFree());
        nf.setGlutenFree(nfDto.getGlutenFree());
        nf.setVegetarian(nfDto.getVegetarian());
        nf.setVegan(nfDto.getVegan());
        nf.setNutFree(nfDto.getNutFree());
        nf.setShellfishFree(nfDto.getShellfishFree());
        nf.setHalal(nfDto.getHalal());
        nf.setKosher(nfDto.getKosher());
        nf.setLowCholesterol(nfDto.getLowCholesterol());
        nf.setLowSugar(nfDto.getLowSugar());

        RestaurantListing listing = new RestaurantListing();
        listing.setSeller(restaurant);
        listing.setRestaurant(restaurant);
        listing.setName(dto.getName());
        listing.setBasePrice(dto.getBasePrice());
        listing.setCurrentPrice(dto.getCurrentPrice());
        listing.setQuantity(dto.getQuantity());
        listing.setDescription(dto.getDescription());
        listing.setExpiryDate(dto.getExpiryDate());
        listing.setMinDiscount(dto.getMinDiscount());
        listing.setMaxDiscount(dto.getMaxDiscount());
        listing.setDateCreated(dto.getDateCreated());
        listing.setIsDynamicPricing(dto.getIsDynamicPricing());
        listing.setIsDelivery(dto.getIsDelivery());
        listing.setPickupOptions(dto.getPickupOptions());
        listing.setListingType(dto.getListingType());
        listing.setNutritionalFacts(nf);
        listing.setDietaryTag(dto.getDietaryTag());
        listing.setOvernightFood(dto.getIsOvernightFood());

        return listingRepo.save(listing);
    }

    public RestaurantListing updateListing(UUID listingId, RestaurantListingDto dto) {
        return listingRepo.findById(listingId)
                .map(listing -> {
                    if (!listing.getRestaurant().getUserId().equals(dto.getRestaurantId())) {
                        throw new ResponseStatusException(
                                HttpStatus.FORBIDDEN,
                                "You are not the owner of this listing"
                        );
                    }

                    Restaurant restaurant = restaurantRepo.findById(dto.getRestaurantId())
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Restaurant not found: " + dto.getRestaurantId()));
                    listing.setRestaurant(restaurant);

                    NutritionalFactsDto nfDto = dto.getNutritionalFacts();
                    NutritionalFacts nf = new NutritionalFacts();
                    nf.setCalories(nfDto.getCalories());
                    nf.setFat(nfDto.getFat());
                    nf.setProtein(nfDto.getProtein());
                    nf.setCarbs(nfDto.getCarbs());
                    nf.setFiber(nfDto.getFiber());
                    nf.setLactoseFree(nfDto.getLactoseFree());
                    nf.setGlutenFree(nfDto.getGlutenFree());
                    nf.setVegetarian(nfDto.getVegetarian());
                    nf.setVegan(nfDto.getVegan());
                    nf.setNutFree(nfDto.getNutFree());
                    nf.setShellfishFree(nfDto.getShellfishFree());
                    nf.setHalal(nfDto.getHalal());
                    nf.setKosher(nfDto.getKosher());
                    nf.setLowCholesterol(nfDto.getLowCholesterol());
                    nf.setLowSugar(nfDto.getLowSugar());
                    listing.setNutritionalFacts(nf);

                    listing.setName(dto.getName());
                    listing.setBasePrice(dto.getBasePrice());
                    listing.setCurrentPrice(dto.getCurrentPrice());
                    listing.setQuantity(dto.getQuantity());
                    listing.setDescription(dto.getDescription());
                    listing.setExpiryDate(dto.getExpiryDate());
                    listing.setMinDiscount(dto.getMinDiscount());
                    listing.setMaxDiscount(dto.getMaxDiscount());
                    listing.setDateCreated(dto.getDateCreated());
                    listing.setIsDynamicPricing(dto.getIsDynamicPricing());
                    listing.setIsDelivery(dto.getIsDelivery());
                    listing.setPickupOptions(dto.getPickupOptions());
                    listing.setListingType(dto.getListingType());
                    listing.setDietaryTag(dto.getDietaryTag());
                    listing.setOvernightFood(dto.getIsOvernightFood());

                    return listingRepo.save(listing);
                })
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Listing not found: " + listingId
                ));
    }

    public void deleteRestaurantListing(UUID id) {
        if (!listingRepo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Listing not found: " + id
            );
        }
        listingRepo.deleteById(id);
    }
}