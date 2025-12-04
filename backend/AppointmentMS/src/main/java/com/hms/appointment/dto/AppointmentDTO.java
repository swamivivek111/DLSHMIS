package com.hms.appointment.dto;

import com.hms.appointment.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long appointmentId;
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long departmentId;
    private String departmentName;
    private LocalDateTime appointmentDate;
    private String timeSlot;
    private String sessionType;
    private Appointment.AppointmentStatus status;
    private String notes;
    private String bookedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Appointment toEntity() {
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(this.appointmentId);
        appointment.setPatientId(this.patientId);
        appointment.setPatientName(this.patientName);
        appointment.setDoctorId(this.doctorId);
        appointment.setDoctorName(this.doctorName);
        appointment.setDepartmentId(this.departmentId);
        appointment.setDepartmentName(this.departmentName);
        appointment.setAppointmentDate(this.appointmentDate);
        appointment.setTimeSlot(this.timeSlot);
        appointment.setSessionType(this.sessionType);
        appointment.setStatus(this.status != null ? this.status : Appointment.AppointmentStatus.SCHEDULED);
        appointment.setNotes(this.notes);
        appointment.setBookedBy(this.bookedBy);
        appointment.setCreatedAt(this.createdAt);
        appointment.setUpdatedAt(this.updatedAt);
        return appointment;
    }
}