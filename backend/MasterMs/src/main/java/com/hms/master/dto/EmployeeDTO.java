package com.hms.master.dto;

import java.time.LocalDateTime;

import com.hms.master.entity.Employee;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
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
    private String countryId;
    private String remark;
    private String createdBy;
    private String updatedBy;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Employee toEntity(){
        return new Employee(employeeId, employeeCode, titleId, firstName, middleName, lastName, gender, dob, 
        joiningDate, designationId, departmentId, roleId, qualification, emailId, mobileNo, address, cityId, stateId,
         pincode, countryId, remark, createdBy, updatedBy, active, createdAt, updatedAt);
    }
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Object map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }

    public Object orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}
