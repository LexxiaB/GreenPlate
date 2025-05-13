package com.ByteTech.GreenPlate.Repository;

import com.ByteTech.GreenPlate.model.ListingView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.UUID;

public interface ListingViewRepository extends JpaRepository<ListingView, Long> {
    int countByListingIdAndCreatedAtAfter(UUID listingId, Instant since);
}