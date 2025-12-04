package com.hms.opd.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OPDVisitCreatedEvent {
    private Long visitId;
    private Long patientId;
    private Long doctorId;
    private Long hospitalId;
    private LocalDateTime visitDate;
    private String status;
    private Double consultationFee;
    private LocalDateTime eventTime = LocalDateTime.now();
}