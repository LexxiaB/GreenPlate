package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.FarmerBid;
import com.ByteTech.GreenPlate.model.RestaurantOffer;
import com.ByteTech.GreenPlate.Repository.FarmerBidRepository;
import com.ByteTech.GreenPlate.Repository.RestaurantOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmerBidService {
    private final FarmerBidRepository bidRepo;
    private final RestaurantOfferRepository offerRepo;

    public FarmerBid placeBid(Long offerId, FarmerBid bid) {
        RestaurantOffer offer = offerRepo.findById(offerId).orElseThrow();
        bid.setRestaurantOffer(offer);
        return bidRepo.save(bid);
    }

    public List<FarmerBid> getBidsForOffer(Long offerId) {
        RestaurantOffer offer = offerRepo.findById(offerId).orElseThrow();
        return offer.getBids();
    }
}
