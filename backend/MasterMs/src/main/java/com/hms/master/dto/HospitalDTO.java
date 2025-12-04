package com.hms.master.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDTO {
    private Long hospitalId;
    private String hospitalCode;
    private String hospitalName;
    private String hospitalType;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String phoneNumber;
    private String emailId;
    private String website;
    private String licenseNumber;
    private String registrationNumber;
    private Integer totalBeds;
    private Integer icuBeds;
    private Integer emergencyBeds;
    private String establishedYear;
    private String accreditation;
    private String specialties;
    private String description;
    private String logoUrl;
    private Boolean active;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}