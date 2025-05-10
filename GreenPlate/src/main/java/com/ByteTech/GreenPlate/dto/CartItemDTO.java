package com.ByteTech.GreenPlate.dto;

import com.ByteTech.GreenPlate.model.OrderItem.ItemType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemDTO {
    private String listingId;
    private int quantity;
    private ItemType itemType;
}
