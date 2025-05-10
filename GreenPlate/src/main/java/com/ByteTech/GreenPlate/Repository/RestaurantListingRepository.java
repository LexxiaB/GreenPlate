package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.RestaurantListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantListingRepository extends JpaRepository<RestaurantListing,String> {
    // User findByUsername(String username);
}