package com.hms.user.service;

import com.hms.user.dto.UserDTO;
import com.hms.user.entity.Role;
import com.hms.user.entity.User;
import com.hms.user.exception.UserException;
import com.hms.user.repository.RoleRepository;
import com.hms.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User createUser(UserDTO userDTO) throws UserException {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserException("User with email '" + userDTO.getEmail() + "' already exists");
        }
        
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        user.setProfileId(userDTO.getProfileId());
        user.setActive(true);
        
        return userRepository.save(user);
    }
    
    public User updateUser(Long userId, UserDTO userDTO) throws UserException {
        Optional<User> existingUser = userRepository.findById(userId);
        if (!existingUser.isPresent()) {
            throw new UserException("User not found with ID: " + userId);
        }
        
        User user = existingUser.get();
        
        // Check if email is being changed and if new email already exists
        if (!user.getEmail().equals(userDTO.getEmail()) && 
            userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserException("User with email '" + userDTO.getEmail() + "' already exists");
        }
        
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setProfileId(userDTO.getProfileId());
        user.setActive(userDTO.getActive() != null ? userDTO.getActive() : true);
        
        // Only update password if provided
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        
        return userRepository.save(user);
    }
    
    public void deleteUser(Long userId) throws UserException {
        if (!userRepository.existsById(userId)) {
            throw new UserException("User not found with ID: " + userId);
        }
        userRepository.deleteById(userId);
    }
    
    public User getUserById(Long userId) throws UserException {
        return userRepository.findById(userId)
            .orElseThrow(() -> new UserException("User not found with ID: " + userId));
    }
    
    public Page<User> getAllUsers(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        
        if (search != null && !search.trim().isEmpty()) {
            return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                search.trim(), search.trim(), pageable);
        }
        
        return userRepository.findAll(pageable);
    }
    
    public List<User> getActiveUsers() {
        return userRepository.findByActiveTrue();
    }
    
    public User assignRole(Long userId, Long roleId) throws UserException {
        User user = getUserById(userId);
        Role role = roleRepository.findById(roleId)
            .orElseThrow(() -> new UserException("Role not found with ID: " + roleId));
        
        user.setUserRole(role);
        return userRepository.save(user);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}