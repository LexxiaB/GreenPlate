package com.ByteTech.GreenPlate.controller;

import com.ByteTech.GreenPlate.Service.NutritionalFactsService;
import com.ByteTech.GreenPlate.model.NutritionalFacts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/nutritional-facts")
public class NutritionalFactsController {

    private final NutritionalFactsService service;

    @Autowired
    public NutritionalFactsController(NutritionalFactsService service) {
        this.service = service;
    }

    @PostMapping
    public NutritionalFacts create(@RequestBody NutritionalFacts facts) {
        return service.save(facts);
    }

    @GetMapping
    public List<NutritionalFacts> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<NutritionalFacts> getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public NutritionalFacts update(@PathVariable String id, @RequestBody NutritionalFacts updated) {
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
