package com.hms.lab.repository;

import com.hms.lab.entity.LabSample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LabSampleRepository extends JpaRepository<LabSample, Long> {
    Optional<LabSample> findByBarcode(String barcode);
    List<LabSample> findByStatus(LabSample.SampleStatus status);
}