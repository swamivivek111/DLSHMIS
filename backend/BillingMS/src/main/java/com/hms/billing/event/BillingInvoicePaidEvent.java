package com.hms.billing.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillingInvoicePaidEvent {
    private Long invoiceId;
    private Long patientId;
    private Double totalAmount;
    private Double paidAmount;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private String status;
    private LocalDateTime eventTime = LocalDateTime.now();
}