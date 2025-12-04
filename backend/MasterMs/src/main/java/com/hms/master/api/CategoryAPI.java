package com.hms.master.api;

import com.hms.master.entity.Category;
import com.hms.master.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/master/categories")
@CrossOrigin(origins = "*")
public class CategoryAPI {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findByIsActiveTrue();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategories(@RequestParam String query) {
        List<Category> categories = categoryRepository.searchCategories(query);
        return ResponseEntity.ok(categories);
    }
    
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
        try {
            if (categoryRepository.existsByCategoryNameAndIsActiveTrue(category.getCategoryName())) {
                return ResponseEntity.badRequest().body("Category name already exists");
            }
            
            Category savedCategory = categoryRepository.save(category);
            return ResponseEntity.ok(savedCategory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating category: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (!optionalCategory.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Category category = optionalCategory.get();
            category.setCategoryName(categoryDetails.getCategoryName());
            category.setCategoryCode(categoryDetails.getCategoryCode());
            category.setDescription(categoryDetails.getDescription());
            category.setCategoryType(categoryDetails.getCategoryType());
            category.setIsActive(categoryDetails.getIsActive());
            
            Category updatedCategory = categoryRepository.save(category);
            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (!optionalCategory.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Category category = optionalCategory.get();
            category.setIsActive(false);
            categoryRepository.save(category);
            
            return ResponseEntity.ok().body("Category deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category: " + e.getMessage());
        }
    }
}