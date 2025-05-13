package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.NutritionalFacts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NutritionalFactsRepository extends JpaRepository<NutritionalFacts, UUID> {
}
