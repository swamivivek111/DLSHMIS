package com.hms.profile.dto;

import java.time.LocalDate;

import com.hms.profile.entity.Admin;
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
public class AdminDTO {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;
	private LocalDate dob;
	private String phone;
	private String address;
	private String aadharNo;
    
    public Admin toEntity(){
        return new Admin(this.id, this.name, this.email, this.dob, this.phone, this.address, this.aadharNo);
    }
}
