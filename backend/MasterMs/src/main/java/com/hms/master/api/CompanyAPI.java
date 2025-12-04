package com.hms.master.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.master.dto.CompanyDTO;
import com.hms.master.service.CompanyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/master/companies")
@CrossOrigin(origins = "*")
@Tag(name = "Company Management", description = "APIs for managing companies")
public class CompanyAPI {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/getall")
    @Operation(summary = "Get all companies with pagination and search")
    public ResponseEntity<Map<String, Object>> getAllCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        try {
            Page<CompanyDTO> companiesPage = companyService.getAllCompanies(page, limit, search);
            
            Map<String, Object> response = new HashMap<>();
            response.put("companies", companiesPage.getContent());
            response.put("totalPages", companiesPage.getTotalPages());
            response.put("totalElements", companiesPage.getTotalElements());
            response.put("currentPage", companiesPage.getNumber());
            response.put("size", companiesPage.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", "Failed to retrieve companies: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/active")
    @Operation(summary = "Get all active companies")
    public ResponseEntity<List<CompanyDTO>> getAllActiveCompanies() {
        try {
            List<CompanyDTO> companies = companyService.getAllActiveCompanies();
            return ResponseEntity.ok(companies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "Get company by ID")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id) {
        try {
            return companyService.getCompanyById(id)
                    .map(company -> ResponseEntity.ok(company))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    @Operation(summary = "Create a new company")
    public ResponseEntity<Map<String, Object>> createCompany(@RequestBody CompanyDTO companyDTO) {
        try {
            CompanyDTO createdCompany = companyService.createCompany(companyDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Company created successfully");
            response.put("company", createdCompany);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Update an existing company")
    public ResponseEntity<Map<String, Object>> updateCompany(@PathVariable Long id, @RequestBody CompanyDTO companyDTO) {
        try {
            CompanyDTO updatedCompany = companyService.updateCompany(id, companyDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Company updated successfully");
            response.put("company", updatedCompany);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a company")
    public ResponseEntity<Map<String, Object>> deleteCompany(@PathVariable Long id) {
        try {
            companyService.deleteCompany(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Company deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}