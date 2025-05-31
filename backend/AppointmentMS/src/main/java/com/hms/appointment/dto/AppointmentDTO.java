package com.hms.appointment.dto;

import java.time.LocalDateTime;

import com.hms.appointment.entity.Appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
	private Long patientId;
	private Long doctorId;
	private LocalDateTime appointmentDateTime;
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    private String reason;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Appointment toEntity(){
        return new Appointment(id, patientId, doctorId, appointmentDateTime, status, reason, notes, createdAt, updatedAt);
    }
}
