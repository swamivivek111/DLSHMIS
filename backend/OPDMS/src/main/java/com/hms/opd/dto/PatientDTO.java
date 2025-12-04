package com.hms.opd.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.hms.opd.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long patientId;
    private String prnNumber;
    private String firstName;
    private String middleName;
    private String lastName;
    private Patient.Gender gender;
    private LocalDate dateOfBirth;
    private Integer age;
    private String mobileNumber;
    private String alternateMobile;
    private String aadharNumber;
    private String email;
    private String address;
    private Long cityId;
    private Long stateId;
    private Long countryId;
    private String pincode;
    private Long patientCategoryId;
    private Patient.IdProofType idProofType;
    private String idProofNumber;
    private String emergencyContactName;
    private String emergencyContactMobile;
    private Patient.Relationship relationship;
    private String patientPhoto;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Patient toEntity() {
        Patient patient = new Patient();
        patient.setPatientId(patientId);
        patient.setPrnNumber(prnNumber);
        patient.setFirstName(firstName);
        patient.setMiddleName(middleName);
        patient.setLastName(lastName);
        patient.setGender(gender);
        patient.setDateOfBirth(dateOfBirth);
        patient.setAge(age);
        patient.setMobileNumber(mobileNumber);
        patient.setAlternateMobile(alternateMobile);
        patient.setAadharNumber(aadharNumber);
        patient.setEmail(email);
        patient.setAddress(address);
        patient.setCityId(cityId);
        patient.setStateId(stateId);
        patient.setCountryId(countryId);
        patient.setPincode(pincode);
        patient.setPatientCategoryId(patientCategoryId);
        patient.setIdProofType(idProofType);
        patient.setIdProofNumber(idProofNumber);
        patient.setEmergencyContactName(emergencyContactName);
        patient.setEmergencyContactMobile(emergencyContactMobile);
        patient.setRelationship(relationship);
        patient.setPatientPhoto(patientPhoto);
        patient.setIsActive(isActive);
        return patient;
    }

    public static PatientDTO fromEntity(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setPatientId(patient.getPatientId());
        dto.setPrnNumber(patient.getPrnNumber());
        dto.setFirstName(patient.getFirstName());
        dto.setMiddleName(patient.getMiddleName());
        dto.setLastName(patient.getLastName());
        dto.setGender(patient.getGender());
        dto.setDateOfBirth(patient.getDateOfBirth());
        dto.setAge(patient.getAge());
        dto.setMobileNumber(patient.getMobileNumber());
        dto.setAlternateMobile(patient.getAlternateMobile());
        dto.setAadharNumber(patient.getAadharNumber());
        dto.setEmail(patient.getEmail());
        dto.setAddress(patient.getAddress());
        dto.setCityId(patient.getCityId());
        dto.setStateId(patient.getStateId());
        dto.setCountryId(patient.getCountryId());
        dto.setPincode(patient.getPincode());
        dto.setPatientCategoryId(patient.getPatientCategoryId());
        dto.setIdProofType(patient.getIdProofType());
        dto.setIdProofNumber(patient.getIdProofNumber());
        dto.setEmergencyContactName(patient.getEmergencyContactName());
        dto.setEmergencyContactMobile(patient.getEmergencyContactMobile());
        dto.setRelationship(patient.getRelationship());
        dto.setPatientPhoto(patient.getPatientPhoto());
        dto.setIsActive(patient.getIsActive());
        dto.setCreatedAt(patient.getCreatedAt());
        dto.setUpdatedAt(patient.getUpdatedAt());
        return dto;
    }
}