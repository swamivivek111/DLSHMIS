package com.hms.master.repository;

import com.hms.master.entity.DoctorSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {
    
    @Query("SELECT ds FROM DoctorSchedule ds WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(ds.doctorName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(ds.sessionType) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "ds.active = true")
    Page<DoctorSchedule> findBySearchTerm(@Param("search") String search, Pageable pageable);
    
    List<DoctorSchedule> findByDoctorIdAndScheduleDateBetween(Long doctorId, LocalDate startDate, LocalDate endDate);
    
    List<DoctorSchedule> findByScheduleDateAndActiveTrue(LocalDate scheduleDate);
    
    List<DoctorSchedule> findByDoctorIdAndActiveTrue(Long doctorId);
    
    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctorId = :doctorId AND " +
           "ds.scheduleDate BETWEEN :startDate AND :endDate AND ds.active = true")
    List<DoctorSchedule> findDoctorScheduleInRange(@Param("doctorId") Long doctorId, 
                                                   @Param("startDate") LocalDate startDate, 
                                                   @Param("endDate") LocalDate endDate);
}