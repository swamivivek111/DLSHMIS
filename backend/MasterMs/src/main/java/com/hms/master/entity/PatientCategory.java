package com.hms.master.entity;

import java.time.LocalDateTime;
import com.hms.master.dto.PatientCategoryDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patient_category")
public class PatientCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    
    @Column(name = "category_code")
    private String categoryCode;
    
    @Column(name = "category_name")
    private String categoryName;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "discount_percentage")
    private Double discountPercentage;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
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

    public PatientCategoryDTO toDTO() {
        return new PatientCategoryDTO(categoryId, categoryCode, categoryName, description, 
                                    discountPercentage, isActive, createdAt, updatedAt);
    }
}