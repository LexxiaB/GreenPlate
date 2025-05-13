package com.ByteTech.GreenPlate.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NutritionalFactsDto {
    private int calories;
    private int fat;
    private int protein;
    private Integer carbs;
    private Integer fiber;
    private Boolean lactoseFree;
    private Boolean glutenFree;
    private Boolean vegetarian;
    private Boolean vegan;
    private Boolean nutFree;
    private Boolean shellfishFree;
    private Boolean halal;
    private Boolean kosher;
    private Boolean lowCholesterol;
    private Boolean lowSugar;
}

