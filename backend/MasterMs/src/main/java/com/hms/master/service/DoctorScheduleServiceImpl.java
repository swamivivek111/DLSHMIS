package com.hms.master.service;

import com.hms.master.dto.DoctorScheduleDTO;
import com.hms.master.entity.DoctorSchedule;
// import com.hms.master.exception.HMSException;
import com.hms.master.repository.DoctorScheduleRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorScheduleServiceImpl implements DoctorScheduleService {

    @Autowired
    private DoctorScheduleRepository scheduleRepository;

    @Override
    public DoctorScheduleDTO createSchedule(DoctorScheduleDTO scheduleDTO) {
        DoctorSchedule schedule = new DoctorSchedule();
        BeanUtils.copyProperties(scheduleDTO, schedule);
        
        if (scheduleDTO.getDayOfWeek() != null) {
            schedule.setDayOfWeek(DoctorSchedule.DayOfWeek.valueOf(scheduleDTO.getDayOfWeek()));
        }
        if (scheduleDTO.getScheduleType() != null) {
            schedule.setScheduleType(DoctorSchedule.ScheduleType.valueOf(scheduleDTO.getScheduleType()));
        }
        if (scheduleDTO.getSessionType() != null) {
            schedule.setSessionType(DoctorSchedule.SessionType.valueOf(scheduleDTO.getSessionType()));
        }
        
        DoctorSchedule saved = scheduleRepository.save(schedule);
        return convertToDTO(saved);
    }

    @Override
    public DoctorScheduleDTO updateSchedule(Long id, DoctorScheduleDTO scheduleDTO) {
        DoctorSchedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Schedule not found"));
        
        BeanUtils.copyProperties(scheduleDTO, schedule, "id");
        
        if (scheduleDTO.getDayOfWeek() != null) {
            schedule.setDayOfWeek(DoctorSchedule.DayOfWeek.valueOf(scheduleDTO.getDayOfWeek()));
        }
        if (scheduleDTO.getScheduleType() != null) {
            schedule.setScheduleType(DoctorSchedule.ScheduleType.valueOf(scheduleDTO.getScheduleType()));
        }
        if (scheduleDTO.getSessionType() != null) {
            schedule.setSessionType(DoctorSchedule.SessionType.valueOf(scheduleDTO.getSessionType()));
        }
        
        DoctorSchedule updated = scheduleRepository.save(schedule);
        return convertToDTO(updated);
    }

    @Override
    public DoctorScheduleDTO getScheduleById(Long id) {
        DoctorSchedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Schedule not found"));
        return convertToDTO(schedule);
    }

    @Override
    public Page<DoctorScheduleDTO> getAllSchedules(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("scheduleDate").descending());
        Page<DoctorSchedule> schedules = scheduleRepository.findBySearchTerm(search, pageable);
        return schedules.map(this::convertToDTO);
    }

    @Override
    public void deleteSchedule(Long id) {
        DoctorSchedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Schedule not found"));
        schedule.setActive(false);
        scheduleRepository.save(schedule);
    }

    @Override
    public List<DoctorScheduleDTO> getSchedulesByDoctor(Long doctorId) {
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndActiveTrue(doctorId);
        return schedules.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<DoctorScheduleDTO> getSchedulesByDate(LocalDate date) {
        List<DoctorSchedule> schedules = scheduleRepository.findByScheduleDateAndActiveTrue(date);
        return schedules.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<DoctorScheduleDTO> getSchedulesInRange(Long doctorId, LocalDate startDate, LocalDate endDate) {
        List<DoctorSchedule> schedules = scheduleRepository.findDoctorScheduleInRange(doctorId, startDate, endDate);
        return schedules.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private DoctorScheduleDTO convertToDTO(DoctorSchedule schedule) {
        DoctorScheduleDTO dto = new DoctorScheduleDTO();
        BeanUtils.copyProperties(schedule, dto);
        
        if (schedule.getDayOfWeek() != null) {
            dto.setDayOfWeek(schedule.getDayOfWeek().name());
        }
        if (schedule.getScheduleType() != null) {
            dto.setScheduleType(schedule.getScheduleType().name());
        }
        if (schedule.getSessionType() != null) {
            dto.setSessionType(schedule.getSessionType().name());
        }
        
        return dto;
    }
}