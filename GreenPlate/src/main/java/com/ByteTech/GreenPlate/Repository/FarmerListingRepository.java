package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.FarmerListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerListingRepository extends JpaRepository<FarmerListing,String> {
    // User findByUsername(String username);
}