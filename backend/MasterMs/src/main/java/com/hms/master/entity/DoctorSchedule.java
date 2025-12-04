package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "doctor_schedules")
public class DoctorSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private String doctorName;
    
    @Column(nullable = false)
    private LocalDate scheduleDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleType scheduleType; // DAILY, WEEKLY, MONTHLY
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionType sessionType; // MORNING, AFTERNOON, EVENING
    
    @Column(nullable = false)
    private LocalTime startTime;
    
    @Column(nullable = false)
    private LocalTime endTime;
    
    @Column(nullable = false)
    private Integer slotDuration = 15; // minutes
    
    @Column(nullable = false)
    private Integer maxPatients = 20;
    
    @Column(nullable = false)
    private Boolean isAvailable = true;
    
    @Column(nullable = false)
    private Boolean isHoliday = false;
    
    @Column(nullable = false)
    private Boolean isLeave = false;
    
    private String leaveReason;
    
    private String holidayReason;
    
    private String notes;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    public enum DayOfWeek {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
    
    public enum ScheduleType {
        DAILY, WEEKLY, MONTHLY
    }
    
    public enum SessionType {
        MORNING, AFTERNOON, EVENING
    }
}