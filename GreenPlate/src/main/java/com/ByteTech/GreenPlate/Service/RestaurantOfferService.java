package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.RestaurantOffer;
import com.ByteTech.GreenPlate.Repository.RestaurantOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantOfferService {
    private final RestaurantOfferRepository offerRepo;

    public RestaurantOffer createOffer(RestaurantOffer offer) {
        return offerRepo.save(offer);
    }

    public List<RestaurantOffer> getAllOffers() {
        return offerRepo.findAll();
    }

    public RestaurantOffer getOfferById(Long id) {
        return offerRepo.findById(id).orElseThrow();
    }
}
