package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.Consumer;
import com.ByteTech.GreenPlate.Repository.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ConsumerService {

    private final ConsumerRepository consumerRepository;

    @Autowired
    public ConsumerService(ConsumerRepository consumerRepository) {
        this.consumerRepository = consumerRepository;
    }
    public Consumer saveConsumer (Consumer consumer){
        return consumerRepository.save(consumer);
    }

    public List<Consumer> getAllConsumers() {
        return consumerRepository.findAll();
    }

    public Optional<Consumer> getConsumerId(UUID id) {
        return consumerRepository.findById(id);
    }

    public void deleteConsumer(UUID id) {
        consumerRepository.deleteById(id);
    }
}
