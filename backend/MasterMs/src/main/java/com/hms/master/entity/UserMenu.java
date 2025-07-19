package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.UserMenuDTO;

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
public class UserMenu {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long employeeCode;
    private String roleName;
    private String permissions;
    private String menuFieldsList;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserMenuDTO toDTO(){
        return new UserMenuDTO(id, employeeCode, roleName, permissions, menuFieldsList, createdAt, updatedAt);
    }
}
