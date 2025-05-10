package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.DietaryPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DietaryPreferenceRepository extends JpaRepository<DietaryPreference, String> {
}
