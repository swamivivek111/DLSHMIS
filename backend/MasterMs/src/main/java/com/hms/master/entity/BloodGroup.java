package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.BloodGroupDTO;

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
public class BloodGroup {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long bloodGroupId;
    private String bloodGroup;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;

    public BloodGroupDTO toDTO(){
        return new BloodGroupDTO(bloodGroupId, bloodGroup, createdBy, updatedBy, createdAt, updatedAt, active);
    }
}
