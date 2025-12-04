package com.hms.lab.repository;

import com.hms.lab.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabOrderRepository extends JpaRepository<LabOrder, Long> {
    List<LabOrder> findByPatientId(Long patientId);
    List<LabOrder> findByStatus(LabOrder.OrderStatus status);
    List<LabOrder> findByPriority(LabOrder.Priority priority);
}