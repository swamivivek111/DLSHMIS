package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ward_name", nullable = false)
    private String wardName;

    @Column(name = "ward_type", nullable = false)
    private String wardType;

    @Column(name = "floor_no", nullable = false)
    private String floorNo;

    @Column(name = "block_building_name", nullable = false)
    private String blockBuildingName;

    @Column(name = "description")
    private String description;

    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "status", nullable = false)
    private String status;
}