package com.hms.appointment.entity;

import java.time.LocalDateTime;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//SecondDev
@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Appointment {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long patientId;
	private Long doctorId;
	private LocalDateTime appointmentDateTime;
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    private String reason;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AppointmentDTO toDTO(){
        return new AppointmentDTO(id, patientId, doctorId, appointmentDateTime, status, reason, notes, createdAt, updatedAt);
    }
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    

}
