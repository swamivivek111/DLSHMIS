package com.hms.lab.repository;

import com.hms.lab.entity.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, Long> {
}