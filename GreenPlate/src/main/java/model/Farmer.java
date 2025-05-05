package model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("FARMER")

public class Farmer extends User {


    private String farmName;
    private boolean acceptsCompost;

    public String getFarmerName() {
        return farmName;
    }
    public void setFarmName(String farmerName) {
        this.farmName = farmerName;
    }

}
