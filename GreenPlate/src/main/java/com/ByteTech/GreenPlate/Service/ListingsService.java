package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.Repository.ListingsRepository;
import com.ByteTech.GreenPlate.model.Listings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListingsService {

    private final ListingsRepository repository;

    @Autowired
    public ListingsService(ListingsRepository repository) {
        this.repository = repository;
    }

    public Listings save(Listings listing) {
        return repository.save(listing);
    }

    public List<Listings> getAll() {
        return repository.findAll();
    }

    public Optional<Listings> getById(String id) {
        return repository.findById(id);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public Listings updateListing(String id, Listings updated) {
        return repository.findById(id).map(existing -> {
            existing.setSeller(updated.getSeller());
            existing.setName(updated.getName());
            existing.setBasePrice(updated.getBasePrice());
            existing.setQuantity(updated.getQuantity());
            existing.setDescription(updated.getDescription());
            existing.setExpiryDate(updated.getExpiryDate());
            existing.setMinDiscount(updated.getMinDiscount());
            existing.setMaxDiscount(updated.getMaxDiscount());
            existing.setDateCreated(updated.getDateCreated());
            existing.setIsDynamicPricing(updated.getIsDynamicPricing());
            existing.setIsDelivery(updated.getIsDelivery());
            existing.setPickupOptions(updated.getPickupOptions());
            existing.setListingType(updated.getListingType());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Listing not found with id: " + id));
    }
}
