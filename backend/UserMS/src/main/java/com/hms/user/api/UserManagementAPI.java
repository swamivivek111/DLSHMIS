package com.hms.user.api;

import com.hms.user.dto.ResponseDTO;
import com.hms.user.dto.UserDTO;
import com.hms.user.entity.User;
import com.hms.user.exception.UserException;
import com.hms.user.service.UserManagementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
@CrossOrigin
public class UserManagementAPI {
    
    @Autowired
    private UserManagementService userManagementService;
    
    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createUser(@RequestBody @Valid UserDTO userDTO) throws UserException {
        userManagementService.createUser(userDTO);
        return new ResponseEntity<>(new ResponseDTO("User created successfully!"), HttpStatus.CREATED);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseDTO> updateUser(@PathVariable Long id, @RequestBody @Valid UserDTO userDTO) throws UserException {
        userManagementService.updateUser(id, userDTO);
        return new ResponseEntity<>(new ResponseDTO("User updated successfully!"), HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteUser(@PathVariable Long id) throws UserException {
        userManagementService.deleteUser(id);
        return new ResponseEntity<>(new ResponseDTO("User deleted successfully!"), HttpStatus.OK);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) throws UserException {
        User user = userManagementService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        Page<User> users = userManagementService.getAllUsers(page, size, search);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> users = userManagementService.getActiveUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    @PutMapping("/assign-role/{userId}/{roleId}")
    public ResponseEntity<ResponseDTO> assignRole(@PathVariable Long userId, @PathVariable Long roleId) throws UserException {
        userManagementService.assignRole(userId, roleId);
        return new ResponseEntity<>(new ResponseDTO("Role assigned successfully!"), HttpStatus.OK);
    }
    
    @GetMapping("/exists/email/{email}")
    public ResponseEntity<Boolean> checkUserExistsByEmail(@PathVariable String email) {
        boolean exists = userManagementService.existsByEmail(email);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
}