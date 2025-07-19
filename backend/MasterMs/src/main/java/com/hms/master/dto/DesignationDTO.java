package com.hms.master.dto;

import java.time.LocalDateTime;

import com.hms.master.entity.Designation;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class DesignationDTO {
    private Long designationId;
    private String designationName;
    private String description;
    private String designationCode;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Designation toEntity(){
        return new Designation(designationId, designationName, description, designationCode, createdBy,
        updatedBy, active, createdAt, updatedAt);
    
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
