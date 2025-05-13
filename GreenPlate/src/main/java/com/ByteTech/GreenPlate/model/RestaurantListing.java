package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "restaurant_listings")

@PrimaryKeyJoinColumn(name = "listing_id")
public class RestaurantListing extends Listings {

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "nutritional_facts_id")
    private NutritionalFacts nutritionalFacts;

    @Column(name = "dietary_tag")
    private String dietaryTag;

    @Column(name = "is_overnight_food")
    private boolean isOvernightFood;
}
