package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.DietaryPreferenceService;
import com.ByteTech.GreenPlate.dto.DietaryPreferenceDto;
import com.ByteTech.GreenPlate.model.DietaryPreference;
import com.ByteTech.GreenPlate.security.UserDetails.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/dietary-preferences")
public class DietaryPreferenceController {

    private final DietaryPreferenceService preferenceService;

    @Autowired
    public DietaryPreferenceController(DietaryPreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    /**
     * Create or update the dietary preference for the currently authenticated consumer.
     * No consumerId in the JSON needed—it's taken from the JWT.
     */
    @PostMapping
    public DietaryPreference upsertPreference(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody DietaryPreferenceDto dto
    ) {
        UUID consumerId = userDetails.getId();
        return preferenceService.createOrUpdateForConsumer(consumerId, dto);
    }

    /**
     * Load the dietary preference for the current user.
     */
    @GetMapping
    public DietaryPreference getMyPreference(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        UUID consumerId = userDetails.getId();
        return preferenceService
                .getByConsumerId(consumerId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No dietary preference found for user " + consumerId
                ));
    }

    /**
     * Delete the current user's dietary preference.
     */
    @DeleteMapping
    public void deleteMyPreference(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        preferenceService.deleteByConsumerId(userDetails.getId());
    }
}
