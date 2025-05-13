package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.FarmerListingDto;
import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.model.ListingView;
import com.ByteTech.GreenPlate.Repository.ListingViewRepository;
import com.ByteTech.GreenPlate.Service.FarmerListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/produce-listings")
public class FarmerListingController {

    private final FarmerListingService      service;
    private final ListingViewRepository     viewRepo;

    @Autowired
    public FarmerListingController(
            FarmerListingService service,
            ListingViewRepository viewRepo
    ) {
        this.service  = service;
        this.viewRepo = viewRepo;
    }

    /**
     * Retrieve a single produce listing by ID and record a view event.
     */
    @GetMapping("/{id}")
    public FarmerListing getById(@PathVariable UUID id) {
        viewRepo.save(new ListingView(null, id, Instant.now()));
        return service.getFarmerListingById(id);
    }

    /** List all produce listings */
    @GetMapping
    public List<FarmerListing> getAll() {
        return service.getAllFarmerListings();
    }

    /** Create a new produce listing */
    @PostMapping
    public FarmerListing create(@RequestBody FarmerListingDto dto) {
        return service.createListing(dto);
    }

    /** Update an existing produce listing */
    @PutMapping("/{id}")
    public FarmerListing update(
            @PathVariable UUID id,
            @RequestBody FarmerListingDto dto
    ) {
        return service.updateListing(id, dto);
    }

    /** Delete a produce listing */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteFarmerListing(id);
    }
}
