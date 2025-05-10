package com.ByteTech.GreenPlate.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ByteTech.GreenPlate.model.Cart;
import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, String>{
    Optional<Cart> findByConsumerUserId(UUID userId);
}
