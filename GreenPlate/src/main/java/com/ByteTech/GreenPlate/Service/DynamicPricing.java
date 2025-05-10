/*
package com.ByteTech.GreenPlate.Service;

import java.time.Duration;
import java.time.ZonedDateTime;

public class DynamicPricing {

    public static double computeDynamicPrice(
            double originalPrice,
            ZonedDateTime createdAt,
            ZonedDateTime expiresAt,
            ZonedDateTime lastOrderAt,
            double minDiscount,
            double maxDiscount,
            double alpha,
            double beta,
            double gamma,
            double delta,
            int views,
            int carts,
            int orders,
            int likes
    ) {
        ZonedDateTime now = ZonedDateTime.now();

        double tListed = Duration.between(createdAt, now).toSeconds() / 3600.0;
        double tExpires = Duration.between(now, expiresAt).toSeconds() / 3600.0;
        double tShelfLife = Duration.between(createdAt, expiresAt).toSeconds() / 3600.0;

        double tNoOrder = (lastOrderAt != null)
                ? Duration.between(lastOrderAt, now).toSeconds() / 3600.0
                : tListed;

        double expirationUrgency = (tShelfLife <= 0) ? 1.0
                : 1.0 - Math.max(0, Math.min(tExpires / tShelfLife, 1.0));

        // Demand score from metrics
        double demandScore = DemandScorer.computeDemandScore(views, carts, orders, likes);

        // Dynamic discount calculation
        double discount = alpha * tListed
                + beta * tNoOrder
                + gamma * expirationUrgency
                - delta * demandScore;

        discount = Math.max(minDiscount, Math.min(discount, maxDiscount));
        double finalPrice = originalPrice * (1 - discount / 100);

        return Math.round(finalPrice * 100.0) / 100.0;
    }
}
*/
