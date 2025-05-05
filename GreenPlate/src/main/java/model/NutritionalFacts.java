package model;

import jakarta.persistence.*;

@Entity
public class NutritionalFacts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String nutritionId;

    private double calories;
    private double carbs;
    private double protein;
    private double fat;
    private double fiber;
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

    // Getters and setters
    public String getNutritionId() {
        return nutritionId;
    }

    public void setNutritionId(String nutritionId) {
        this.nutritionId = nutritionId;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getFiber() {
        return fiber;
    }

    public void setFiber(double fiber) {
        this.fiber = fiber;
    }

    public boolean isLactoseFree() {
        return lactoseFree;
    }

    public void setLactoseFree(boolean lactoseFree) {
        this.lactoseFree = lactoseFree;
    }

    public boolean isGlutenFree() {
        return glutenFree;
    }

    public void setGlutenFree(boolean glutenFree) {
        this.glutenFree = glutenFree;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public boolean isVegan() {
        return vegan;
    }

    public void setVegan(boolean vegan) {
        this.vegan = vegan;
    }

    public boolean isNutFree() {
        return nutFree;
    }

    public void setNutFree(boolean nutFree) {
        this.nutFree = nutFree;
    }

    public boolean isShellfishFree() {
        return shellfishFree;
    }

    public void setShellfishFree(boolean shellfishFree) {
        this.shellfishFree = shellfishFree;
    }

    public boolean isHalal() {
        return halal;
    }

    public void setHalal(boolean halal) {
        this.halal = halal;
    }

    public boolean isKosher() {
        return kosher;
    }

    public void setKosher(boolean kosher) {
        this.kosher = kosher;
    }

    public boolean isLowCholesterol() {
        return lowCholesterol;
    }

    public void setLowCholesterol(boolean lowCholesterol) {
        this.lowCholesterol = lowCholesterol;
    }

    public boolean isLowSugar() {
        return lowSugar;
    }

    public void setLowSugar(boolean lowSugar) {
        this.lowSugar = lowSugar;
    }
}
