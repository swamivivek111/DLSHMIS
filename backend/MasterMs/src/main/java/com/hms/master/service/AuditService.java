package com.hms.master.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuditService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${audit.service.url}")
    private String auditServiceUrl;
    
    private static final String SECRET = "79fc72a244c391a9ba7efa28137da35d0895fd4795982863d22a21af6099365669e0a2668840a86ca3a9f07ee6c6c92dbf2b0651e5b97b52491ffee356d4dcba";
    private static final SecretKey SIGNING_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    
    public void logMasterAction(String operation, String entityName, Long entityId, String entityType, HttpServletRequest request) {
        try {
            Map<String, Object> auditLog = new HashMap<>();
            auditLog.put("operation", operation + " " + entityName);
            auditLog.put("moduleName", "Master Data");
            auditLog.put("microservice", "MasterMs");
            auditLog.put("entityType", entityType);
            auditLog.put("entityId", entityId);
            
            // Extract user info from JWT token
            String token = extractTokenFromRequest(request);
            if (token != null) {
                try {
                    Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SIGNING_KEY)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                    auditLog.put("userId", Long.valueOf(claims.get("id").toString()));
                    auditLog.put("userEmail", claims.getSubject());
                    auditLog.put("userRole", claims.get("role").toString());
                } catch (Exception e) {
                    auditLog.put("userId", null);
                    auditLog.put("userEmail", "admin@hms.com");
                    auditLog.put("userRole", "ADMIN");
                }
            } else {
                auditLog.put("userId", null);
                auditLog.put("userEmail", "admin@hms.com");
                auditLog.put("userRole", "ADMIN");
            }
            
            if (operation.contains("CREATE")) {
                auditLog.put("operationType", "CREATE");
                auditLog.put("description", "CREATE");
            } else if (operation.contains("UPDATE")) {
                auditLog.put("operationType", "UPDATE");
                auditLog.put("description", "UPDATE");
            } else if (operation.contains("DELETE")) {
                auditLog.put("operationType", "DELETE");
                auditLog.put("description", "DELETE");
            } else {
                auditLog.put("operationType", "READ");
                auditLog.put("description", "READ");
            }
            
            auditLog.put("logLevel", "INFO");
            auditLog.put("status", "SUCCESS");
            auditLog.put("ipAddress", request.getRemoteAddr());
            auditLog.put("timestamp", LocalDateTime.now());
            
            restTemplate.postForObject(auditServiceUrl + "/audit/log", auditLog, String.class);
        } catch (Exception e) {
            System.err.println("Failed to log audit: " + e.getMessage());
        }
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}