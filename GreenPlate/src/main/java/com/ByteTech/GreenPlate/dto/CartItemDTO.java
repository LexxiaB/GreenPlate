package com.ByteTech.GreenPlate.dto;

import com.ByteTech.GreenPlate.model.OrderItem.ItemType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CartItemDTO {
    private UUID listingId;
    private int quantity;
    private ItemType itemType;
}
