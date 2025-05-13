package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.CartItemDTO;
import com.ByteTech.GreenPlate.model.Cart;
import com.ByteTech.GreenPlate.Service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{userId}/add")
    public Cart addToCart(@PathVariable UUID userId, @RequestBody CartItemDTO dto) {
        return cartService.addToCart(userId, dto);
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable UUID userId) {
        return cartService.getCart(userId);
    }

    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable UUID userId) {
        cartService.clearCart(userId);
    }
}
