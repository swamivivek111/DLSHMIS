package com.hms.master.entity;

import java.time.LocalDateTime;
import com.hms.master.dto.AuthorityDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "authority")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authority_id")
    private Long authorityId;
    
    @Column(name = "authority_code")
    private String authorityCode;
    
    @Column(name = "authority_name")
    private String authorityName;
    
    @Column(name = "approval_limit")
    private String approvalLimit;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_by")
    private Integer createdBy;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public AuthorityDTO toDTO() {
        return new AuthorityDTO(authorityId, authorityCode, authorityName, approvalLimit, 
                              isActive, createdBy, createdAt, updatedAt);
    }
}