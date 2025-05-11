package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "farmers")

public class Farmer extends User {


    public String farmName;
    public boolean acceptsCompost;

}
