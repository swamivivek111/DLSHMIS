package com.hms.opd.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long patientId;
    
    @Column(name = "prn_number", unique = true)
    private String prnNumber;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "middle_name")
    private String middleName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    
    @Column(name = "age")
    private Integer age;
    
    @Column(name = "mobile_number")
    private String mobileNumber;
    
    @Column(name = "alternate_mobile")
    private String alternateMobile;
    
    @Column(name = "aadhar_number")
    private String aadharNumber;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "city_id")
    private Long cityId;
    
    @Column(name = "state_id")
    private Long stateId;
    
    @Column(name = "country_id")
    private Long countryId;
    
    @Column(name = "pincode")
    private String pincode;
    
    @Column(name = "patient_category_id")
    private Long patientCategoryId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "id_proof_type")
    private IdProofType idProofType;
    
    @Column(name = "id_proof_number")
    private String idProofNumber;
    
    @Column(name = "emergency_contact_name")
    private String emergencyContactName;
    
    @Column(name = "emergency_contact_mobile")
    private String emergencyContactMobile;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "relationship")
    private Relationship relationship;
    
    @Column(name = "patient_photo")
    private String patientPhoto;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum IdProofType {
        AADHAR, PAN, PASSPORT, DRIVING_LICENSE, VOTER_ID, OTHER
    }

    public enum Relationship {
        FATHER, MOTHER, SPOUSE, SON, DAUGHTER, BROTHER, SISTER, FRIEND, OTHER
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (prnNumber == null) {
            prnNumber = "PRN" + System.currentTimeMillis();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}