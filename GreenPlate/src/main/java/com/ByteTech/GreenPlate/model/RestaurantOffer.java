package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RestaurantOffer {
    @Id @GeneratedValue
    private Long id;

    private String compostDetails;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "restaurantId", nullable = false)
    private Restaurant restaurant;

    @OneToMany(mappedBy = "restaurantOffer", cascade = CascadeType.ALL)
    private List<FarmerBid> bids;
}
