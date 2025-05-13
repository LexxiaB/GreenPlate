package com.ByteTech.GreenPlate.Service;

/**
 * Utility class to compute a simple demand score based on activity counts.
 */
public class DemandScorer {

    /**
     * Calculate a demand score from the given metrics.
     * @param views  number of times the listing was viewed
     * @param carts  number of times the listing was added to carts
     * @param orders number of times the listing was ordered
     * @return a normalized demand score (likes removed)
     */
    public static double computeDemandScore(
            int views,
            int carts,
            int orders
    ) {
        final double wViews  = 0.002;
        final double wCarts  = 0.04;
        final double wOrders = 0.3;

        return views  * wViews
                + carts  * wCarts
                + orders * wOrders;
    }
}
