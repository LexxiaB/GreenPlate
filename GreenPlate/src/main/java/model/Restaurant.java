package model;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("RESTAURANT")

public class Restaurant extends User {


    private String restaurantName;
    private boolean offersCompost; // Can be used to offer compost to farmers

    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}
