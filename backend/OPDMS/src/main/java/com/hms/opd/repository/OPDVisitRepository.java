package com.hms.opd.repository;

import com.hms.opd.entity.OPDVisit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OPDVisitRepository extends JpaRepository<OPDVisit, Long> {
    List<OPDVisit> findByPatientId(Long patientId);
    List<OPDVisit> findByDoctorId(Long doctorId);
    List<OPDVisit> findByStatus(OPDVisit.VisitStatus status);
    List<OPDVisit> findByVisitDateBetween(LocalDateTime start, LocalDateTime end);
    Page<OPDVisit> findByPatientIdContaining(Long patientId, Pageable pageable);
}