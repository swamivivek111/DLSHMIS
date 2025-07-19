package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.CityDTO;

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
public class City {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long cityId;
    private Long talukaId;
    private String cityName;
    private String pinCode;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;

    public CityDTO toDTO(){
        return new CityDTO(cityId, talukaId, cityName, pinCode, createdBy, updatedBy, createdAt, updatedAt,active);
    }
}
