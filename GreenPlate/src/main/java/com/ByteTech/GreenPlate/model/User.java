package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Types;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)

public abstract class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id", updatable = false, nullable = false)

    private UUID userId;

    private String name;
    private String email;
    private String contactNumber;
}
