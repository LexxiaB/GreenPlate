package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.RestaurantListingDto;
import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.Service.RestaurantListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/restaurant-listings")
public class RestaurantListingController {

    private final RestaurantListingService service;

    @Autowired
    public RestaurantListingController(RestaurantListingService service) {
        this.service = service;
    }

    @GetMapping
    public List<RestaurantListing> getAll() {
        return service.getAllRestaurantListings();
    }

    @GetMapping("/{id}")
    public RestaurantListing getById(@PathVariable UUID id) {
        return service.getRestaurantListingById(id);
    }

    @PostMapping
    public RestaurantListing create(@RequestBody RestaurantListingDto dto) {
        return service.createListing(dto);
    }

    @PutMapping("/{id}")
    public RestaurantListing update(
            @PathVariable UUID id,
            @RequestBody RestaurantListingDto dto
    ) {
        return service.updateListing(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteRestaurantListing(id);
    }
}
