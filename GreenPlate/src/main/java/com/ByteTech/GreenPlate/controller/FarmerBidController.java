package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.FarmerBid;
import com.ByteTech.GreenPlate.Service.FarmerBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers/{offerId}/bids")
@RequiredArgsConstructor
public class FarmerBidController {
    private final FarmerBidService bidService;

    @PostMapping
    public FarmerBid placeBid(@PathVariable Long offerId, @RequestBody FarmerBid bid) {
        return bidService.placeBid(offerId, bid);
    }

    @GetMapping
    public List<FarmerBid> getBidsForOffer(@PathVariable Long offerId) {
        return bidService.getBidsForOffer(offerId);
    }
}
