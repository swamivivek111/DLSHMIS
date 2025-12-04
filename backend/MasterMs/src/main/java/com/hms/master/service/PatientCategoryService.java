package com.hms.master.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.hms.master.dto.PatientCategoryDTO;
import com.hms.master.entity.PatientCategory;
import com.hms.master.repository.PatientCategoryRepository;

@Service
public class PatientCategoryService {

    @Autowired
    private PatientCategoryRepository repository;

    public Page<PatientCategoryDTO> getAllCategories(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("categoryName").ascending());
        Page<PatientCategory> categories = repository.findAllWithSearch(search, pageable);
        return categories.map(PatientCategory::toDTO);
    }

    public List<PatientCategoryDTO> getAllActiveCategories() {
        return repository.findByIsActiveTrue().stream().map(PatientCategory::toDTO).toList();
    }

    public Optional<PatientCategoryDTO> getCategoryById(Long id) {
        return repository.findById(id).map(PatientCategory::toDTO);
    }

    public PatientCategoryDTO createCategory(PatientCategoryDTO dto) {
        if (repository.existsByCategoryCode(dto.getCategoryCode())) {
            throw new RuntimeException("Category code already exists");
        }
        if (repository.existsByCategoryName(dto.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }
        PatientCategory category = dto.toEntity();
        return repository.save(category).toDTO();
    }

    public PatientCategoryDTO updateCategory(Long id, PatientCategoryDTO dto) {
        PatientCategory existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        if (repository.existsByCategoryCodeAndCategoryIdNot(dto.getCategoryCode(), id)) {
            throw new RuntimeException("Category code already exists");
        }
        if (repository.existsByCategoryNameAndCategoryIdNot(dto.getCategoryName(), id)) {
            throw new RuntimeException("Category name already exists");
        }
        
        existing.setCategoryCode(dto.getCategoryCode());
        existing.setCategoryName(dto.getCategoryName());
        existing.setDescription(dto.getDescription());
        existing.setDiscountPercentage(dto.getDiscountPercentage());
        existing.setIsActive(dto.getIsActive());
        
        return repository.save(existing).toDTO();
    }

    public void deleteCategory(Long id) {
        repository.deleteById(id);
    }
}