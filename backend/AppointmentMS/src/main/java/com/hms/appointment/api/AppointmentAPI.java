package com.hms.appointment.api;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.service.APIService;
import com.hms.appointment.service.AppointmentService;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/appointment")
public class AppointmentAPI {
    @Autowired 
    private AppointmentService appointmentService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> addAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HMSException {
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO), HttpStatus.CREATED);
    }
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) throws HMSException {
        appointmentService.cancelAppointment(id);
        return new ResponseEntity("Appointment Canceled", HttpStatus.OK);
    }

    // 1. Schedule Appointment

    // 2. Update Appointment
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO dto) throws HMSException {
        AppointmentDTO updated = appointmentService.updateAppointment(id, dto);
        return ResponseEntity.ok(updated);
    }

    // 3. Cancel Appointment

    // 4. Delete Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted");
    }

    // 5. Get Appointment by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) throws HMSException {
        return appointmentService.getAppointmentById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new HMSException("APPOINTMENT_NOT_FOUND"));
    }

    // 6. Get All Appointments
    @GetMapping("/getall")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // 7. Get Appointments by Patient ID
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientId(patientId));
    }

    // 8. Get Appointments by Doctor ID
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctorId));
    }

    // 9. Get Appointments by Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByStatus(status));
    }

    // 10. Get Appointments Between Dates
    @GetMapping("/between")
    public ResponseEntity<List<Appointment>> getAppointmentsBetween(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
        return ResponseEntity.ok(appointmentService.getAppointmentsBetweenDates(start, end));
    }

    // 11. Reschedule Appointment
    @PutMapping("/reschedule/{id}")
    public ResponseEntity<String> rescheduleAppointment(
            @PathVariable Long id,
            @RequestParam("newDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime newDateTime
    ) throws HMSException {
        appointmentService.rescheduleAppointment(id, newDateTime);
        return ResponseEntity.ok("Appointment rescheduled");
    }

    // 12. Complete Appointment
    @PutMapping("/complete/{id}")
    public ResponseEntity<String> completeAppointment(@PathVariable Long id) throws HMSException {
        appointmentService.completeAppointment(id);
        return ResponseEntity.ok("Appointment completed");
    }

}
