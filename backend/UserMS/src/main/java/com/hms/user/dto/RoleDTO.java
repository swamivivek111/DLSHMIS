package com.hms.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RoleDTO {
    private Long roleId;
    
    @NotBlank(message = "Role name is required")
    @Size(min = 2, max = 50, message = "Role name must be between 2 and 50 characters")
    private String roleName;
    
    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;
    
    private String category;
    private Boolean active = true;

    // Constructors
    public RoleDTO() {}
    
    public RoleDTO(String roleName, String description, String category) {
        this.roleName = roleName;
        this.description = description;
        this.category = category;
    }

    // Getters and Setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}