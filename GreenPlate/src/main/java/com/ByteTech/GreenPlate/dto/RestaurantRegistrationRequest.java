package com.ByteTech.GreenPlate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String contactNumber;
    private String restaurantName;
    private boolean offersCompost;
}

