package model;

import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import java.time.LocalDate;
import java.time.Clock;

@Entity
public class RestaurantListing extends Listings {
    @ManyToOne
    private NutritionalFacts nutritionalFacts;
    private String dietaryTag;

    private boolean isOvernightFood; // Extra flag if item was stored properly overnight

    @ManyToOne
    private Restaurant restaurant;


}
