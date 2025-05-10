package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
public class DietaryPreference {

    @Id
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
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
    @JoinColumn(name = "consumer_id", referencedColumnName = "user_id")
    private Consumer consumer;
}
