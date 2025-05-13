package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.dto.DietaryPreferenceDto;
import com.ByteTech.GreenPlate.model.Consumer;
import com.ByteTech.GreenPlate.model.DietaryPreference;
import com.ByteTech.GreenPlate.Repository.ConsumerRepository;
import com.ByteTech.GreenPlate.Repository.DietaryPreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DietaryPreferenceService {

    private final DietaryPreferenceRepository dietaryPreferenceRepository;
    private final ConsumerRepository consumerRepository;

    /**
     * Create or update the dietary preference for a given consumer.
     */
    public DietaryPreference createOrUpdateForConsumer(UUID consumerId, DietaryPreferenceDto dto) {
        Consumer consumer = consumerRepository.findById(consumerId)
                .orElseThrow(() -> new RuntimeException("Consumer not found with id: " + consumerId));

        // Try to load existing preference, or make a new one
        Optional<DietaryPreference> existing =
                dietaryPreferenceRepository.findByConsumerUserId(consumerId);
        DietaryPreference pref = existing.orElseGet(DietaryPreference::new);

        // Copy all flags from DTO
        pref.setLactoseFree(dto.isLactoseFree());
        pref.setGlutenFree(dto.isGlutenFree());
        pref.setVegetarian(dto.isVegetarian());
        pref.setVegan(dto.isVegan());
        pref.setNutAllergy(dto.isNutAllergy());
        pref.setShellfishAllergy(dto.isShellfishAllergy());
        pref.setHalal(dto.isHalal());
        pref.setKosher(dto.isKosher());
        pref.setLowCholesterol(dto.isLowCholesterol());
        pref.setLowSugar(dto.isLowSugar());
        pref.setOther(dto.getOther());

        // Ensure the link to the consumer
        pref.setConsumer(consumer);

        return dietaryPreferenceRepository.save(pref);
    }

    /**
     * Load the dietary preference for a consumer (by their ID).
     */
    public Optional<DietaryPreference> getByConsumerId(UUID consumerId) {
        return dietaryPreferenceRepository.findByConsumerUserId(consumerId);
    }

    /**
     * Delete the dietary preference for a consumer.
     */
    public void deleteByConsumerId(UUID consumerId) {
        dietaryPreferenceRepository.findByConsumerUserId(consumerId)
                .ifPresent(dietaryPreferenceRepository::delete);
    }
}
