package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.DietaryPreference;
import com.ByteTech.GreenPlate.Repository.DietaryPreferenceRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class DietaryPreferenceService {

    private final DietaryPreferenceRepository dietaryPreferenceRepository;

    @Autowired
    public DietaryPreferenceService(DietaryPreferenceRepository dietaryPreferenceRepository) {
        this.dietaryPreferenceRepository = dietaryPreferenceRepository;
    }
    public DietaryPreference saveDietaryPreference (DietaryPreference dietaryPreference){
        return dietaryPreferenceRepository.save(dietaryPreference);
    }

    public List<DietaryPreference> getAllDietaryPreferences() {
        return dietaryPreferenceRepository.findAll();
    }

    public Optional<DietaryPreference> getDietaryPreferenceId(String id) {
        return dietaryPreferenceRepository.findById(id);
    }

    public void deleteDietaryPreference(String id) {
        dietaryPreferenceRepository.deleteById(id);
    }
    public DietaryPreference updateDietaryPreference(String id, DietaryPreference updatedPreference) {
        return dietaryPreferenceRepository.findById(id).map(pref -> {
            pref.setLactoseFree(updatedPreference.isLactoseFree());
            pref.setGlutenFree(updatedPreference.isGlutenFree());
            pref.setVegetarian(updatedPreference.isVegetarian());
            pref.setVegan(updatedPreference.isVegan());
            pref.setNutAllergy(updatedPreference.isNutAllergy());
            pref.setShellfishAllergy(updatedPreference.isShellfishAllergy());
            pref.setHalal(updatedPreference.isHalal());
            pref.setKosher(updatedPreference.isKosher());
            pref.setLowCholesterol(updatedPreference.isLowCholesterol());
            pref.setLowSugar(updatedPreference.isLowSugar());
            pref.setOther(updatedPreference.getOther());
            pref.setConsumer(updatedPreference.getConsumer());

            return dietaryPreferenceRepository.save(pref);
        }).orElseThrow(() -> new RuntimeException("DietaryPreference not found with id: " + id));
    }

}

