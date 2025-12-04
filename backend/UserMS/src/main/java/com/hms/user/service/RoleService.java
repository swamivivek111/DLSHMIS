package com.hms.user.service;

import com.hms.user.dto.RoleDTO;
import com.hms.user.entity.Role;
import com.hms.user.exception.UserException;
import com.hms.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    
    @Autowired
    private RoleRepository roleRepository;
    
    public Role createRole(RoleDTO roleDTO) throws UserException {
        if (roleRepository.existsByRoleName(roleDTO.getRoleName())) {
            throw new UserException("Role with name '" + roleDTO.getRoleName() + "' already exists");
        }
        
        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());
        role.setDescription(roleDTO.getDescription());
        role.setCategory(roleDTO.getCategory());
        role.setActive(roleDTO.getActive());
        role.setCreatedAt(LocalDateTime.now());
        role.setUpdatedAt(LocalDateTime.now());
        
        return roleRepository.save(role);
    }
    
    public Role updateRole(Long roleId, RoleDTO roleDTO) throws UserException {
        Optional<Role> existingRole = roleRepository.findById(roleId);
        if (!existingRole.isPresent()) {
            throw new UserException("Role not found with ID: " + roleId);
        }
        
        Role role = existingRole.get();
        
        // Check if role name is being changed and if new name already exists
        if (!role.getRoleName().equals(roleDTO.getRoleName()) && 
            roleRepository.existsByRoleName(roleDTO.getRoleName())) {
            throw new UserException("Role with name '" + roleDTO.getRoleName() + "' already exists");
        }
        
        role.setRoleName(roleDTO.getRoleName());
        role.setDescription(roleDTO.getDescription());
        role.setCategory(roleDTO.getCategory());
        role.setActive(roleDTO.getActive());
        role.setUpdatedAt(LocalDateTime.now());
        
        return roleRepository.save(role);
    }
    
    public void deleteRole(Long roleId) throws UserException {
        if (!roleRepository.existsById(roleId)) {
            throw new UserException("Role not found with ID: " + roleId);
        }
        roleRepository.deleteById(roleId);
    }
    
    public Role getRoleById(Long roleId) throws UserException {
        return roleRepository.findById(roleId)
            .orElseThrow(() -> new UserException("Role not found with ID: " + roleId));
    }
    
    public Page<Role> getAllRoles(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("roleName"));
        
        if (search != null && !search.trim().isEmpty()) {
            return roleRepository.findBySearchTerm(search.trim(), pageable);
        }
        
        return roleRepository.findAll(pageable);
    }
    
    public List<Role> getActiveRoles() {
        return roleRepository.findByActiveTrue();
    }
    
    public List<Role> getRolesByCategory(String category) {
        return roleRepository.findByCategory(category);
    }
}