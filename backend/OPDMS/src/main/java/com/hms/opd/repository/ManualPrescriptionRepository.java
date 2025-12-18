package com.hms.opd.repository;

import com.hms.opd.entity.ManualPrescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ManualPrescriptionRepository extends JpaRepository<ManualPrescription, Long> {
    List<ManualPrescription> findByPatientId(Long patientId);
    List<ManualPrescription> findByPatientIdOrderByCreatedAtDesc(Long patientId);
}