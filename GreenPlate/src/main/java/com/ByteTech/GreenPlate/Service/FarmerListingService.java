package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.Repository.FarmerListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FarmerListingService {

    private final FarmerListingRepository farmerListingRepository;

    @Autowired
    public FarmerListingService(FarmerListingRepository farmerListingRepository) {
        this.farmerListingRepository = farmerListingRepository;
    }
    public FarmerListing saveFarmerListing (FarmerListing farmerListing){
        return farmerListingRepository.save(farmerListing);
    }

    public List<FarmerListing> getAllFarmerListings() {
        return farmerListingRepository.findAll();
    }

    public FarmerListing getFarmerListingId(String id) {
        return farmerListingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produce Listing not found with id: " + id));

    }

    public void deleteFarmerListing(String id) {
        farmerListingRepository.deleteById(id);
    }
    public FarmerListing updateFarmerListing(String id, FarmerListing updatedListing) {
        return farmerListingRepository.findById(id).map(listing -> {
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

            // Specific to FarmerListing
            listing.setFarmer(updatedListing.getFarmer());

            return farmerListingRepository.save(listing);
        }).orElseThrow(() -> new RuntimeException("FarmerListing not found with id: " + id));
    }

}
