package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ward_id", nullable = false)
    private Long wardId;

    @Column(name = "ward_name")
    private String wardName;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "room_type", nullable = false)
    private String roomType;

    @Column(name = "floor_no", nullable = false)
    private String floorNo;

    @Column(name = "block_wing", nullable = false)
    private String blockWing;

    @Column(name = "max_beds_allowed", nullable = false)
    private Integer maxBedsAllowed;

    @Column(name = "room_status", nullable = false)
    private String roomStatus;

    // Financial fields
    @Column(name = "room_charges_per_day")
    private Double roomChargesPerDay;

    @Column(name = "nursing_charges")
    private Double nursingCharges;

    @Column(name = "utility_charges")
    private Double utilityCharges;

    // Infrastructure fields
    @Column(name = "has_oxygen_point", nullable = false)
    private Boolean hasOxygenPoint = false;

    @Column(name = "has_ventilator_support", nullable = false)
    private Boolean hasVentilatorSupport = false;

    @Column(name = "has_monitor", nullable = false)
    private Boolean hasMonitor = false;

    @Column(name = "is_ac", nullable = false)
    private Boolean isAC = false;

    @Column(name = "has_attached_washroom", nullable = false)
    private Boolean hasAttachedWashroom = false;
}