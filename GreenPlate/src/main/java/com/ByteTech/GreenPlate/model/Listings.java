package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "listings")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Listings {

    @Id
    @GeneratedValue
    @Column(name = "listing_id", updatable = false, nullable = false)
    private UUID listingId;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;  // Can be a Restaurant or Farmer

    private String name;
    private BigDecimal basePrice;
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
}
