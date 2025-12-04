package com.hms.master.api;

import com.hms.master.dto.DoctorScheduleDTO;
import com.hms.master.service.DoctorScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/master/doctor-schedules")
@CrossOrigin
public class DoctorScheduleAPI {

    @Autowired
    private DoctorScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<DoctorScheduleDTO> createSchedule(@RequestBody DoctorScheduleDTO scheduleDTO) {
        DoctorScheduleDTO created = scheduleService.createSchedule(scheduleDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorScheduleDTO> updateSchedule(@PathVariable Long id, @RequestBody DoctorScheduleDTO scheduleDTO) {
        DoctorScheduleDTO updated = scheduleService.updateSchedule(id, scheduleDTO);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorScheduleDTO> getScheduleById(@PathVariable Long id) {
        DoctorScheduleDTO schedule = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(schedule);
    }

    @GetMapping
    public ResponseEntity<Page<DoctorScheduleDTO>> getAllSchedules(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search) {
        Page<DoctorScheduleDTO> schedules = scheduleService.getAllSchedules(page, size, search);
        return ResponseEntity.ok(schedules);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorScheduleDTO>> getSchedulesByDoctor(@PathVariable Long doctorId) {
        List<DoctorScheduleDTO> schedules = scheduleService.getSchedulesByDoctor(doctorId);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<DoctorScheduleDTO>> getSchedulesByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<DoctorScheduleDTO> schedules = scheduleService.getSchedulesByDate(date);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/doctor/{doctorId}/range")
    public ResponseEntity<List<DoctorScheduleDTO>> getSchedulesInRange(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<DoctorScheduleDTO> schedules = scheduleService.getSchedulesInRange(doctorId, startDate, endDate);
        return ResponseEntity.ok(schedules);
    }
}