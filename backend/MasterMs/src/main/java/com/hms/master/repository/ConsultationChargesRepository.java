package com.hms.master.repository;

import com.hms.master.entity.ConsultationCharges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationChargesRepository extends JpaRepository<ConsultationCharges, Long> {
    List<ConsultationCharges> findByDepartmentId(Long departmentId);
    List<ConsultationCharges> findByDoctorId(Long doctorId);
    List<ConsultationCharges> findByTariffId(Long tariffId);
    List<ConsultationCharges> findByOpdVisitType(String opdVisitType);
}