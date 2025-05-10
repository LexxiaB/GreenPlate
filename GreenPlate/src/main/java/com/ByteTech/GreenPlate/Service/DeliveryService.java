package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.Delivery;
import com.ByteTech.GreenPlate.Repository.DeliveryRepository;
import com.ByteTech.GreenPlate.model.DeliveryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public Delivery saveDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Optional<Delivery> getById(String id) {
        return deliveryRepository.findById(id);
    }

    public void delete(String id) {
        deliveryRepository.deleteById(id);
    }

    public Delivery updateDelivery(String id, Delivery updatedDelivery) {
        return deliveryRepository.findById(id).map(delivery -> {
            delivery.setOrder(updatedDelivery.getOrder());
            delivery.setDeliveryStatus(updatedDelivery.getDeliveryStatus());
            delivery.setDeliveryDate(updatedDelivery.getDeliveryDate());
            return deliveryRepository.save(delivery);
        }).orElseThrow(() -> new RuntimeException("Delivery not found with id: " + id));
    }
    public Delivery updateDeliveryStatus(String id, DeliveryStatus newStatus) {
        return getById(id).map(delivery -> {
            delivery.setDeliveryStatus(newStatus);
            return deliveryRepository.save(delivery);
        }).orElseThrow(() -> new RuntimeException("Delivery not found with id: " + id));
    }



}

