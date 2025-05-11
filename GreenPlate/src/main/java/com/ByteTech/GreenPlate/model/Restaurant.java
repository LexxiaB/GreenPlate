package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="restaurants")

public class Restaurant extends User {

    private String restaurantName;
    public boolean offersCompost; // Can be used to offer compost to farmers

}
