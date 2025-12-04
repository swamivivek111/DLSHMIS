package com.hms.appointment.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleService {
    
    private final WebClient.Builder webClientBuilder;
    
    public ScheduleService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }
    
    public Mono<List<String>> getDoctorScheduleSlots(Long doctorId, LocalDateTime date) {
        String dateStr = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
        
        return webClientBuilder.build()
            .get()
            .uri("http://localhost:8084/master/doctor-schedule/{doctorId}/{date}", doctorId, dateStr)
            .retrieve()
            .bodyToMono(Object.class)
            .map(this::parseScheduleToSlots)
            .onErrorReturn(new ArrayList<>());
    }
    
    private List<String> parseScheduleToSlots(Object scheduleData) {
        // Parse schedule data and generate time slots
        List<String> slots = new ArrayList<>();
        
        // Mock implementation - replace with actual parsing logic
        slots.add("09:00 AM - 09:15 AM");
        slots.add("09:15 AM - 09:30 AM");
        slots.add("09:30 AM - 09:45 AM");
        
        return slots;
    }
    
    public List<String> generateTimeSlots(String startTime, String endTime, int duration, String session) {
        List<String> slots = new ArrayList<>();
        
        try {
            LocalDateTime start = LocalDateTime.parse("2024-01-01T" + startTime + ":00");
            LocalDateTime end = LocalDateTime.parse("2024-01-01T" + endTime + ":00");
            
            LocalDateTime current = start;
            while (current.isBefore(end)) {
                LocalDateTime slotEnd = current.plusMinutes(duration);
                if (slotEnd.isAfter(end)) break;
                
                String slotStart = current.toLocalTime().toString();
                String slotEndStr = slotEnd.toLocalTime().toString();
                
                slots.add(formatTimeSlot(slotStart, slotEndStr));
                current = slotEnd;
            }
        } catch (Exception e) {
            // Handle parsing errors
        }
        
        return slots;
    }
    
    private String formatTimeSlot(String startTime, String endTime) {
        // Convert 24-hour format to 12-hour format with AM/PM
        try {
            LocalDateTime start = LocalDateTime.parse("2024-01-01T" + startTime);
            LocalDateTime end = LocalDateTime.parse("2024-01-01T" + endTime);
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
            return start.format(formatter) + " - " + end.format(formatter);
        } catch (Exception e) {
            return startTime + " - " + endTime;
        }
    }
}