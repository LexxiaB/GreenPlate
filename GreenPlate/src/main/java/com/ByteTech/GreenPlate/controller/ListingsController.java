package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.ListingsService;
import com.ByteTech.GreenPlate.model.Listings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/listings")
public class ListingsController {

    private final ListingsService service;

    @Autowired
    public ListingsController(ListingsService service) {
        this.service = service;
    }

    @PostMapping
    public Listings createListing(@RequestBody Listings listing) {
        return service.save(listing);
    }

    @GetMapping
    public List<Listings> getAllListings() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Listings> getListingById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Listings updateListing(@PathVariable UUID id, @RequestBody Listings updated) {
        return service.updateListing(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deleteListing(@PathVariable UUID id) {
        service.delete(id);
    }
}
