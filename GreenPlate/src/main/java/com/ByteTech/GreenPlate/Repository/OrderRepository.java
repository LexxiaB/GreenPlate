package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Order;
import com.ByteTech.GreenPlate.model.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByConsumer(Consumer consumer);

}

