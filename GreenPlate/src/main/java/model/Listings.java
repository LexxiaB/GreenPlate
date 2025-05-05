package model;
// Base Listing class using JPA Inheritance
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.util.Date;

@Entity
public class Listings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String listingId;

    @ManyToOne
    @JoinColumn(name = "sellerId")
    private User seller;  // The seller can be a restaurant or farmer

    private String name;
    private BigDecimal basePrice;
    private int quantity;
    private String description;
    private Date expiryDate;
    private int minDiscount;
    private int maxDiscount;
    private Date dateCreated;
    private Boolean isDynamicPricing;
    private Boolean isDelivery;
    private String pickupOptions;
    // ListingType is either 'restaurant' or 'farmer'
    private String listingType;

    // Getters and setters
    public String getListingId() {
        return listingId;
    }

    public void setListingId(String listingId) {
        this.listingId = listingId;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getMinDiscount() {
        return minDiscount;
    }

    public void setMinDiscount(int minDiscount) {
        this.minDiscount = minDiscount;
    }

    public int getMaxDiscount() {
        return maxDiscount;
    }

    public void setMaxDiscount(int maxDiscount) {
        this.maxDiscount = maxDiscount;
    }

    public String getListingType() {
        return listingType;
    }

    public void setListingType(String listingType) {
        this.listingType = listingType;
    }
}
