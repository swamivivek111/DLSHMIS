package com.hms.master.entity;

import java.time.LocalDateTime;
import java.util.Date;

import com.hms.master.dto.DoctorsScheduleDTO;

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
public class DoctorsSchedule {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Long doctorId;
    private Date date;
    private String morningSlotFrom;
    private String morningSlotTo;
    private String afternoonSlotFrom;
    private String afternoonSlotTo;
    private String eveningSlotFrom;
    private String eveningSlotTo;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DoctorsScheduleDTO toDTO(){
        return new DoctorsScheduleDTO(id, doctorId, date, morningSlotFrom, morningSlotTo, afternoonSlotFrom, afternoonSlotTo, eveningSlotFrom, 
        eveningSlotTo, status, createdAt, updatedAt);
    }
}
