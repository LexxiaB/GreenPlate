package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.DietaryPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DietaryPreferenceRepository extends JpaRepository<DietaryPreference, String> {
    Optional<DietaryPreference> findByConsumerUserId(UUID consumerId);

}
