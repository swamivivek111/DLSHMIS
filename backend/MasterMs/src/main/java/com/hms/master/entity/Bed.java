package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "beds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ward_id", nullable = false)
    private Long wardId;

    @Column(name = "ward_name")
    private String wardName;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "bed_number", nullable = false)
    private String bedNumber;

    @Column(name = "bed_type", nullable = false)
    private String bedType;

    @Column(name = "bed_status", nullable = false)
    private String bedStatus;

    @Column(name = "current_patient_id")
    private Long currentPatientId;

    @Column(name = "last_cleaned_date")
    private LocalDate lastCleanedDate;

    // Billing fields
    @Column(name = "bed_charges_per_day")
    private Double bedChargesPerDay;

    @Column(name = "ventilator_charge")
    private Double ventilatorCharge;

    @Column(name = "monitor_charge")
    private Double monitorCharge;

    @Column(name = "nursing_charge")
    private Double nursingCharge;

    @Column(name = "special_equipment_charge")
    private Double specialEquipmentCharge;

    // Infrastructure fields
    @Column(name = "oxygen_point_available", nullable = false)
    private Boolean oxygenPointAvailable = false;

    @Column(name = "monitor_available", nullable = false)
    private Boolean monitorAvailable = false;

    @Column(name = "suction_point_available", nullable = false)
    private Boolean suctionPointAvailable = false;
}