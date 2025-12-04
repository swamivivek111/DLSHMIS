package com.hms.RadiologyMS.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RadiologyOrderCreatedEvent {
    private Long orderId;
    private Long patientId;
    private Long doctorId;
    private String testName;
    private String testCode;
    private String bodyPart;
    private String priority;
    private LocalDateTime orderDate;
    private LocalDateTime eventTime = LocalDateTime.now();
}