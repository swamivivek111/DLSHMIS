package com.hms.master.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

import com.hms.master.dto.UserProfileRoleDTO;
import com.hms.master.entity.UserProfileRole;
import com.hms.master.exception.HMSException;
import com.hms.master.service.UserProfileRoleService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/userProfileRole")
public class UserProfileRoleAPI {
    @Autowired 
    private UserProfileRoleService userProfileRoleService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createUserProfileRole(@RequestBody UserProfileRoleDTO userProfileRoleDTO) throws HMSException {
        Long id = userProfileRoleService.createUserProfileRole(userProfileRoleDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserProfileRole created successfully!");
        response.put("roleId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{roleId}")
    public ResponseEntity<Map<String, Object>> updateUserProfileRole(@PathVariable Long roleId, @RequestBody UserProfileRoleDTO dto) throws HMSException {
        UserProfileRoleDTO updated = userProfileRoleService.updateUserProfileRole(roleId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserProfileRole updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{roleId}")
    public ResponseEntity<Map<String, Object>> deleteUserProfileRole(@PathVariable Long roleId) throws HMSException {
        userProfileRoleService.deleteUserProfileRole(roleId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserProfileRole deleted successfully!");
        response.put("roleId", roleId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{roleId}")
    public ResponseEntity<UserProfileRoleDTO> getByRoleId(@PathVariable Long roleId) throws HMSException {
        return new ResponseEntity<>(userProfileRoleService.getByroleId(roleId), HttpStatus.OK);
    }

    @GetMapping("/getall/{roleId}")//call 
    public ResponseEntity<List<UserProfileRoleDTO>> getAllUserProfileRoles(@PathVariable Long roleId) {
        return ResponseEntity.ok(userProfileRoleService.getAllUserProfileRole(roleId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllUserProfileRoles(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<UserProfileRole> userProfileRoles = userProfileRoleService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("userProfileRoles", userProfileRoles.getContent());
        response.put("totalPages", userProfileRoles.getTotalPages());
        response.put("totalItems", userProfileRoles.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
