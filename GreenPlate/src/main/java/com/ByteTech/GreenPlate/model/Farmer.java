package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "farmers")

public class Farmer extends User {

    @ManyToOne
    @JoinColumn(name = "farmer_id", referencedColumnName = "user_id")
    private Farmer farmer;

    public String farmName;
    public boolean acceptsCompost;

}
