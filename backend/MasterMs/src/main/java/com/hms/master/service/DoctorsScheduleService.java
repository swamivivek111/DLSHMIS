package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.DoctorsScheduleDTO;
import com.hms.master.entity.DoctorsSchedule;
import com.hms.master.exception.HMSException;

public interface DoctorsScheduleService {

    DoctorsSchedule getById(Long doctorId);
    
    List<DoctorsScheduleDTO> getAllDoctorsSchedule();

    List<DoctorsScheduleDTO> findByDoctorId(Long doctorId);

    Long createDoctorsSchedule(DoctorsScheduleDTO doctorDTO);

    DoctorsScheduleDTO updateDoctorsSchedule(Long id, DoctorsScheduleDTO doctorDTO) throws HMSException;

    void deleteDoctorsSchedule(Long id) throws HMSException;

    public Page<DoctorsSchedule> findAll(Pageable pageable);//String search, 


}
