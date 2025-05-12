package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.*;
import com.ByteTech.GreenPlate.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ListingsRepository listingsRepository;

    @Override
    public List<Listings> getRecommendationsForConsumer(String consumerId) {
        Consumer consumer = consumerRepository.findById(UUID.fromString(consumerId))
                .orElseThrow(() -> new RuntimeException("Consumer not found"));

        DietaryPreference prefs = consumer.getDietaryPreference();
        List<Order> pastOrders = orderRepository.findByConsumer(consumer);

        Set<String> pastItemNames = pastOrders.stream()
                .flatMap(order -> order.getItems().stream())
                .map(item -> item.getMeal() != null ? item.getMeal().getName() :
                        item.getProduce() != null ? item.getProduce().getName() : "")
                .collect(Collectors.toSet());

        List<Listings> allListings = listingsRepository.findAll();

        return allListings.stream()
                .filter(this::isListingAvailable)
                .filter(listing -> matchesDietaryPreferences(listing, prefs))
                .sorted(Comparator.comparing(listing -> -scoreListing(listing, pastItemNames)))
                .limit(10)
                .collect(Collectors.toList());
    }

    private boolean isListingAvailable(Listings listing) {
        return listing.getQuantity() > 0 && listing.getExpiryDate().after(new Date());
    }

    private boolean matchesDietaryPreferences(Listings listing, DietaryPreference prefs) {
        String description = listing.getDescription() != null ? listing.getDescription().toLowerCase() : "";

        if (prefs.isVegan() && description.contains("meat")) return false;
        if (prefs.isGlutenFree() && description.contains("gluten")) return false;
        if (prefs.isNutAllergy() && description.contains("nut")) return false;
        if (prefs.isShellfishAllergy() && description.contains("shellfish")) return false;
        return !prefs.isLactoseFree() || !description.contains("milk");
    }

    private int scoreListing(Listings listing, Set<String> pastItemNames) {
        return pastItemNames.contains(listing.getName()) ? 10 : 1;
    }
}
