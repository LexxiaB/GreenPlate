package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
    // Count how many times a produce listing was ordered since a given time
    int countByProduce_ListingIdAndCreatedAtAfter(UUID listingId, LocalDateTime after);
    // Count how many times a restaurant meal listing was ordered since a given time
    int countByMeal_ListingIdAndCreatedAtAfter(UUID listingId, LocalDateTime after);

    // Retrieve the last order time for produce
    Optional<OrderItem> findFirstByProduce_ListingIdOrderByCreatedAtDesc(UUID listingId);
    // Retrieve the last order time for meal
    Optional<OrderItem> findFirstByMeal_ListingIdOrderByCreatedAtDesc(UUID listingId);
}