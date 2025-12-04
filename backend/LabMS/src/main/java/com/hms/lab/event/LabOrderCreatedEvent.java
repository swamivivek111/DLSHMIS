package com.hms.lab.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabOrderCreatedEvent {
    private Long orderId;
    private Long patientId;
    private Long doctorId;
    private String testName;
    private String priority;
    private LocalDateTime orderDate;
    private String status;
    private LocalDateTime eventTime = LocalDateTime.now();
}