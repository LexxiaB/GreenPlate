package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Consumer;
import com.ByteTech.GreenPlate.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConsumerRepository extends JpaRepository<Consumer, UUID> {
    // User findByUsername(String username);
}