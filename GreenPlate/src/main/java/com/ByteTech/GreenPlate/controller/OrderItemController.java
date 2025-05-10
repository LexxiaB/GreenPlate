package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.OrderItemService;
import com.ByteTech.GreenPlate.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public OrderItem createItem(@RequestBody OrderItem item) {
        return orderItemService.saveOrderItem(item);
    }

    @GetMapping
    public List<OrderItem> getAllItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public Optional<OrderItem> getById(@PathVariable String id) {
        return orderItemService.getOrderItemById(id);
    }

    @PutMapping("/{id}")
    public OrderItem updateItem(@PathVariable String id, @RequestBody OrderItem updatedItem) {
        return orderItemService.updateOrderItem(id, updatedItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        orderItemService.deleteOrderItem(id);
    }
}
