package com.hms.master.entity;

import java.time.LocalDateTime;

import com.hms.master.dto.TitleDTO;

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
public class Title {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long titleId;
    private String titleName;
    private String gender;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TitleDTO toDTO(){
        return new TitleDTO(titleId, titleName, gender, active, createdAt, updatedAt);
    }
}
