package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.Restaurant;
import com.ByteTech.GreenPlate.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    public Restaurant saveRestaurant (Restaurant restaurant){
        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantId(UUID id) {
        return restaurantRepository.findById(id)
         .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

    public void deleteRestaurant(UUID id) {
        restaurantRepository.deleteById(id);
    }
    public Restaurant updateRestaurant(UUID id, Restaurant updatedRestaurant) {
        return restaurantRepository.findById(id).map(restaurant -> {
            restaurant.setName(updatedRestaurant.getName());
            restaurant.setEmail(updatedRestaurant.getEmail());
            restaurant.setContactNumber(updatedRestaurant.getContactNumber());
        //    restaurant.setUserType(updatedRestaurant.getUserType());
            restaurant.setRestaurantName(updatedRestaurant.getRestaurantName());
            restaurant.setOffersCompost(updatedRestaurant.isOffersCompost());
            return restaurantRepository.save(restaurant);
        }).orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

}
