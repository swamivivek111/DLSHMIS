package com.hms.user.config;

import com.hms.user.entity.Role;
import com.hms.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultRoles();
    }

    private void initializeDefaultRoles() {
        List<Role> defaultRoles = Arrays.asList(
            // Administrative Roles
            new Role("SUPER_ADMIN", "Full system access, manages hospitals and global settings", "Administrative"),
            new Role("ADMIN", "Admin for one hospital or branch", "Administrative"),
            new Role("IT_ADMIN", "Manages system configuration, users, backups", "Administrative"),
            new Role("HR_MANAGER", "Staff recruitment, attendance, payroll", "Administrative"),
            new Role("ACCOUNTANT", "Billing, accounts, financial reports", "Administrative"),
            new Role("RECEPTIONIST", "Patient registration, appointment booking", "Administrative"),
            
            // Clinical Roles
            new Role("DOCTOR", "Treats patients, writes prescriptions", "Clinical"),
            new Role("SURGEON", "Operation theatre specialist", "Clinical"),
            new Role("PHYSICIAN", "General OPD consultant", "Clinical"),
            new Role("RADIOLOGIST", "X-Ray, CT, MRI reporting", "Clinical"),
            
            // Nursing Roles
            new Role("HEAD_NURSE", "Nursing department supervisor", "Nursing"),
            new Role("STAFF_NURSE", "Patient care, ward duties", "Nursing"),
            new Role("ICU_NURSE", "Critical care management", "Nursing"),
            
            // Laboratory Roles
            new Role("LAB_TECHNICIAN", "Handles test processing", "Laboratory"),
            new Role("PATHOLOGIST", "Reviews lab results, signs reports", "Laboratory"),
            
            // Pharmacy Roles
            new Role("PHARMACIST", "Dispenses medicine", "Pharmacy"),
            new Role("PHARMACY_ADMIN", "Manages pharma stock, billing", "Pharmacy"),
            
            // Support Roles
            new Role("SECURITY_GUARD", "Hospital security", "Support"),
            new Role("HOUSEKEEPING", "Cleaning and maintenance", "Support"),
            
            // Patient Role
            new Role("PATIENT", "Hospital patient", "Patient")
        );

        for (Role role : defaultRoles) {
            if (!roleRepository.existsByRoleName(role.getRoleName())) {
                role.setCreatedAt(LocalDateTime.now());
                role.setUpdatedAt(LocalDateTime.now());
                roleRepository.save(role);
            }
        }
    }
}