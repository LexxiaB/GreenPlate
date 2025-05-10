package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Farmer;
import com.ByteTech.GreenPlate.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RestaurantRepository extends JpaRepository<Restaurant, UUID> {
    // User findByUsername(String username);
}