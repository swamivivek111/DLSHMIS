package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.StateDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getter/setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    private String stateName;
    private String stateCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StateDTO toDTO() {
        StateDTO dto = new StateDTO();
        dto.setStateId(stateId);

        try {
            if (country != null) {
                dto.setCountryId(country.getCountryId());
                dto.setCountryName(country.getCountryName());
            }
        } catch (Exception e) {
            // Handle lazy loading exception
            dto.setCountryId(null);
            dto.setCountryName("Unknown");
        }

        dto.setStateName(stateName);
        dto.setStateCode(stateCode);
        dto.setCreatedBy(createdBy);
        dto.setUpdatedBy(updatedBy);
        dto.setActive(active);
        dto.setCreatedAt(createdAt);
        dto.setUpdatedAt(updatedAt);
        return dto;
    }
}
