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
@Table(name = "opd_queue")
public class OPDQueue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long queueId;
    
    @Column(nullable = false)
    private Long visitId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private Integer tokenNumber;
    
    @Enumerated(EnumType.STRING)
    private QueueStatus status = QueueStatus.WAITING;
    
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.NORMAL;
    
    @Column(nullable = false)
    private LocalDateTime queueTime = LocalDateTime.now();
    
    private LocalDateTime calledTime;
    private LocalDateTime completedTime;
    
    private String notes;
    
    public enum QueueStatus {
        WAITING, CALLED, IN_PROGRESS, COMPLETED, SKIPPED
    }
    
    public enum Priority {
        LOW, NORMAL, HIGH, EMERGENCY
    }
}