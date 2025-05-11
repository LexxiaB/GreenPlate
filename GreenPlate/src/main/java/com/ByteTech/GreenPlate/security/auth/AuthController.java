package com.ByteTech.GreenPlate.security.auth;

import com.ByteTech.GreenPlate.dto.ConsumerRegistrationRequest;
import com.ByteTech.GreenPlate.dto.FarmerRegistrationRequest;
import com.ByteTech.GreenPlate.dto.RestaurantRegistrationRequest;
import com.ByteTech.GreenPlate.security.auth.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request.getRefreshToken()));
    }
    @PostMapping("/register/farmer")
    public ResponseEntity<String> registerFarmer(@RequestBody FarmerRegistrationRequest request) {
        authService.registerFarmer(request);
        return ResponseEntity.ok("Farmer registered successfully");
    }

    @PostMapping("/register/restaurant")
    public ResponseEntity<String> registerRestaurant(@RequestBody RestaurantRegistrationRequest request) {
        authService.registerRestaurant(request);
        return ResponseEntity.ok("Restaurant registered successfully");
    }

    @PostMapping("/register/consumer")
    public ResponseEntity<String> registerConsumer(@RequestBody ConsumerRegistrationRequest request) {
        authService.registerConsumer(request);
        return ResponseEntity.ok("Consumer registered successfully");
    }

}
