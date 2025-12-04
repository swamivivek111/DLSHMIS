package com.hms.master.repository;

import com.hms.master.entity.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
    List<Source> findBySourceNameContainingIgnoreCase(String sourceName);
}