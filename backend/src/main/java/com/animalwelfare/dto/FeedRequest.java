package com.animalwelfare.dto;

import jakarta.validation.constraints.NotNull;

public class FeedRequest {
    
    @NotNull(message = "Fed today status is required")
    private Boolean fedToday;
    
    private String lastFed;

    // Constructors
    public FeedRequest() {}

    public FeedRequest(Boolean fedToday, String lastFed) {
        this.fedToday = fedToday;
        this.lastFed = lastFed;
    }

    // Getters and Setters
    public Boolean isFedToday() {
        return fedToday;
    }

    public void setFedToday(Boolean fedToday) {
        this.fedToday = fedToday;
    }

    public String getLastFed() {
        return lastFed;
    }

    public void setLastFed(String lastFed) {
        this.lastFed = lastFed;
    }
}