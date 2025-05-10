package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Listings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingsRepository extends JpaRepository<Listings,String> {
    // User findByUsername(String username);
}