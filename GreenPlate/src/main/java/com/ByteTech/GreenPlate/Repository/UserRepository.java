package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    // User findByUsername(String username);
}
