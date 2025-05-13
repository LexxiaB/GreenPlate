package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, String> {
    // Count how many times a produce listing was added to carts since a given date
    int countByProduce_ListingIdAndCreatedAtAfter(UUID listingId, Date after);
    // Count how many times a restaurant meal listing was added to carts since a given date
    int countByMeal_ListingIdAndCreatedAtAfter(UUID listingId, Date after);
}