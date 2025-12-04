package com.hms.profile.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.profile.dto.PatientDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
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
	private Long id;
	
	// Core Demographics Only
	@Column(unique = true, nullable = false)
	private String prnNo;
	
	private String prefix; // Mr, Mrs, Dr
	@Column(nullable = false)
	private String firstName;
	private String middleName;
	@Column(nullable = false)
	private String lastName;
	
	@Column(nullable = false)
	private String gender;
	private LocalDate dateOfBirth;
	private Integer age;
	
	// Contact Information
	@Column(nullable = false)
	private String mobileNumber;
	@Column(unique = true)
	private String email;
	
	// Identity
	@Column(unique = true)
	private String aadharNumber;
	
	// Address
	private String address;
	private String city;
	private String state;
	private String pincode;
	
	// Emergency Contact
	private String emergencyContactName;
	private String emergencyContactNumber;
	private String emergencyContactRelation;
	
	// System Fields
	private Boolean active = true;
	private String createdBy;
	private String updatedBy;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

	public PatientDTO toDTO() {
        return new PatientDTO(this.id, this.prnNo, this.prefix, this.firstName, this.middleName, this.lastName, 
                             this.gender, this.dateOfBirth, this.age, this.mobileNumber, this.email, this.aadharNumber, 
                             this.address, this.city, this.state, this.pincode, this.emergencyContactName, 
                             this.emergencyContactNumber, this.emergencyContactRelation, this.active, 
                             this.createdBy, this.updatedBy, this.createdAt, this.updatedAt);
    }
}
