package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FarmerRepository extends JpaRepository<Farmer, UUID> {
    // User findByUsername(String username);
}