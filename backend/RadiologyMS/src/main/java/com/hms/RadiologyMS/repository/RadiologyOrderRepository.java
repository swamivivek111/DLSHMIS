package com.hms.RadiologyMS.repository;

import com.hms.RadiologyMS.entity.RadiologyOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RadiologyOrderRepository extends JpaRepository<RadiologyOrder, Long> {
    List<RadiologyOrder> findByPatientId(Long patientId);
    List<RadiologyOrder> findByStatus(RadiologyOrder.OrderStatus status);
}