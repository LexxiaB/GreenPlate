package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="restaurants")

public class Restaurant extends User {

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "user_id")
    private Restaurant restaurant;


    private String restaurantName;
    public boolean offersCompost; // Can be used to offer compost to farmers

}
