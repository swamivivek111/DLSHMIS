package com.hms.profile.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.profile.dto.DoctorDTO;

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
@Table(name = "doctors")
public class Doctor {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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


}
