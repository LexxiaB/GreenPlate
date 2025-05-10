package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmerBid {
    @Id @GeneratedValue
    private Long id;

    private String discountDescription;
    private Double bidAmount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "farmerId", nullable = false)
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurantOfferId")
    private RestaurantOffer restaurantOffer;
}