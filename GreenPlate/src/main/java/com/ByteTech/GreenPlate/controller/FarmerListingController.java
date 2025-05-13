package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.FarmerListingDto;
import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.security.UserDetails.CustomUserDetails;
import com.ByteTech.GreenPlate.Service.FarmerListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/produce-listings")
public class FarmerListingController {

    private final FarmerListingService farmerListingService;

    @Autowired
    public FarmerListingController(FarmerListingService farmerListingService) {
        this.farmerListingService = farmerListingService;
    }

    /** List all farmer listings */
    @GetMapping
    public List<FarmerListing> getAllFarmerListings() {
        return farmerListingService.getAllFarmerListings();
    }

    /** Get a single listing by its ID */
    @GetMapping("/{id}")
    public FarmerListing getFarmerListingById(@PathVariable UUID id) {
        return farmerListingService.getFarmerListingById(id);
    }

    /**
     * Create a new listing.
     * The sellerId is derived from the authenticated user.
     */
    @PostMapping
    public FarmerListing createFarmerListing(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody FarmerListingDto dto
    ) {
        UUID sellerId = userDetails.getId();
        return farmerListingService.createListing(dto);
    }

    /**
     * Update an existing listing.
     * Ensures the sellerId from the JWT matches the one on the listing.
     */
    @PutMapping("/{id}")
    public FarmerListing updateFarmerListing(
            @PathVariable UUID id,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody FarmerListingDto dto
    ) {
        UUID sellerId = userDetails.getId();
        return farmerListingService.updateListing( id, dto);
    }

    /** Delete a listing by its ID */
    @DeleteMapping("/{id}")
    public void deleteFarmerListing(@PathVariable UUID id) {
        farmerListingService.deleteFarmerListing(id);
    }
}
