package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.DesignationDTO;

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
public class Designation {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long designationId;
    private String designationName;
    private String description;
    private String designationCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DesignationDTO toDTO(){
        return new DesignationDTO(designationId, designationName, description, designationCode, createdBy,
        updatedBy, active, createdAt, updatedAt);
    }
}
