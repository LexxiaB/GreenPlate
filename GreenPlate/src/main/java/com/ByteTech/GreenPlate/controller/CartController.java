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

    @PostMapping("/{consumerId}/add")
    public Cart addToCart(@PathVariable UUID consumerId, @RequestBody CartItemDTO dto) {
        return cartService.addToCart(consumerId, dto);
    }

    @GetMapping("/{consumerId}")
    public Cart getCart(@PathVariable UUID consumerId) {
        return cartService.getCart(consumerId);
    }

    @DeleteMapping("/{consumerId}/clear")
    public void clearCart(@PathVariable UUID consumerId) {
        cartService.clearCart(consumerId);
    }
}
