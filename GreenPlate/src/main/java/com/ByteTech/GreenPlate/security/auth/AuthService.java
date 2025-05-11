package com.ByteTech.GreenPlate.security.auth;

import com.ByteTech.GreenPlate.Repository.FarmerRepository;
import com.ByteTech.GreenPlate.dto.ConsumerRegistrationRequest;
import com.ByteTech.GreenPlate.dto.FarmerRegistrationRequest;
import com.ByteTech.GreenPlate.dto.RestaurantRegistrationRequest;
import com.ByteTech.GreenPlate.model.Consumer;
import com.ByteTech.GreenPlate.model.Farmer;
import com.ByteTech.GreenPlate.model.Restaurant;
import com.ByteTech.GreenPlate.security.UserDetails.CustomUserDetails;
import com.ByteTech.GreenPlate.security.UserDetails.CustomUserDetailsService;
import com.ByteTech.GreenPlate.security.auth.model.AuthRequest;
import com.ByteTech.GreenPlate.security.auth.model.AuthResponse;
import com.ByteTech.GreenPlate.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final TokenStore tokenStore;
    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(AuthRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String accessToken = jwtUtil.generateToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        tokenStore.storeRefreshToken(refreshToken);

        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);

        if (!jwtUtil.isTokenValid(refreshToken, username) || !tokenStore.isValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
        String newAccessToken = jwtUtil.generateToken(userDetails);
        String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);

        tokenStore.storeRefreshToken(newRefreshToken);  // Correct usage

        return new AuthResponse(newAccessToken, newRefreshToken);
    }
    public void registerFarmer(FarmerRegistrationRequest request) {
        if (userRepository.findByEmail (request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        Farmer farmer = new Farmer();
        farmer.setName(request.getName());
        farmer.setEmail(request.getEmail());
        farmer.setPassword(passwordEncoder.encode(request.getPassword()));
        farmer.setContactNumber(request.getContactNumber());
        farmer.setUserType("FARMER");
        farmer.setFarmName(request.getFarmName());
        farmer.setAcceptsCompost(request.isAcceptsCompost());

        userRepository.save(farmer);
    }
    public void registerRestaurant(RestaurantRegistrationRequest request) {
        if (userRepository.findByEmail (request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setEmail(request.getEmail());
        restaurant.setPassword(passwordEncoder.encode(request.getPassword()));
        restaurant.setContactNumber(request.getContactNumber());
        restaurant.setUserType("RESTAURANT");
        restaurant.setRestaurantName(request.getRestaurantName());
        restaurant.setOffersCompost(request.isOffersCompost());

        userRepository.save(restaurant);
    }
    public void registerConsumer(ConsumerRegistrationRequest request) {
        if (userRepository.findByEmail (request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        Consumer consumer = new Consumer();
        consumer.setName(request.getName());
        consumer.setEmail(request.getEmail());
        consumer.setPassword(passwordEncoder.encode(request.getPassword()));
        consumer.setContactNumber(request.getContactNumber());
        consumer.setUserType("CONSUMER");
        userRepository.save(consumer);
    }

}
