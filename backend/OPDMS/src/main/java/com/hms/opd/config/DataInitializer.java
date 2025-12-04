package com.hms.opd.config;

import com.hms.opd.entity.OPDPatientRegistration;
import com.hms.opd.repository.OPDPatientRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private OPDPatientRegistrationRepository repository;
    
    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            // Create sample data
            OPDPatientRegistration patient1 = new OPDPatientRegistration();
            patient1.setPrnNumber("PRN000001");
            patient1.setFirstName("John");
            patient1.setLastName("Doe");
            patient1.setGender(OPDPatientRegistration.Gender.MALE);
            patient1.setAge(30);
            patient1.setDateOfBirth(LocalDate.now().minusYears(30).atStartOfDay());
            patient1.setMobile("9876543210");
            patient1.setEmail("john.doe@example.com");
            patient1.setAddress("123 Main Street");
            patient1.setPatientCategoryId(1L);
            patient1.setIdProofType(OPDPatientRegistration.IdProofType.AADHAR);
            patient1.setIdProofNumber("123456789012");
            patient1.setEmergencyContactName("Jane Doe");
            patient1.setEmergencyContactPhone("9876543211");
            patient1.setRelationship(OPDPatientRegistration.Relationship.SPOUSE);
            
            repository.save(patient1);
            
            System.out.println("Sample OPD patient registration data created");
        }
    }
}