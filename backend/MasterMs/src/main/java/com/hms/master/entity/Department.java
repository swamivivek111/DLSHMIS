package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.DepartmentDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//SecondDev
@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Department {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String code;
    private String description;
    private String headOfDepartment;
    private String contactNumber;
    private String email;
    private Long hospitalId;
    private Boolean active;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DepartmentDTO toDTO(){
        return new DepartmentDTO(id, name, code, description, headOfDepartment, contactNumber, email, hospitalId, active, type, createdAt, updatedAt);
    }
}
