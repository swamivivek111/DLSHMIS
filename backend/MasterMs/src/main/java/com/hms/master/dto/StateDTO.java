package com.hms.master.dto;

import java.time.LocalDateTime;

import com.hms.master.entity.Country;
import com.hms.master.entity.State;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StateDTO {

    private Long stateId;
    private Long countryId;
    private String countryName;
    private String stateName;
    private String stateCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public State toEntity(Country country) {
        State state = new State();
        state.setStateId(this.stateId);
        state.setCountry(country); // Set the full country object
        state.setStateName(this.stateName);
        state.setStateCode(this.stateCode);
        state.setCreatedBy(this.createdBy);
        state.setUpdatedBy(this.updatedBy);
        state.setActive(this.active);
        state.setCreatedAt(this.createdAt);
        state.setUpdatedAt(this.updatedAt);
        return state;
    }
}
