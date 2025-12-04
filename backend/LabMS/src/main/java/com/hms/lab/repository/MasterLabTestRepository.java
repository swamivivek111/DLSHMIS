package com.hms.lab.repository;

import com.hms.lab.entity.MasterLabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MasterLabTestRepository extends JpaRepository<MasterLabTest, Long> {
    List<MasterLabTest> findByCategory(String category);
    List<MasterLabTest> findByActiveTrue();
}