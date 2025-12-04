package com.hms.opd.repository;

import com.hms.opd.entity.OPDQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OPDQueueRepository extends JpaRepository<OPDQueue, Long> {
    List<OPDQueue> findByDoctorIdAndStatusOrderByTokenNumber(Long doctorId, OPDQueue.QueueStatus status);
    List<OPDQueue> findByPatientId(Long patientId);
    List<OPDQueue> findByStatus(OPDQueue.QueueStatus status);
    Integer countByDoctorIdAndStatus(Long doctorId, OPDQueue.QueueStatus status);
}