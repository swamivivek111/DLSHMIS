package com.hms.master.dto;

import java.time.LocalDateTime;

import com.hms.master.entity.BloodGroup;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class BloodGroupDTO {
    private Long bloodGroupId;
    private String bloodGroup;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;

    public BloodGroup toEntity(){
        return new BloodGroup(bloodGroupId, bloodGroup, createdBy, updatedBy, createdAt, updatedAt, active);
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
