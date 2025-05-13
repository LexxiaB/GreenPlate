// src/main/java/com/ByteTech/GreenPlate/model/ListingView.java
package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "listing_views")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ListingView {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID listingId;
    private Instant createdAt;
}