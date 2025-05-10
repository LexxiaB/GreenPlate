package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.NutritionalFacts;
import com.ByteTech.GreenPlate.Repository.NutritionalFactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionalFactsService {

    private final NutritionalFactsRepository repository;

    @Autowired
    public NutritionalFactsService(NutritionalFactsRepository repository) {
        this.repository = repository;
    }

    public NutritionalFacts save(NutritionalFacts facts) {
        return repository.save(facts);
    }

    public List<NutritionalFacts> getAll() {
        return repository.findAll();
    }

    public Optional<NutritionalFacts> getById(String id) {
        return repository.findById(id);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public NutritionalFacts update(String id, NutritionalFacts updated) {
        return repository.findById(id).map(existing -> {
            existing.setCalories(updated.getCalories());
            existing.setCarbs(updated.getCarbs());
            existing.setProtein(updated.getProtein());
            existing.setFat(updated.getFat());
            existing.setFiber(updated.getFiber());
            existing.setLactoseFree(updated.isLactoseFree());
            existing.setGlutenFree(updated.isGlutenFree());
            existing.setVegetarian(updated.isVegetarian());
            existing.setVegan(updated.isVegan());
            existing.setNutFree(updated.isNutFree());
            existing.setShellfishFree(updated.isShellfishFree());
            existing.setHalal(updated.isHalal());
            existing.setKosher(updated.isKosher());
            existing.setLowCholesterol(updated.isLowCholesterol());
            existing.setLowSugar(updated.isLowSugar());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Nutritional facts not found with id: " + id));
    }
}

