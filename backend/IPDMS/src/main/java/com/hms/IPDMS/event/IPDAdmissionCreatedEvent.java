package com.hms.IPDMS.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IPDAdmissionCreatedEvent {
    private Long admissionId;
    private Long patientId;
    private Long doctorId;
    private Long hospitalId;
    private Long wardId;
    private Long roomId;
    private Long bedId;
    private LocalDateTime admissionDate;
    private String admissionType;
    private String reasonForAdmission;
    private LocalDateTime eventTime = LocalDateTime.now();
}