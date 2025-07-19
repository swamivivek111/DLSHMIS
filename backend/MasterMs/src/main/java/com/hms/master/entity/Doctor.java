package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.DoctorDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//SecondDev
@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doctor {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long doctorId;
    private String code;
    private String type;
    private String name;
    private String specialization;
    private Long departmentId;
    private String qualification;
    private String emailId;
    private String contactNumber;
    private Double firstConsultationFees;
    private Double followUpFees;
    private String joiningDate;
    private String panno;
    private String address;
    private String city;
    private String district;
    private String doctorShare;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;

    public DoctorDTO toDTO(){
        return new DoctorDTO(doctorId, code, type, name, specialization, departmentId, qualification, emailId, 
        contactNumber, firstConsultationFees, followUpFees, joiningDate, panno, address, city, district, 
        doctorShare, createdBy, updatedBy, createdAt, updatedAt, active);
    }
}
