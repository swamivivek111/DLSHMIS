package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.UserProfileRoleDTO;

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
public class UserProfileRole {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long roleId;
    private String roleName;
    private String description;
    private String accessLevel;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserProfileRoleDTO toDTO(){
        return new UserProfileRoleDTO(roleId, roleName, description, accessLevel, createdBy, updatedBy, active, createdAt, updatedAt);
    }
}
