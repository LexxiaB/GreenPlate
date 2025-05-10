package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.RestaurantOffer;
import com.ByteTech.GreenPlate.Service.RestaurantOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers")
@RequiredArgsConstructor
public class RestaurantOfferController {
    private final RestaurantOfferService offerService;

    @PostMapping
    public RestaurantOffer createOffer(@RequestBody RestaurantOffer offer) {
        return offerService.createOffer(offer);
    }

    @GetMapping
    public List<RestaurantOffer> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/{id}")
    public RestaurantOffer getOfferById(@PathVariable Long id) {
        return offerService.getOfferById(id);
    }
}
