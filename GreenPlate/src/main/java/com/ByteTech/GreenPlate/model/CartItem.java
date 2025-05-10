package com.ByteTech.GreenPlate.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.id.UUIDGenerator;
import org.hibernate.type.SqlTypes;
import java.util.UUID;
import java.sql.Types;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart_items")

public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    private int quantity;
    private double basePrice;
    private double currentPrice;
    private int minDiscount;
    private int maxDiscount;
    private int appliedDiscount;
    private Date createdAt;
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    private OrderItem.ItemType itemType;

    @ManyToOne
    @JoinColumn(name = "meal_id")
    private RestaurantListing meal;

    @ManyToOne
    @JoinColumn(name = "produce_id")
    private FarmerListing produce;

}

