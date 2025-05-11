package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.Listings;
import com.ByteTech.GreenPlate.Service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{consumerId}")
    public ResponseEntity<List<Listings>> recommend(@PathVariable String consumerId) {
        List<Listings> recs = recommendationService.getRecommendationsForConsumer(consumerId);
        return ResponseEntity.ok(recs);
    }
}

