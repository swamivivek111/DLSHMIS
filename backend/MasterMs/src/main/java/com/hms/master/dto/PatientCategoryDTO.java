package com.hms.master.dto;

import java.time.LocalDateTime;
import com.hms.master.entity.PatientCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientCategoryDTO {
    private Long categoryId;
    private String categoryCode;
    private String categoryName;
    private String description;
    private Double discountPercentage;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PatientCategory toEntity() {
        PatientCategory category = new PatientCategory();
        category.setCategoryId(categoryId);
        category.setCategoryCode(categoryCode);
        category.setCategoryName(categoryName);
        category.setDescription(description);
        category.setDiscountPercentage(discountPercentage);
        category.setIsActive(isActive);
        return category;
    }
}