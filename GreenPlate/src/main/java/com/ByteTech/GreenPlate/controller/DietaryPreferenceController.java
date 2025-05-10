package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.DietaryPreferenceService;
import com.ByteTech.GreenPlate.model.DietaryPreference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/dietary-preferences")
public class DietaryPreferenceController {

    private final DietaryPreferenceService preferenceService;

    @Autowired
    public DietaryPreferenceController(DietaryPreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @PostMapping
    public DietaryPreference createPreference(@RequestBody DietaryPreference preference) {
        return preferenceService.saveDietaryPreference(preference);
    }

    @GetMapping("/{id}")
    public Optional<DietaryPreference> getPreferenceById(@PathVariable String id) {
        return preferenceService.getDietaryPreferenceId(id);
    }

    @PutMapping("/{id}")
    public DietaryPreference updatePreference(@PathVariable String id, @RequestBody DietaryPreference updated) {
        return preferenceService.updateDietaryPreference(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deletePreference(@PathVariable String id) {
        preferenceService.deleteDietaryPreference(id);
    }
}
