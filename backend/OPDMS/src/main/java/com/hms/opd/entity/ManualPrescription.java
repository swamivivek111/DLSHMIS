package com.hms.opd.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "manual_prescriptions")
public class ManualPrescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
    
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    
    @Column(name = "medicine_name", nullable = false)
    private String medicineName;
    
    @Column(name = "dosage")
    private String dosage;
    
    @Column(name = "morning_dose")
    private Boolean morningDose = false;
    
    @Column(name = "afternoon_dose")
    private Boolean afternoonDose = false;
    
    @Column(name = "evening_dose")
    private Boolean eveningDose = false;
    
    @Column(name = "before_food")
    private Boolean beforeFood = false;
    
    @Column(name = "after_food")
    private Boolean afterFood = false;
    
    @Column(name = "duration")
    private String duration;
    
    @Column(name = "prescription_text", columnDefinition = "TEXT")
    private String prescriptionText;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public ManualPrescription() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    
    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }
    
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    
    public Boolean getMorningDose() { return morningDose; }
    public void setMorningDose(Boolean morningDose) { this.morningDose = morningDose; }
    
    public Boolean getAfternoonDose() { return afternoonDose; }
    public void setAfternoonDose(Boolean afternoonDose) { this.afternoonDose = afternoonDose; }
    
    public Boolean getEveningDose() { return eveningDose; }
    public void setEveningDose(Boolean eveningDose) { this.eveningDose = eveningDose; }
    
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public Boolean getBeforeFood() { return beforeFood; }
    public void setBeforeFood(Boolean beforeFood) { this.beforeFood = beforeFood; }
    
    public Boolean getAfterFood() { return afterFood; }
    public void setAfterFood(Boolean afterFood) { this.afterFood = afterFood; }
    
    public String getPrescriptionText() { return prescriptionText; }
    public void setPrescriptionText(String prescriptionText) { this.prescriptionText = prescriptionText; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}