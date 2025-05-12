package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.*;
import com.ByteTech.GreenPlate.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.*;
import java.util.regex.Pattern;
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

        boolean isNewUser = pastOrders.isEmpty();

        // Frequency and recency maps for existing users
        Map<String, Integer> itemFrequency = new HashMap<>();
        Map<String, Date> itemRecency = new HashMap<>();

        // Popularity map (for all listings across all orders)
        Map<String, Integer> popularityMap = new HashMap<>();
        List<Order> allOrders = orderRepository.findAll();

        for (Order order : allOrders) {
            if (order.getItems() == null) continue;

            for (OrderItem item : order.getItems()) {
                Listings listing = getAssociatedListing(item);
                if (listing == null || listing.getName() == null) continue;

                String name = listing.getName();
                popularityMap.merge(name, 1, Integer::sum);
            }
        }

        // Collect frequency and recency data for this user
        for (Order order : pastOrders) {
            if (order.getItems() == null) continue;

            for (OrderItem item : order.getItems()) {
                Listings listing = getAssociatedListing(item);
                if (listing == null || listing.getName() == null) continue;

                String name = listing.getName();
                itemFrequency.merge(name, 1, Integer::sum);
                itemRecency.put(name, Date.from(order.getOrderDate()
                        .atZone(ZoneId.systemDefault()).toInstant()));
            }
        }

        List<Listings> allListings = listingsRepository.findAll();
        Date now = new Date();

        return allListings.stream()
                .filter(listing -> isListingAvailable(listing, now))
                .filter(listing -> matchesDietaryPreferences(listing, prefs))
                .sorted(Comparator.comparingInt(
                        listing -> -scoreListing(listing, itemFrequency, itemRecency, popularityMap, now, isNewUser)))
                .limit(10)
                .collect(Collectors.toList());
    }

    private Listings getAssociatedListing(OrderItem item) {
        if (item.getMeal() != null) return item.getMeal();
        if (item.getProduce() != null) return item.getProduce();
        return null;
    }

    private boolean isListingAvailable(Listings listing, Date now) {
        return listing.getQuantity() > 0 &&
                listing.getExpiryDate() != null &&
                listing.getExpiryDate().after(now);
    }

    private boolean matchesDietaryPreferences(Listings listing, DietaryPreference prefs) {
        String description = Optional.ofNullable(listing.getDescription())
                .orElse("")
                .toLowerCase();

        if (prefs.isVegan() && containsWord(description, "meat")) return false;
        if (prefs.isGlutenFree() && containsWord(description, "gluten")) return false;
        if (prefs.isNutAllergy() && containsWord(description, "nut")) return false;
        if (prefs.isShellfishAllergy() && containsWord(description, "shellfish")) return false;
        return !prefs.isLactoseFree() || !containsWord(description, "milk");
    }

    private boolean containsWord(String text, String word) {
        Pattern pattern = Pattern.compile("\\b" + Pattern.quote(word) + "\\b", Pattern.CASE_INSENSITIVE);
        return pattern.matcher(text).find();
    }

    private int scoreListing(Listings listing,
                             Map<String, Integer> frequencyMap,
                             Map<String, Date> recencyMap,
                             Map<String, Integer> popularityMap,
                             Date now,
                             boolean isNewUser) {
        String name = listing.getName();
        int popularityScore = popularityMap.getOrDefault(name, 0) * 3;

        if (isNewUser) {
            return popularityScore;
        }

        int frequencyScore = frequencyMap.getOrDefault(name, 0) * 5;

        Date recentDate = recencyMap.get(name);
        int recencyScore = 0;
        if (recentDate != null) {
            long daysAgo = (now.getTime() - recentDate.getTime()) / (1000 * 60 * 60 * 24);
            recencyScore = Math.max(0, 30 - (int) daysAgo); // max 30 bonus
        }

        return frequencyScore + recencyScore + popularityScore;
    }
}
//1252025127