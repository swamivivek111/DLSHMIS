package com.hms.opd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "opd_patient_registrations")
public class OPDPatientRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String prnNumber;
    
    @Column(nullable = false)
    private String firstName;
    
    private String middleName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    
    private LocalDateTime dateOfBirth;
    
    private Integer age;
    
    @Column(nullable = false)
    private String mobile;
    
    private String alternateMobile;
    
    private String aadharNumber;
    
    @Column(nullable = false)
    private String email;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private Long countryId;
    private Long stateId;
    private Long cityId;
    
    private String pincode;
    
    private Long patientCategoryId;
    
    @Enumerated(EnumType.STRING)
    private IdProofType idProofType;
    
    private String idProofNumber;
    
    @Column(nullable = false)
    private String emergencyContactName;
    
    @Column(nullable = false)
    private String emergencyContactPhone;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Relationship relationship;
    
    private String patientPhotoPath;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt;
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum Gender {
        MALE, FEMALE, OTHER
    }
    
    public enum IdProofType {
        AADHAR, PAN, PASSPORT, DRIVING_LICENSE, VOTER_ID, OTHER
    }
    
    public enum Relationship {
        FATHER, MOTHER, SPOUSE, SON, DAUGHTER, BROTHER, SISTER, FRIEND, OTHER
    }
}