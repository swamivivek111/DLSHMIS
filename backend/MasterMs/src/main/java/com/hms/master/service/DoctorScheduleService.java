package com.hms.master.service;

import com.hms.master.dto.DoctorScheduleDTO;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

public interface DoctorScheduleService {
    DoctorScheduleDTO createSchedule(DoctorScheduleDTO scheduleDTO);
    DoctorScheduleDTO updateSchedule(Long id, DoctorScheduleDTO scheduleDTO);
    DoctorScheduleDTO getScheduleById(Long id);
    Page<DoctorScheduleDTO> getAllSchedules(int page, int size, String search);
    void deleteSchedule(Long id);
    List<DoctorScheduleDTO> getSchedulesByDoctor(Long doctorId);
    List<DoctorScheduleDTO> getSchedulesByDate(LocalDate date);
    List<DoctorScheduleDTO> getSchedulesInRange(Long doctorId, LocalDate startDate, LocalDate endDate);
}