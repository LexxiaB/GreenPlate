package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.RestaurantListingDto;
import com.ByteTech.GreenPlate.model.ListingView;
import com.ByteTech.GreenPlate.model.RestaurantListing;
import com.ByteTech.GreenPlate.Repository.ListingViewRepository;
import com.ByteTech.GreenPlate.Service.RestaurantListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/restaurant-listings")
public class RestaurantListingController {

    private final RestaurantListingService service;
    private final ListingViewRepository     viewRepo;

    @Autowired
    public RestaurantListingController(
            RestaurantListingService service,
            ListingViewRepository viewRepo
    ) {
        this.service = service;
        this.viewRepo = viewRepo;
    }

    /**
     * Retrieve a single listing and record a view event
     */
    @GetMapping("/{id}")
    public RestaurantListing getById(@PathVariable UUID id) {
        // record a view event
        viewRepo.save(new ListingView(null, id, Instant.now()));
        return service.getRestaurantListingById(id);
    }

    /** List all restaurant listings */
    @GetMapping
    public List<RestaurantListing> getAll() {
        return service.getAllRestaurantListings();
    }

    /** Create a new restaurant listing */
    @PostMapping
    public RestaurantListing create(@RequestBody RestaurantListingDto dto) {
        return service.createListing(dto);
    }

    /** Update an existing restaurant listing */
    @PutMapping("/{id}")
    public RestaurantListing update(
            @PathVariable UUID id,
            @RequestBody RestaurantListingDto dto
    ) {
        return service.updateListing(id, dto);
    }

    /** Delete a restaurant listing */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteRestaurantListing(id);
    }
}
