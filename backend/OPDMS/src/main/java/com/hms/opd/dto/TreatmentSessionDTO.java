package com.hms.opd.dto;

import java.time.LocalDateTime;

public class TreatmentSessionDTO {
    private Long patientId;
    private Long doctorId;
    private String audioTranscript;
    private String generatedPrescription;
    private String sessionStatus;
    private LocalDateTime sessionStartTime;
    private LocalDateTime sessionEndTime;
    
    // Constructors
    public TreatmentSessionDTO() {}
    
    public TreatmentSessionDTO(Long patientId, Long doctorId) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.sessionStatus = "STARTED";
        this.sessionStartTime = LocalDateTime.now();
    }
    
    // Getters and Setters
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
}