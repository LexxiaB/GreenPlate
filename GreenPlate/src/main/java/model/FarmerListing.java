package model;

import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import java.time.Clock;
import java.time.LocalDate;

@Entity
public class FarmerListing extends Listings {



    @ManyToOne
    private Farmer farmer;
}
