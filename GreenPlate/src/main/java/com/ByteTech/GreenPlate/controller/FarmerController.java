package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.model.Farmer;
import com.ByteTech.GreenPlate.Service.FarmerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @GetMapping
    public List<Farmer> getAllFarmers() {
        return farmerService.getAllFarmers();
    }

    @GetMapping("/{id}")
    public Farmer getFarmerId(@PathVariable UUID id) {
        return farmerService.getFarmerId(id);
    }

    @PostMapping
    public Farmer createFarmer(@RequestBody Farmer farmer) {
        return farmerService.saveFarmer(farmer);
    }

    @PutMapping("/{id}")
    public Farmer updateFarmer(@PathVariable UUID id, @RequestBody Farmer farmer) {
        return farmerService.updateFarmer(id, farmer);
    }

    @DeleteMapping("/{id}")
    public void deleteFarmer(@PathVariable UUID id) {
        farmerService.deleteFarmer(id);
    }
}
