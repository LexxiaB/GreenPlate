package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.Farmer;
import com.ByteTech.GreenPlate.Repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FarmerService {

    private final FarmerRepository farmerRepository;

    @Autowired
    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }
    public Farmer saveFarmer (Farmer farmer){
        return farmerRepository.save(farmer);
    }

    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    public Farmer getFarmerId(UUID id) {
        return farmerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farmer not found with id: " + id));
    }

    public void deleteFarmer(UUID id) {
        farmerRepository.deleteById(id);
    }
    public Farmer updateFarmer(UUID id, Farmer updatedFarmer) {
        return farmerRepository.findById(id).map(farmer -> {
            farmer.setName(updatedFarmer.getName());
            farmer.setFarmName(updatedFarmer.getFarmName());
            farmer.setEmail(updatedFarmer.getEmail());
            farmer.setContactNumber(updatedFarmer.getContactNumber());
           // farmer.setUserType(updatedFarmer.getUserType());
            farmer.setAcceptsCompost(updatedFarmer.isAcceptsCompost());
            return farmerRepository.save(farmer);
        }).orElseThrow(() -> new RuntimeException("Farmer not found with id: " + id));
    }

}
