package com.hms.user.api;

import com.hms.user.dto.ResponseDTO;
import com.hms.user.dto.RoleDTO;
import com.hms.user.entity.Role;
import com.hms.user.exception.UserException;
import com.hms.user.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/role")
@Validated
@CrossOrigin
public class RoleAPI {
    
    @Autowired
    private RoleService roleService;
    
    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createRole(@RequestBody @Valid RoleDTO roleDTO) throws UserException {
        roleService.createRole(roleDTO);
        return new ResponseEntity<>(new ResponseDTO("Role created successfully!"), HttpStatus.CREATED);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseDTO> updateRole(@PathVariable Long id, @RequestBody @Valid RoleDTO roleDTO) throws UserException {
        roleService.updateRole(id, roleDTO);
        return new ResponseEntity<>(new ResponseDTO("Role updated successfully!"), HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteRole(@PathVariable Long id) throws UserException {
        roleService.deleteRole(id);
        return new ResponseEntity<>(new ResponseDTO("Role deleted successfully!"), HttpStatus.OK);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) throws UserException {
        Role role = roleService.getRoleById(id);
        return new ResponseEntity<>(role, HttpStatus.OK);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<Page<Role>> getAllRoles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        Page<Role> roles = roleService.getAllRoles(page, size, search);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Role>> getActiveRoles() {
        List<Role> roles = roleService.getActiveRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Role>> getRolesByCategory(@PathVariable String category) {
        List<Role> roles = roleService.getRolesByCategory(category);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testConnection() {
        return new ResponseEntity<>("Role API is working!", HttpStatus.OK);
    }
}