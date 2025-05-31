package com.hms.profile.dto;

import java.time.LocalDate;

import com.hms.profile.entity.Doctor;
import com.hms.profile.entity.Patient;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;
	private LocalDate dob;
	private String phone;
	private String address;
	private String aadharNo;
	private String licenseNo;
	private String specialization;
    private String department;
    private Integer totalExperience;
    
    public Doctor toEntity(){
        return new Doctor(this.id, this.name, this.email, this.dob, this.phone, this.address, this.aadharNo, this.licenseNo,this.specialization, this.department, this.totalExperience);
    }
}
