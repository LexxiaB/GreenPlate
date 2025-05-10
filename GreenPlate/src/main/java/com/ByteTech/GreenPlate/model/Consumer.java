package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "consumer")


public class Consumer extends User {

    @ManyToOne
    @JoinColumn(name = "consumer_id", referencedColumnName = "user_id")
    private Consumer consumer;
    @OneToOne(mappedBy = "consumer", cascade = CascadeType.ALL)
    private DietaryPreference dietaryPreference;

}
