package com.hms.master.api;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.master.dto.PatientCategoryDTO;
import com.hms.master.service.PatientCategoryService;

@RestController
@RequestMapping("/master/patient-categories")
@CrossOrigin(origins = "*")
public class PatientCategoryAPI {

    @Autowired
    private PatientCategoryService service;

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        try {
            Page<PatientCategoryDTO> categoriesPage = service.getAllCategories(page, limit, search);
            
            Map<String, Object> response = new HashMap<>();
            response.put("patientCategories", categoriesPage.getContent());
            response.put("totalPages", categoriesPage.getTotalPages());
            response.put("totalElements", categoriesPage.getTotalElements());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", "Failed to retrieve categories: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PatientCategoryDTO> getCategoryById(@PathVariable Long id) {
        return service.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createCategory(@RequestBody PatientCategoryDTO dto) {
        try {
            PatientCategoryDTO created = service.createCategory(dto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Patient category created successfully");
            response.put("category", created);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateCategory(@PathVariable Long id, @RequestBody PatientCategoryDTO dto) {
        try {
            PatientCategoryDTO updated = service.updateCategory(id, dto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Patient category updated successfully");
            response.put("category", updated);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Long id) {
        try {
            service.deleteCategory(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Patient category deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}