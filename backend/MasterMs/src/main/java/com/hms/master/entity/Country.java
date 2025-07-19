package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.CountryDTO;

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
public class Country {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long countryId;
    private String countryName;
    private String countryCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CountryDTO toDTO(){
        return new CountryDTO(countryId, countryName, countryCode, createdBy, updatedBy, active, createdAt, updatedAt);
    }
}
