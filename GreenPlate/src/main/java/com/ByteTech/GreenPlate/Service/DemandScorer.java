/*
package com.ByteTech.GreenPlate.Service;

import java.time.ZonedDateTime;
import java.time.Duration;

public class DemandScorer {

    public static double computeDemandScore(
            int views,
            int carts,
            int orders,
            int likes
    ) {
        // Base weights
        double wViews = 0.002;
        double wCarts = 0.04;
        double wOrders = 0.3;
        double wLikes = 0.01;

        // Decay rate
        double decayRate = 0.02; // lower = slower decay

        ZonedDateTime now = ZonedDateTime.now();

        double hViewsAgo = Duration.between(viewsAt, now).toSeconds() / 3600.0;
        double hCartsAgo = Duration.between(cartsAt, now).toSeconds() / 3600.0;
        double hOrdersAgo = Duration.between(ordersAt, now).toSeconds() / 3600.0;
        double hLikesAgo = Duration.between(likesAt, now).toSeconds() / 3600.0;

        double score =
                views  * wViews  * Math.exp(-decayRate * hViewsAgo)
                        + carts  * wCarts  * Math.exp(-decayRate * hCartsAgo)
                        + orders * wOrders * Math.exp(-decayRate * hOrdersAgo)
                        + likes  * wLikes  * Math.exp(-decayRate * hLikesAgo);

        return Math.min(score, 1.0);
    }
}

*/
