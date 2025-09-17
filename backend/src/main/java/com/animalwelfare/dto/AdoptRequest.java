package com.animalwelfare.dto;

import jakarta.validation.constraints.NotBlank;

public class AdoptRequest {
    
    @NotBlank(message = "Status is required")
    private String status;

    // Constructors
    public AdoptRequest() {}

    public AdoptRequest(String status) {
        this.status = status;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}