package com.hms.profile.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.profile.entity.Doctor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
	private Long doctorId;
	
	// Form fields
	private String code;
	private String type;
	private String name;
	private String specialization;
	private Long departmentId;
	private String qualification;
	private String emailId;
	private String contactNumber;
	private String firstConsultationFees;
	private String followUpFees;
	private LocalDate joiningDate;
	private String panno;
	private String address;
	private Long cityId;
	private Long districtId;
	private String doctorShare;
	private Long hospitalId;
	
	// System Fields
	private Boolean active;
	private String createdBy;
	private String updatedBy;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
    
    public Doctor toEntity() {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(this.doctorId);
        doctor.setCode(this.code);
        doctor.setType(this.type);
        doctor.setName(this.name);
        doctor.setSpecialization(this.specialization);
        doctor.setDepartmentId(this.departmentId);
        doctor.setQualification(this.qualification);
        doctor.setEmailId(this.emailId);
        doctor.setContactNumber(this.contactNumber);
        doctor.setFirstConsultationFees(this.firstConsultationFees);
        doctor.setFollowUpFees(this.followUpFees);
        doctor.setJoiningDate(this.joiningDate);
        doctor.setPanno(this.panno);
        doctor.setAddress(this.address);
        doctor.setCityId(this.cityId);
        doctor.setDistrictId(this.districtId);
        doctor.setDoctorShare(this.doctorShare);
        doctor.setHospitalId(this.hospitalId);
        doctor.setActive(this.active);
        doctor.setCreatedBy(this.createdBy);
        doctor.setUpdatedBy(this.updatedBy);
        return doctor;
    }
}
