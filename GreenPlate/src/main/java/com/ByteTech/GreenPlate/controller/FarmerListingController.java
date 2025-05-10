package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.Service.FarmerListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produce-listings")
public class FarmerListingController {

    private final FarmerListingService farmerListingService;

    public FarmerListingController(FarmerListingService farmerListingService) {
        this.farmerListingService = farmerListingService;
    }

    @GetMapping
    public List<FarmerListing> getAllFarmerListings() {
        return farmerListingService.getAllFarmerListings();
    }

    @GetMapping("/{id}")
    public FarmerListing getFarmerListingId(@PathVariable String id) {
        return farmerListingService.getFarmerListingId(id);
    }

    @PostMapping
    public FarmerListing saveFarmerListing(@RequestBody FarmerListing listing) {
        return farmerListingService.saveFarmerListing(listing);
    }

    @PutMapping("/{id}")
    public FarmerListing updateListing(@PathVariable String id, @RequestBody FarmerListing listing) {
        return farmerListingService.updateFarmerListing(id, listing);
    }

    @DeleteMapping("/{id}")
    public void deleteListing(@PathVariable String id) {
        farmerListingService.deleteFarmerListing(id);
    }
}
