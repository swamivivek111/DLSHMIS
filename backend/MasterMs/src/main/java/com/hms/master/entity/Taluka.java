package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.TalukaDTO;

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
public class Taluka {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long talukaId;
    private Long districtId;
    private String talukaName;
    private String talukaCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TalukaDTO toDTO(){
        return new TalukaDTO(talukaId, districtId, talukaName, talukaCode, createdBy, updatedBy, active, createdAt, updatedAt);
    }
}
