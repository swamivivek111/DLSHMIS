package com.hms.billing.repository;

import com.hms.billing.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByModuleOrderByGeneratedAtDesc(String module);
    List<Report> findByReportTypeOrderByGeneratedAtDesc(String reportType);
}