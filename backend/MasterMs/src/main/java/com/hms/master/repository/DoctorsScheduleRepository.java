package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.hms.master.entity.DoctorsSchedule;

@Repository
public interface DoctorsScheduleRepository extends CrudRepository<DoctorsSchedule, Long>{
    
List<DoctorsSchedule> findByDoctorId(Long doctorId);
//List<DoctorsSchedule> findByDepartmentId(Long departmentId);
//Page<DoctorsSchedule> findByNameContainingIgnoreCase(Long doctorId, Pageable pageable);
Page<DoctorsSchedule> findAll(Pageable pageable);
    
}

