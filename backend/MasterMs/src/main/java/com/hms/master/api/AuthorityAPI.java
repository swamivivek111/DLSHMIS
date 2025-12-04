package com.hms.master.api;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.master.dto.AuthorityDTO;
import com.hms.master.service.AuthorityService;
import com.hms.master.service.AuditService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/master/authorities")
@CrossOrigin(origins = "*")
public class AuthorityAPI {

    @Autowired
    private AuthorityService service;
    
    @Autowired
    private AuditService auditService;

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllAuthorities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        try {
            Page<AuthorityDTO> authoritiesPage = service.getAllAuthorities(page, limit, search);
            
            Map<String, Object> response = new HashMap<>();
            response.put("authorities", authoritiesPage.getContent());
            response.put("totalPages", authoritiesPage.getTotalPages());
            response.put("totalElements", authoritiesPage.getTotalElements());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", "Failed to retrieve authorities: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<AuthorityDTO> getAuthorityById(@PathVariable Long id) {
        return service.getAuthorityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createAuthority(@RequestBody AuthorityDTO dto, HttpServletRequest request) {
        try {
            AuthorityDTO created = service.createAuthority(dto);
            
            // Audit logging
            auditService.logMasterAction("AUTHORITY_CREATE", 
                created.getAuthorityName(), 
                created.getAuthorityId(), "Authority", request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authority created successfully");
            response.put("authority", created);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateAuthority(@PathVariable Long id, @RequestBody AuthorityDTO dto, HttpServletRequest request) {
        try {
            AuthorityDTO updated = service.updateAuthority(id, dto);
            
            // Audit logging
            auditService.logMasterAction("AUTHORITY_UPDATE", 
                updated.getAuthorityName(), 
                updated.getAuthorityId(), "Authority", request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authority updated successfully");
            response.put("authority", updated);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteAuthority(@PathVariable Long id) {
        try {
            service.deleteAuthority(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authority deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("errorMessage", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}