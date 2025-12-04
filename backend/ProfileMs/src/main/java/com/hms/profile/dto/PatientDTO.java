package com.hms.profile.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.profile.entity.Patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
	private Long id;
	
	// Core Demographics
	private String prnNo;
	private String prefix;
	private String firstName;
	private String middleName;
	private String lastName;
	private String gender;
	private LocalDate dateOfBirth;
	private Integer age;
	
	// Contact Information
	private String mobileNumber;
	private String email;
	
	// Identity
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
	private Boolean active;
	private String createdBy;
	private String updatedBy;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
    
    public Patient toEntity() {
        Patient patient = new Patient();
        patient.setId(this.id);
        patient.setPrnNo(this.prnNo);
        patient.setPrefix(this.prefix);
        patient.setFirstName(this.firstName);
        patient.setMiddleName(this.middleName);
        patient.setLastName(this.lastName);
        patient.setGender(this.gender);
        patient.setDateOfBirth(this.dateOfBirth);
        patient.setAge(this.age);
        patient.setMobileNumber(this.mobileNumber);
        patient.setEmail(this.email);
        patient.setAadharNumber(this.aadharNumber);
        patient.setAddress(this.address);
        patient.setCity(this.city);
        patient.setState(this.state);
        patient.setPincode(this.pincode);
        patient.setEmergencyContactName(this.emergencyContactName);
        patient.setEmergencyContactNumber(this.emergencyContactNumber);
        patient.setEmergencyContactRelation(this.emergencyContactRelation);
        patient.setActive(this.active);
        patient.setCreatedBy(this.createdBy);
        patient.setUpdatedBy(this.updatedBy);
        return patient;
    }
}
