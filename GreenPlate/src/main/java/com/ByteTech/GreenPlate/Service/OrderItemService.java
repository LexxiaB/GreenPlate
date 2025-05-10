package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.OrderItem;
import com.ByteTech.GreenPlate.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(String id) {
        return orderItemRepository.findById(id);
    }

    public void deleteOrderItem(String id) {
        orderItemRepository.deleteById(id);
    }
    public OrderItem updateOrderItem(String id, OrderItem updatedItem) {
        return orderItemRepository.findById(id).map(item -> {
            item.setOrders(updatedItem.getOrders());
            item.setQuantity(updatedItem.getQuantity());
            item.setMinDiscount(updatedItem.getMinDiscount());
            item.setMaxDiscount(updatedItem.getMaxDiscount());
            item.setAppliedDiscount(updatedItem.getAppliedDiscount());
            item.setItemType(updatedItem.getItemType());
            item.setMeal(updatedItem.getMeal());
            item.setProduce(updatedItem.getProduce());
            return orderItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("OrderItem not found with id: " + id));
    }

}