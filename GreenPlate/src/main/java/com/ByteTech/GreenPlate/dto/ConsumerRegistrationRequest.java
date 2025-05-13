package com.ByteTech.GreenPlate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumerRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String contactNumber;
}

