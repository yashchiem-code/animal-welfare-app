package com.animalwelfare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "animals")
public class Animal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Animal name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String breed;
    
    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;
    
    @NotNull(message = "Latitude is required")
    @Column(nullable = false)
    private Double lat;
    
    @NotNull(message = "Longitude is required")
    @Column(nullable = false)
    private Double lng;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "fed_today", nullable = false)
    private boolean fedToday = false;
    
    @Column(name = "last_fed")
    private LocalDateTime lastFed;
    
    @Column(nullable = false)
    private String status = "reported";
    
    @NotBlank(message = "Reporter name is required")
    @Column(name = "reported_by", nullable = false)
    private String reportedBy;
    
    @Column(name = "reported_at", nullable = false)
    private LocalDateTime reportedAt;

    // Constructors
    public Animal() {
        this.reportedAt = LocalDateTime.now();
    }

    public Animal(String name, String breed, String location, Double lat, Double lng, 
                  String imageUrl, String reportedBy) {
        this();
        this.name = name;
        this.breed = breed;
        this.location = location;
        this.lat = lat;
        this.lng = lng;
        this.imageUrl = imageUrl;
        this.reportedBy = reportedBy;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isFedToday() {
        return fedToday;
    }

    public void setFedToday(boolean fedToday) {
        this.fedToday = fedToday;
    }

    public LocalDateTime getLastFed() {
        return lastFed;
    }

    public void setLastFed(LocalDateTime lastFed) {
        this.lastFed = lastFed;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReportedBy() {
        return reportedBy;
    }

    public void setReportedBy(String reportedBy) {
        this.reportedBy = reportedBy;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }
}