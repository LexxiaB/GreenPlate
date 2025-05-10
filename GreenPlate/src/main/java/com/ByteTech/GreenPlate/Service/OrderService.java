package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.Repository.CartRepository;
import com.ByteTech.GreenPlate.model.Cart;
import com.ByteTech.GreenPlate.model.Order;
import com.ByteTech.GreenPlate.model.OrderItem;
import static com.ByteTech.GreenPlate.model.OrderItem.ItemType;
import static com.ByteTech.GreenPlate.model.OrderItem.ItemType.MEAL;

import com.ByteTech.GreenPlate.model.CartItem;
import com.ByteTech.GreenPlate.Repository.OrderRepository;
import com.ByteTech.GreenPlate.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
    public Order updateOrder(String id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setConsumer(updatedOrder.getConsumer());
            order.setSeller(updatedOrder.getSeller());
            order.setTotalPrice(updatedOrder.getTotalPrice());
            order.setOrderStatus(updatedOrder.getOrderStatus());
            order.setOrderDate(updatedOrder.getOrderDate());
            order.setDeliveryRequested(updatedOrder.getDeliveryRequested());
            order.setDeliveryInstructions(updatedOrder.getDeliveryInstructions());
            order.setPayOnline(updatedOrder.getPayOnline());
            order.setPaymentMethod(updatedOrder.getPaymentMethod());
            order.setItems(updatedOrder.getItems()); // Will cascade if items are properly mapped
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
    private double calculateTotal(List<OrderItem> items) {
        // Simple placeholder
        return items.stream().mapToDouble(i -> {
            if (i.getMeal() != null)
                return i.getMeal().getBasePrice().doubleValue() * i.getQuantity();
            if (i.getProduce() != null)
                return i.getProduce().getBasePrice().doubleValue() * i.getQuantity();
            return 0;
        }).sum();
    }
    private User resolveSeller(List<CartItem> items) {
        // Assume 1 seller per cart for now. You can expand logic later.
        if (items.get(0).getItemType() == OrderItem.ItemType.MEAL) {
            return items.get(0).getMeal().getRestaurant();
        } else {
            return items.get(0).getProduce().getFarmer();
        }
    }
@Autowired
private CartRepository cartRepository;

    public Order placeOrderFromCart(UUID consumerId) {
        Cart cart = cartRepository.findByConsumerUserId(consumerId).orElseThrow();
        if (cart.getItems().isEmpty()) throw new RuntimeException("Cart is empty");

        // For now: enforce 1 seller per cart (simple model)
        User seller = resolveSeller(cart.getItems());

        Order order = new Order();
        order.setConsumer(cart.getConsumer());
        order.setSeller(seller);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("PENDING");
        order.setDeliveryRequested(true); // or from UI
        order.setItems(new ArrayList<>());

        for (CartItem cartItem : cart.getItems()) {
            OrderItem item = new OrderItem();
            item.setItemType(cartItem.getItemType());
            item.setQuantity(cartItem.getQuantity());
            item.setOrders(order);

            if (cartItem.getItemType() == MEAL) {
                item.setMeal(cartItem.getMeal());
            } else {
                item.setProduce(cartItem.getProduce());
            }

            order.getItems().add(item);
        }

        // Total, discounts etc.
        order.setTotalPrice(calculateTotal(order.getItems()));
        orderRepository.save(order);

        // Clear cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return order;
    }

}