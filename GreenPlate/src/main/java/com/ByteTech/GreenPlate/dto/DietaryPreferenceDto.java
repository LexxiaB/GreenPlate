package com.ByteTech.GreenPlate.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DietaryPreferenceDto {
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
    private String other;

}
