package com.hms.user.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.user.dto.LoginDTO;
import com.hms.user.dto.ResponseDTO;
import com.hms.user.dto.UserDTO;
import com.hms.user.exception.UserException;
import com.hms.user.jwt.JwtUtil;
import com.hms.user.service.UserService;
import com.hms.user.service.AuditService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.HashMap;
import java.util.Map;



@RestController
@RequestMapping("/user")
@Validated//For UserDTO validations
@CrossOrigin//Opentoall as of now
public class UserAPI {
    @Autowired
    UserService userService;

    @Autowired 
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuditService auditService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO, HttpServletRequest request) throws UserException {
        userService.resisterUser(userDTO);
        
        // Audit logging
        auditService.logUserAction("USER_REGISTER", 
            "New user registered", 
            null, userDTO.getEmail(), "USER", request.getRemoteAddr());
            
        return new ResponseEntity<ResponseDTO>(new ResponseDTO("User created successfuly!"), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody @Valid LoginDTO loginDTO, HttpServletRequest request) throws UserException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        } catch (AuthenticationException e) {
            // Audit failed login
            auditService.logUserAction("LOGIN_FAILED", 
                "Failed login attempt", 
                null, loginDTO.getEmail(), null, request.getRemoteAddr());
            throw new UserException("INVALID_CREDENTIALS");
        }
        
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());
        final String accessToken = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);
        
        // Audit successful login
        Long userId = Long.valueOf(jwtUtil.getClaimFromToken(accessToken, claims -> claims.get("id").toString()));
        String userRole = jwtUtil.getClaimFromToken(accessToken, claims -> claims.get("role").toString());
        auditService.logUserAction("USER_LOGIN", 
            "LOGIN", 
            userId, loginDTO.getEmail(), userRole, request.getRemoteAddr());
        
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        tokens.put("tokenType", "Bearer");
        
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) throws UserException {
        String refreshToken = request.get("refreshToken");
        
        if (refreshToken == null || jwtUtil.isTokenExpired(refreshToken)) {
            throw new UserException("INVALID_REFRESH_TOKEN");
        }
        
        if (!"refresh".equals(jwtUtil.getTokenType(refreshToken))) {
            throw new UserException("INVALID_TOKEN_TYPE");
        }
        
        String username = jwtUtil.getUsernameFromToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        
        String newAccessToken = jwtUtil.generateToken(userDetails);
        String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);
        
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", newAccessToken);
        tokens.put("refreshToken", newRefreshToken);
        tokens.put("tokenType", "Bearer");
        
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> isExists(@PathVariable Long id) throws UserException {
        return ResponseEntity.ok(userService.exitUserById(id));
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("UserMS is working!");
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "UserMS");
        return ResponseEntity.ok(status);
    }
    
    
}
