package com.hms.opd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "consultation_notes")
public class ConsultationNotes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteId;
    
    @Column(nullable = false)
    private Long visitId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(length = 2000)
    private String chiefComplaint;
    
    @Column(length = 2000)
    private String historyOfPresentIllness;
    
    @Column(length = 1000)
    private String pastMedicalHistory;
    
    @Column(length = 1000)
    private String familyHistory;
    
    @Column(length = 1000)
    private String socialHistory;
    
    @Column(length = 2000)
    private String physicalExamination;
    
    @Column(length = 1000)
    private String diagnosis;
    
    @Column(length = 2000)
    private String treatmentPlan;
    
    @Column(length = 1000)
    private String followUpInstructions;
    
    @Column(length = 1000)
    private String additionalNotes;
    
    @Column(nullable = false)
    private LocalDateTime consultationDate = LocalDateTime.now();
    
    private LocalDateTime nextFollowUp;
}