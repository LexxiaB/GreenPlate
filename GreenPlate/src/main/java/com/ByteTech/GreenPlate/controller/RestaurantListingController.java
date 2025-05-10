package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.Service.RestaurantListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant-listings")
public class RestaurantListingController {

    private final RestaurantListingService restaurantListingService;

    public RestaurantListingController(RestaurantListingService restaurantListingService) {
        this.restaurantListingService = restaurantListingService;
    }

    @GetMapping
    public List<RestaurantListing> getAllListings() {
        return restaurantListingService.getAllRestaurantListings();
    }

    @GetMapping("/{id}")
    public RestaurantListing getListingById(@PathVariable String id) {
        return restaurantListingService.getRestaurantListingId(id);
    }

    @PostMapping
    public RestaurantListing saveRestaurantListing(@RequestBody RestaurantListing listing) {
        return restaurantListingService.saveRestaurantListing(listing);
    }

    @PutMapping("/{id}")
    public RestaurantListing updateListing(@PathVariable String id, @RequestBody RestaurantListing updatedListing) {
        return restaurantListingService.updateRestaurantListing(id, updatedListing);
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurantListing(@PathVariable String id) {
        restaurantListingService.deleteRestaurantListing(id);
    }
}
