package com.ByteTech.GreenPlate.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class RestaurantListingDto {
    // Only the restaurant’s UUID
    private UUID restaurantId;

    private String name;
    private float basePrice;
    private float currentPrice;
    private int quantity;
    private String description;
    private Date expiryDate;
    private int minDiscount;
    private int maxDiscount;
    private Date dateCreated;
    private Boolean isDynamicPricing;
    private Boolean isDelivery;
    private String pickupOptions;
    private String listingType;
    private NutritionalFactsDto nutritionalFacts;


    // restaurant‐specific
    private String dietaryTag;
    private Boolean isOvernightFood;
}
