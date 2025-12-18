package com.hms.opd.repository;

import com.hms.opd.entity.TreatmentSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentSessionRepository extends JpaRepository<TreatmentSession, Long> {
    List<TreatmentSession> findByPatientId(Long patientId);
    List<TreatmentSession> findByDoctorId(Long doctorId);
    Optional<TreatmentSession> findByPatientIdAndSessionStatus(Long patientId, String status);
}