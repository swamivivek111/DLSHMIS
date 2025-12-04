package com.hms.master.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorScheduleDTO {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private LocalDate scheduleDate;
    private String dayOfWeek;
    private String scheduleType;
    private String sessionType;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer slotDuration;
    private Integer maxPatients;
    private Boolean isAvailable;
    private Boolean isHoliday;
    private Boolean isLeave;
    private String leaveReason;
    private String holidayReason;
    private String notes;
    private Boolean active;
}