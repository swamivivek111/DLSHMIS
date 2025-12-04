package com.hms.appointment.api;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appointment")
@CrossOrigin
public class AppointmentAPI {
    
    @Autowired
    private AppointmentService appointmentService;
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        try {
            System.out.println("Creating appointment: " + appointmentDTO.getPatientName());
            AppointmentDTO created = appointmentService.createAppointment(appointmentDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Appointment created successfully!");
            response.put("data", created);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("API Error: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create appointment: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO updated = appointmentService.updateAppointment(id, appointmentDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Appointment updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Appointment deleted successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        AppointmentDTO appointment = appointmentService.getAppointmentById(id);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search) {
        
        try {
            System.out.println("Getting appointments - page: " + page + ", size: " + size);
            Pageable pageable = PageRequest.of(page, size);
            Page<Appointment> appointments = appointmentService.getAllAppointments(search, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("content", appointments.getContent());
            response.put("totalPages", appointments.getTotalPages());
            response.put("totalElements", appointments.getTotalElements());
            response.put("size", appointments.getSize());
            response.put("number", appointments.getNumber());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error getting appointments: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to get appointments: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Map<String, Object>> cancelAppointment(@PathVariable Long id) {
        AppointmentDTO cancelled = appointmentService.cancelAppointment(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Appointment cancelled successfully!");
        response.put("data", cancelled);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PutMapping("/reschedule/{id}")
    public ResponseEntity<Map<String, Object>> rescheduleAppointment(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        
        LocalDateTime newDate = LocalDateTime.parse((String) request.get("appointmentDate"));
        String newTimeSlot = (String) request.get("timeSlot");
        
        AppointmentDTO rescheduled = appointmentService.rescheduleAppointment(id, newDate, newTimeSlot);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Appointment rescheduled successfully!");
        response.put("data", rescheduled);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/available-slots/{doctorId}/{date}")
    public ResponseEntity<List<String>> getAvailableTimeSlots(
            @PathVariable Long doctorId,
            @PathVariable String date) {
        
        LocalDateTime appointmentDate = LocalDateTime.parse(date + "T00:00:00");
        List<String> bookedSlots = appointmentService.getAvailableTimeSlots(doctorId, appointmentDate);
        return ResponseEntity.ok(bookedSlots);
    }
    
    @GetMapping("/booked-slots/{doctorId}/{date}")
    public ResponseEntity<List<String>> getBookedTimeSlots(
            @PathVariable Long doctorId,
            @PathVariable String date) {
        
        LocalDateTime appointmentDate = LocalDateTime.parse(date + "T00:00:00");
        List<String> bookedSlots = appointmentService.getAvailableTimeSlots(doctorId, appointmentDate);
        return ResponseEntity.ok(bookedSlots);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDTO>> getDoctorAppointments(
            @PathVariable Long doctorId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        
        LocalDateTime start = LocalDateTime.parse(startDate + "T00:00:00");
        LocalDateTime end = LocalDateTime.parse(endDate + "T23:59:59");
        
        List<AppointmentDTO> appointments = appointmentService.getDoctorAppointments(doctorId, start, end);
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/doctor-schedule/{doctorId}/{date}")
    public ResponseEntity<Map<String, Object>> getDoctorSchedule(
            @PathVariable Long doctorId,
            @PathVariable String date) {
        
        Map<String, Object> schedule = appointmentService.getDoctorSchedule(doctorId, date);
        return ResponseEntity.ok(schedule);
    }
}