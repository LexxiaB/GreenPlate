package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.dto.FarmerListingDto;
import com.ByteTech.GreenPlate.model.FarmerListing;
import com.ByteTech.GreenPlate.model.Farmer;
import com.ByteTech.GreenPlate.Repository.FarmerListingRepository;
import com.ByteTech.GreenPlate.Repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class FarmerListingService {

    private final FarmerListingRepository listingRepo;
    private final FarmerRepository         farmerRepo;

    @Autowired
    public FarmerListingService(FarmerListingRepository listingRepo,
                                FarmerRepository farmerRepo) {
        this.listingRepo = listingRepo;
        this.farmerRepo  = farmerRepo;
    }

    /** Fetch all listings */
    public List<FarmerListing> getAllFarmerListings() {
        return listingRepo.findAll();
    }

    /** Fetch a single listing by UUID */
    public FarmerListing getFarmerListingById(UUID id) {
        return listingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Listing not found: " + id));
    }

    /** Create a new listing */
    public FarmerListing createListing(FarmerListingDto dto) {
        // 1) Lookup the Farmer (who is also the seller)
        Farmer farmer = farmerRepo.findById(dto.getFarmerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Farmer not found: " + dto.getFarmerId()));

        // 2) Build and save
        FarmerListing listing = new FarmerListing();
        listing.setSeller(farmer);    // from Listings.java: seller is a User :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
        listing.setFarmer(farmer);    // from FarmerListing.java: farmer is a Farmer :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}

        listing.setName(dto.getName());
        listing.setBasePrice(dto.getBasePrice());
        listing.setCurrentPrice(dto.getCurrentPrice());
        listing.setQuantity(dto.getQuantity());
        listing.setDescription(dto.getDescription());
        listing.setExpiryDate(dto.getExpiryDate());
        listing.setHarvestDate(dto.getHarvestDate());
        listing.setMinDiscount(dto.getMinDiscount());
        listing.setMaxDiscount(dto.getMaxDiscount());
        listing.setDateCreated(dto.getDateCreated());
        listing.setIsDynamicPricing(dto.getIsDynamicPricing());
        listing.setIsDelivery(dto.getIsDelivery());
        listing.setPickupOptions(dto.getPickupOptions());
        listing.setListingType(dto.getListingType());

        return listingRepo.save(listing);
    }

    /** Update an existing listing (must be same farmer) */
    public FarmerListing updateListing(UUID listingId, FarmerListingDto dto) {
        return listingRepo.findById(listingId).map(listing -> {
            // enforce farmer == owner
            if (!listing.getFarmer().getUserId().equals(dto.getFarmerId())) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN, "You are not the owner of this listing");
            }

            listing.setName(dto.getName());
            listing.setBasePrice(dto.getBasePrice());
            listing.setCurrentPrice(dto.getCurrentPrice());
            listing.setQuantity(dto.getQuantity());
            listing.setDescription(dto.getDescription());
            listing.setExpiryDate(dto.getExpiryDate());
            listing.setHarvestDate(dto.getHarvestDate());
            listing.setMinDiscount(dto.getMinDiscount());
            listing.setMaxDiscount(dto.getMaxDiscount());
            listing.setDateCreated(dto.getDateCreated());
            listing.setIsDynamicPricing(dto.getIsDynamicPricing());
            listing.setIsDelivery(dto.getIsDelivery());
            listing.setPickupOptions(dto.getPickupOptions());
            listing.setListingType(dto.getListingType());

            return listingRepo.save(listing);
        }).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Listing not found: " + listingId));
    }

    /** Delete by UUID (404 if missing) */
    public void deleteFarmerListing(UUID id) {
        if (!listingRepo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Listing not found: " + id);
        }
        listingRepo.deleteById(id);
    }
}
