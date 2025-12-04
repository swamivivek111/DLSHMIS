package com.hms.user.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.user.service.AuditService;
import com.hms.user.jwt.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class LogoutAPI {
    
    @Autowired
    private AuditService auditService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/logout-secure")
    public ResponseEntity<Map<String, String>> logoutSecure(@RequestHeader(value = "Authorization", required = false) String token, HttpServletRequest request) {
        return performLogout(token, request);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestHeader(value = "Authorization", required = false) String token, HttpServletRequest request) {
        return performLogout(token, request);
    }
    
    private ResponseEntity<Map<String, String>> performLogout(String token, HttpServletRequest request) {
        String userEmail = "Unknown";
        Long userId = null;
        String userRole = "Unknown";
        
        try {
            System.out.println("Logout API called with token: " + (token != null ? "Present" : "Missing"));
            
            if (token != null && token.startsWith("Bearer ")) {
                // Extract token from Bearer header
                String jwtToken = token.substring(7);
                
                // Try to extract user info, but don't fail if token is invalid
                try {
                    userEmail = jwtUtil.getUsernameFromToken(jwtToken);
                    userId = Long.valueOf(jwtUtil.getClaimFromToken(jwtToken, claims -> claims.get("id").toString()));
                    userRole = jwtUtil.getClaimFromToken(jwtToken, claims -> claims.get("role").toString());
                    System.out.println("Extracted user info - ID: " + userId + ", Email: " + userEmail + ", Role: " + userRole);
                } catch (Exception tokenError) {
                    System.out.println("Could not extract user info from token (token might be expired): " + tokenError.getMessage());
                }
            }
            
            // Always log audit regardless of token validity
            auditService.logUserAction("USER_LOGOUT", 
                "LOGOUT", 
                userId, userEmail, userRole, request.getRemoteAddr());
            
            System.out.println("Logout audit logged successfully");
            
        } catch (Exception e) {
            System.err.println("Logout error: " + e.getMessage());
            e.printStackTrace();
            
            // Still try to log audit with minimal info
            try {
                auditService.logUserAction("USER_LOGOUT_ERROR", 
                    "User logout attempt failed: " + e.getMessage(), 
                    userId, userEmail, userRole, request.getRemoteAddr());
            } catch (Exception auditError) {
                System.err.println("Failed to log logout error: " + auditError.getMessage());
            }
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}