package com.hms.master.service;

import com.hms.master.entity.CategoryTariffMapping;
import com.hms.master.repository.CategoryTariffMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryTariffMappingService {
    
    @Autowired
    private CategoryTariffMappingRepository repository;
    
    public List<CategoryTariffMapping> getAllMappings() {
        return repository.findAll();
    }
    
    public List<CategoryTariffMapping> getActiveMappings() {
        return repository.findByIsActiveTrue();
    }
    
    public Optional<CategoryTariffMapping> getMappingById(Long id) {
        return repository.findById(id);
    }
    
    public CategoryTariffMapping createMapping(CategoryTariffMapping mapping) {
        return repository.save(mapping);
    }
    
    public CategoryTariffMapping updateMapping(Long id, CategoryTariffMapping mapping) {
        if (repository.existsById(id)) {
            mapping.setMappingId(id);
            return repository.save(mapping);
        }
        throw new RuntimeException("Mapping not found with id: " + id);
    }
    
    public void deleteMapping(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Mapping not found with id: " + id);
        }
    }
    
    public List<CategoryTariffMapping> getMappingsByCategory(Long categoryId) {
        return repository.findByCategoryIdAndIsActiveTrue(categoryId);
    }
    
    public List<CategoryTariffMapping> getActiveOnDate(LocalDate date) {
        return repository.findActiveOnDate(date);
    }
}