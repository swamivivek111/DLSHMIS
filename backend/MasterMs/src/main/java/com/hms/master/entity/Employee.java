package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.EmployeeDTO;

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
public class Employee {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long employeeId;
    private String employeeCode;
    private String titleId;
    private String firstName;
    private String middleName; 
    private String lastName;
    private String gender;
    private String dob;
    private String joiningDate;
    private String designationId;
    private Long departmentId;
    private String roleId;
    private String qualification;
    private String emailId;
    private String mobileNo;
    private String address;
    private String cityId;
    private String stateId;
    private String pincode;
    private String country;
    private Boolean remark;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EmployeeDTO toDTO(){
        return new EmployeeDTO(employeeId, employeeCode, titleId, firstName, middleName, lastName, gender, dob, 
        joiningDate, designationId, departmentId, roleId, qualification, emailId, mobileNo, address, cityId, stateId,
         pincode, country, remark, createdBy, updatedBy, active, createdAt, updatedAt);
    }
}
