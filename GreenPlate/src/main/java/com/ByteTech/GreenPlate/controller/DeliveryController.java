package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.DeliveryService;
import com.ByteTech.GreenPlate.model.Delivery;
import com.ByteTech.GreenPlate.model.DeliveryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping
    public Delivery createDelivery(@RequestBody Delivery delivery) {
        return deliveryService.saveDelivery(delivery);
    }

    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/{id}")
    public Optional<Delivery> getDeliveryById(@PathVariable String id) {
        return deliveryService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDelivery(@PathVariable String id) {
        deliveryService.delete(id);
    }

    @PutMapping("/{id}")
    public Delivery updateDelivery(@PathVariable String id, @RequestBody Delivery updatedDelivery) {
        return deliveryService.updateDelivery(id, updatedDelivery);
    }
    @PatchMapping("/{id}/status")
    public Delivery updateDeliveryStatus(@PathVariable String id, @RequestBody DeliveryStatus status) {
        return deliveryService.updateDeliveryStatus(id, status);
    }
    @GetMapping("/statuses")
    public DeliveryStatus[] getAllDeliveryStatuses() {
        return DeliveryStatus.values();
    }


}
