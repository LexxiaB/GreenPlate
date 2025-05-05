package model;

import jakarta.persistence.*;

@Entity
public class DietaryPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private boolean lactoseFree;
    private boolean glutenFree;
    private boolean vegetarian;
    private boolean vegan;
    private boolean nutAllergy;
    private boolean shellfishAllergy;
    private boolean halal;
    private boolean kosher;
    private boolean lowCholesterol;
    private boolean lowSugar;

    @Lob
    private String other;

    @OneToOne
    @JoinColumn(name = "consumer_id", referencedColumnName = "userId")
    private Consumer consumer;

    // Getters and setters...
}
