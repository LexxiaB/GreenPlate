package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.dto.PaymentDTO;
import com.ByteTech.GreenPlate.model.Payment;
import com.ByteTech.GreenPlate.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/paypal")
    public ResponseEntity<Payment> payWithPayPal(@RequestBody PaymentDTO paymentDTO) {
        Payment payment = paymentService.processPayPalPayment(paymentDTO);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/credit-card")
    public ResponseEntity<Payment> payWithCreditCard(@RequestBody PaymentDTO paymentDTO) {
        Payment payment = paymentService.processCreditCardPayment(paymentDTO);
        return ResponseEntity.ok(payment);
    }
}
