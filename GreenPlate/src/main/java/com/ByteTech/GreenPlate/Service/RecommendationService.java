package com.ByteTech.GreenPlate.Service;

import com.ByteTech.GreenPlate.model.Listings;
import java.util.List;

public interface RecommendationService {
    List<Listings> getRecommendationsForConsumer(String consumerId);
}
