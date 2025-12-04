package com.hms.master.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.hms.master.entity.DoctorsSchedule;

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
public class DoctorsScheduleDTO {
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

    public DoctorsSchedule toEntity(){
        return new DoctorsSchedule(id, doctorId, date, morningSlotFrom, morningSlotTo, afternoonSlotFrom, afternoonSlotTo, eveningSlotFrom, 
        eveningSlotTo, status, createdAt, updatedAt);
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
