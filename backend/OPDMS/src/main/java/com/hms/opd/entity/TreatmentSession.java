package com.hms.opd.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "treatment_sessions")
public class TreatmentSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
    
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    
    @Column(name = "audio_transcript", columnDefinition = "TEXT")
    private String audioTranscript;
    
    @Column(name = "generated_prescription", columnDefinition = "TEXT")
    private String generatedPrescription;
    
    @Column(name = "session_status")
    private String sessionStatus;
    
    @Column(name = "session_start_time")
    private LocalDateTime sessionStartTime;
    
    @Column(name = "session_end_time")
    private LocalDateTime sessionEndTime;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public TreatmentSession() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    
    public String getAudioTranscript() { return audioTranscript; }
    public void setAudioTranscript(String audioTranscript) { this.audioTranscript = audioTranscript; }
    
    public String getGeneratedPrescription() { return generatedPrescription; }
    public void setGeneratedPrescription(String generatedPrescription) { this.generatedPrescription = generatedPrescription; }
    
    public String getSessionStatus() { return sessionStatus; }
    public void setSessionStatus(String sessionStatus) { this.sessionStatus = sessionStatus; }
    
    public LocalDateTime getSessionStartTime() { return sessionStartTime; }
    public void setSessionStartTime(LocalDateTime sessionStartTime) { this.sessionStartTime = sessionStartTime; }
    
    public LocalDateTime getSessionEndTime() { return sessionEndTime; }
    public void setSessionEndTime(LocalDateTime sessionEndTime) { this.sessionEndTime = sessionEndTime; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}