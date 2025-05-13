package com.ByteTech.GreenPlate.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter

public class FarmerListingDto {
    private UUID farmerId;
    private String name;
    private float basePrice;
    private float currentPrice;
    private int quantity;
    private String description;
    private Date expiryDate;
    private int minDiscount;
    private int maxDiscount;
    private Date dateCreated;
    private Date harvestDate;
    private Boolean isDynamicPricing;
    private Boolean isDelivery;
    private String pickupOptions;
    private String listingType;
}
