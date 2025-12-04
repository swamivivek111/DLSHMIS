package com.hms.profile.config;

import com.hms.profile.entity.Doctor;
import com.hms.profile.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DoctorDataInitializer implements CommandLineRunner {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public void run(String... args) throws Exception {
        if (doctorRepository.count() == 0) {
            createDummyDoctors();
        }
    }

    private void createDummyDoctors() {
        Doctor[] doctors = {
            createDoctor("DOC001", "Senior", "Dr. John Smith", "Cardiology", 1L, "MBBS, MD Cardiology", "john.smith@hospital.com", "9876543210", "1500", "1000", "PAN001", 1L, 1L, "20%"),
            createDoctor("DOC002", "Senior", "Dr. Sarah Johnson", "Neurology", 2L, "MBBS, DM Neurology", "sarah.johnson@hospital.com", "9876543211", "1800", "1200", "PAN002", 1L, 1L, "25%"),
            createDoctor("DOC003", "Senior", "Dr. Michael Brown", "Orthopedics", 3L, "MBBS, MS Orthopedics", "michael.brown@hospital.com", "9876543212", "1600", "1100", "PAN003", 1L, 1L, "22%"),
            createDoctor("DOC004", "Senior", "Dr. Emily Davis", "Pediatrics", 4L, "MBBS, MD Pediatrics", "emily.davis@hospital.com", "9876543213", "1400", "900", "PAN004", 1L, 1L, "18%"),
            createDoctor("DOC005", "Senior", "Dr. Robert Wilson", "General Surgery", 5L, "MBBS, MS Surgery", "robert.wilson@hospital.com", "9876543214", "2000", "1500", "PAN005", 1L, 1L, "30%"),
            createDoctor("DOC006", "Senior", "Dr. Lisa Anderson", "Gynecology", 6L, "MBBS, MD Gynecology", "lisa.anderson@hospital.com", "9876543215", "1700", "1200", "PAN006", 1L, 1L, "25%"),
            createDoctor("DOC007", "Senior", "Dr. David Miller", "Dermatology", 7L, "MBBS, MD Dermatology", "david.miller@hospital.com", "9876543216", "1300", "800", "PAN007", 1L, 1L, "15%"),
            createDoctor("DOC008", "Senior", "Dr. Jennifer Garcia", "Psychiatry", 8L, "MBBS, MD Psychiatry", "jennifer.garcia@hospital.com", "9876543217", "1600", "1000", "PAN008", 1L, 1L, "20%"),
            createDoctor("DOC009", "Senior", "Dr. Christopher Lee", "Radiology", 9L, "MBBS, MD Radiology", "christopher.lee@hospital.com", "9876543218", "1500", "1000", "PAN009", 1L, 1L, "20%"),
            createDoctor("DOC010", "Senior", "Dr. Amanda Taylor", "Anesthesiology", 10L, "MBBS, MD Anesthesia", "amanda.taylor@hospital.com", "9876543219", "1400", "900", "PAN010", 1L, 1L, "18%")
        };

        for (Doctor doctor : doctors) {
            doctorRepository.save(doctor);
        }
        
        System.out.println("Created 10 dummy doctors successfully!");
    }

    private Doctor createDoctor(String code, String type, String name, String specialization, Long deptId, 
                               String qualification, String email, String contact, String firstFees, String followUpFees,
                               String panno, Long cityId, Long hospitalId, String doctorShare) {
        Doctor doctor = new Doctor();
        doctor.setCode(code);
        doctor.setType(type);
        doctor.setName(name);
        doctor.setSpecialization(specialization);
        doctor.setDepartmentId(deptId);
        doctor.setQualification(qualification);
        doctor.setEmailId(email);
        doctor.setContactNumber(contact);
        doctor.setFirstConsultationFees(firstFees);
        doctor.setFollowUpFees(followUpFees);
        doctor.setJoiningDate(java.time.LocalDate.now().minusYears(2));
        doctor.setPanno(panno);
        doctor.setAddress("Hospital Medical District, Mumbai");
        doctor.setCityId(cityId);
        doctor.setDistrictId(1L);
        doctor.setDoctorShare(doctorShare);
        doctor.setCreatedBy("System");
        doctor.setHospitalId(hospitalId);
        doctor.setActive(true);
        return doctor;
    }
}