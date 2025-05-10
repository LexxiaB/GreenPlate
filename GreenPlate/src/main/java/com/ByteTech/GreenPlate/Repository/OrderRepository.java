package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}

