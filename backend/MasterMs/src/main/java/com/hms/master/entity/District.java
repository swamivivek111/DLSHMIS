package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.DistrictDTO;

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
public class District {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long districtId;
    private Long stateId;
    private String districtName;
    private String districtCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DistrictDTO toDTO(){
        return new DistrictDTO(districtId, stateId, districtName, districtCode, createdBy, updatedBy,
         active, createdAt, updatedAt);
    }
}
