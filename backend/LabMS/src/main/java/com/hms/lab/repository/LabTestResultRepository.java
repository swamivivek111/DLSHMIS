package com.hms.lab.repository;

import com.hms.lab.entity.LabTestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabTestResultRepository extends JpaRepository<LabTestResult, Long> {
    List<LabTestResult> findByValidated(Boolean validated);
}