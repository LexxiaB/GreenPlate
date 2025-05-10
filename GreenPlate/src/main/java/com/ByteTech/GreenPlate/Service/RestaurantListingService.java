package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.Repository.RestaurantListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantListingService {

    private final RestaurantListingRepository restaurantListingRepository;

    @Autowired
    public RestaurantListingService(RestaurantListingRepository restaurantListingRepository) {
        this.restaurantListingRepository = restaurantListingRepository;
    }
    public RestaurantListing saveRestaurantListing (RestaurantListing restaurantListing){
        return restaurantListingRepository.save(restaurantListing);
    }

    public List<RestaurantListing> getAllRestaurantListings() {
        return restaurantListingRepository.findAll();
    }

    public RestaurantListing getRestaurantListingId(String id) {
        return restaurantListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));

    }

    public void deleteRestaurantListing(String id) {
        restaurantListingRepository.deleteById(id);
    }
    public RestaurantListing updateRestaurantListing(String id, RestaurantListing updatedListing) {
        return restaurantListingRepository.findById(id).map(listing -> {
            listing.setSeller(updatedListing.getSeller());
            listing.setName(updatedListing.getName());
            listing.setBasePrice(updatedListing.getBasePrice());
            listing.setQuantity(updatedListing.getQuantity());
            listing.setDescription(updatedListing.getDescription());
            listing.setExpiryDate(updatedListing.getExpiryDate());
            listing.setMinDiscount(updatedListing.getMinDiscount());
            listing.setMaxDiscount(updatedListing.getMaxDiscount());
            listing.setDateCreated(updatedListing.getDateCreated());
            listing.setIsDynamicPricing(updatedListing.getIsDynamicPricing());
            listing.setIsDelivery(updatedListing.getIsDelivery());
            listing.setPickupOptions(updatedListing.getPickupOptions());
            listing.setListingType(updatedListing.getListingType());

            // Specific to RestaurantListing
            listing.setNutritionalFacts(updatedListing.getNutritionalFacts());
            listing.setDietaryTag(updatedListing.getDietaryTag());
            listing.setOvernightFood(updatedListing.isOvernightFood());
            listing.setRestaurant(updatedListing.getRestaurant());

            return restaurantListingRepository.save(listing);
        }).orElseThrow(() -> new RuntimeException("RestaurantListing not found with id: " + id));
    }

}
