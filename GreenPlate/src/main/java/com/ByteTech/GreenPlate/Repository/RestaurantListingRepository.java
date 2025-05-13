package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.RestaurantListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RestaurantListingRepository extends JpaRepository<RestaurantListing, UUID> {
}