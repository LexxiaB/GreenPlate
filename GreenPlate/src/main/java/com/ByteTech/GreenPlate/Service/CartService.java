package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.dto.CartItemDTO;
import com.ByteTech.GreenPlate.model.*;
import com.ByteTech.GreenPlate.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private ConsumerRepository consumerRepository;
    @Autowired private RestaurantListingRepository restaurantListingRepository;
    @Autowired private FarmerListingRepository farmerListingRepository;

    public Cart addToCart(UUID consumerId, CartItemDTO dto) {
        Consumer consumer = consumerRepository.findById(consumerId).orElseThrow();
        Cart cart = cartRepository.findByConsumerUserId(consumerId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setConsumer(consumer);
            newCart.setItems(new ArrayList<>());
            return newCart;
        });

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setQuantity(dto.getQuantity());
        item.setItemType(dto.getItemType());

        if (dto.getItemType() == OrderItem.ItemType.MEAL) {
            item.setMeal(restaurantListingRepository.findById(dto.getListingId()).orElseThrow());
        } else {
            item.setProduce(farmerListingRepository.findById(dto.getListingId()).orElseThrow());
        }

        cart.getItems().add(item);
        return cartRepository.save(cart);
    }

    public Cart getCart(UUID consumerId) {
        return cartRepository.findByConsumerUserId(consumerId).orElseThrow();
    }

    public void clearCart(UUID consumerId) {
        Cart cart = cartRepository.findByConsumerUserId(consumerId).orElseThrow();
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
