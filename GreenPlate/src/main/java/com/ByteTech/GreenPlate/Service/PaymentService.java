package com.ByteTech.GreenPlate.Service;


import com.ByteTech.GreenPlate.dto.PaymentDTO;
import com.ByteTech.GreenPlate.model.Payment;
import com.ByteTech.GreenPlate.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayPalPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setOrderId(paymentDTO.getOrderId());
        payment.setPaymentMethod("PayPal");
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentStatus("Completed");
        payment.setTransactionId(UUID.randomUUID().toString()); // PayPal transaction ID

        return paymentRepository.save(payment);
    }

    public Payment processCreditCardPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setOrderId(paymentDTO.getOrderId());
        payment.setPaymentMethod("Credit Card");
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentStatus("Completed");
        payment.setTransactionId(UUID.randomUUID().toString()); // Generate a transaction ID

        return paymentRepository.save(payment);
    }
}
