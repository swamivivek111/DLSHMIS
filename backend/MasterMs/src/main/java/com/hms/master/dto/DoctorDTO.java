package com.hms.master.dto;

import java.time.LocalDateTime;

import com.hms.master.entity.Doctor;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
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

    public Doctor toEntity(){
        return new Doctor(doctorId, code, type, name, specialization, departmentId, qualification, emailId, 
        contactNumber, firstConsultationFees, followUpFees, joiningDate, panno, address, city, district, 
        doctorShare, createdBy, updatedBy, createdAt, updatedAt, active);
    }
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Object map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }

    public Object orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}
