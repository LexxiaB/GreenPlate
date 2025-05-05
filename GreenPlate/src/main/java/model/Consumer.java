package model;

import jakarta.persistence.*;

@Entity

public class Consumer extends User {
    @OneToOne(mappedBy = "CONSUMER", cascade = CascadeType.ALL)
    private DietaryPreference dietaryPreference;

}
