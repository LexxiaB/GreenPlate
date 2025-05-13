package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Listings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ListingsRepository extends JpaRepository<Listings, UUID> {
    // User findByUsername(String username);
}