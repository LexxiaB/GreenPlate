package com.ByteTech.GreenPlate.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PaymentDTO {
    private Long orderId;
    private String paymentMethod;
    private Double amount;
    private String cardNumber; // If using credit card
    private String cardExpiry; // If using credit card
    private String cardCVV; // If using credit card
    private String paymentStatus;
}

