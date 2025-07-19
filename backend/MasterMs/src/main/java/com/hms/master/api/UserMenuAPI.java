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

import com.hms.master.dto.UserMenuDTO;
import com.hms.master.entity.UserMenu;
import com.hms.master.exception.HMSException;
import com.hms.master.service.UserMenuService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/userMenu")
public class UserMenuAPI {
    @Autowired 
    private UserMenuService userMenuService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createUserMenu(@RequestBody UserMenuDTO userMenuDTO) throws HMSException {
        Long id = userMenuService.createUserMenu(userMenuDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserMenu created successfully!");
        response.put("id", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateUserMenu(@PathVariable Long id, @RequestBody UserMenuDTO dto) throws HMSException {
        UserMenuDTO updated = userMenuService.updateUserMenu(id, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserMenu updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteUserMenu(@PathVariable Long id) throws HMSException {
        userMenuService.deleteUserMenu(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "UserMenu deleted successfully!");
        response.put("id", id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserMenuDTO> getByid(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(userMenuService.getByid(id), HttpStatus.OK);
    }

    @GetMapping("/getall/{id}")//call 
    public ResponseEntity<List<UserMenuDTO>> getAllUserMenus(@PathVariable Long id) {
        return ResponseEntity.ok(userMenuService.getAllUserMenu(id));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllUserMenus(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<UserMenu> userMenus = userMenuService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("userMenus", userMenus.getContent());
        response.put("totalPages", userMenus.getTotalPages());
        response.put("totalItems", userMenus.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
