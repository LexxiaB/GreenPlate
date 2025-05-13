package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.FarmerListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FarmerListingRepository extends JpaRepository<FarmerListing,UUID> {
    List<FarmerListing> findByFarmer_UserId(UUID farmerUserId);
}