package com.hms.user.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role_permissions")
public class RolePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id")
    private Permission permission;
    
    private Boolean canCreate = false;
    private Boolean canRead = false;
    private Boolean canUpdate = false;
    private Boolean canDelete = false;

    // Constructors
    public RolePermission() {}
    
    public RolePermission(Role role, Permission permission) {
        this.role = role;
        this.permission = permission;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
    public Permission getPermission() { return permission; }
    public void setPermission(Permission permission) { this.permission = permission; }
    
    public Boolean getCanCreate() { return canCreate; }
    public void setCanCreate(Boolean canCreate) { this.canCreate = canCreate; }
    
    public Boolean getCanRead() { return canRead; }
    public void setCanRead(Boolean canRead) { this.canRead = canRead; }
    
    public Boolean getCanUpdate() { return canUpdate; }
    public void setCanUpdate(Boolean canUpdate) { this.canUpdate = canUpdate; }
    
    public Boolean getCanDelete() { return canDelete; }
    public void setCanDelete(Boolean canDelete) { this.canDelete = canDelete; }
}