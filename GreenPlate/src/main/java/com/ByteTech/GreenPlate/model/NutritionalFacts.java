package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "nutritional_facts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class NutritionalFacts {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "nutrition_id",nullable = false, updatable = false)
    private UUID nutritionId;

    private int calories;
    private int carbs;
    private int protein;
    private int fat;
    private int fiber;

    private boolean lactoseFree;
    private boolean glutenFree;
    private boolean vegetarian;
    private boolean vegan;
    private boolean nutFree;
    private boolean shellfishFree;
    private boolean halal;
    private boolean kosher;
    private boolean lowCholesterol;
    private boolean lowSugar;
}
