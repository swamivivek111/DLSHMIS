package com.hms.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long permissionId;
    
    @Column(unique = true, nullable = false)
    private String permissionName;
    
    private String module;
    private String description;
    private Boolean active = true;

    // Constructors
    public Permission() {}
    
    public Permission(String permissionName, String module, String description) {
        this.permissionName = permissionName;
        this.module = module;
        this.description = description;
    }

    // Getters and Setters
    public Long getPermissionId() { return permissionId; }
    public void setPermissionId(Long permissionId) { this.permissionId = permissionId; }
    
    public String getPermissionName() { return permissionName; }
    public void setPermissionName(String permissionName) { this.permissionName = permissionName; }
    
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}