package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "farmer_listings")
@PrimaryKeyJoinColumn(name = "listing_id")
public class FarmerListing extends Listings {

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    public Farmer farmer;
}
