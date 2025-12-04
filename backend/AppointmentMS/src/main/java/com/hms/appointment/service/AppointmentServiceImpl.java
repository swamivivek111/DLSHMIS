package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${master.service.url}")
    private String masterServiceUrl;
    
    @Override
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        try {
            // Check if time slot is already booked
            List<String> bookedSlots = appointmentRepository.findBookedTimeSlots(
                appointmentDTO.getDoctorId(), 
                appointmentDTO.getAppointmentDate(), 
                appointmentDTO.getSessionType()
            );
            
            if (bookedSlots.contains(appointmentDTO.getTimeSlot())) {
                throw new RuntimeException("Time slot is already booked");
            }
            
            // Check if patient already has appointment with this doctor
            if (appointmentDTO.getPatientId() != null) {
                boolean hasExistingAppointment = appointmentRepository.existsByPatientIdAndDoctorIdAndStatus(
                    appointmentDTO.getPatientId(), 
                    appointmentDTO.getDoctorId(), 
                    Appointment.AppointmentStatus.SCHEDULED
                );
                
                if (hasExistingAppointment) {
                    throw new RuntimeException("Patient already has a scheduled appointment with this doctor");
                }
            }
            
            appointmentDTO.setCreatedAt(LocalDateTime.now());
            appointmentDTO.setStatus(Appointment.AppointmentStatus.SCHEDULED);
            
            Appointment appointment = appointmentDTO.toEntity();
            appointment = appointmentRepository.save(appointment);
            
            return toDTO(appointment);
        } catch (Exception e) {
            System.err.println("Error creating appointment: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
    
    @Override
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existing = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        existing.setPatientId(appointmentDTO.getPatientId());
        existing.setPatientName(appointmentDTO.getPatientName());
        existing.setDoctorId(appointmentDTO.getDoctorId());
        existing.setDoctorName(appointmentDTO.getDoctorName());
        existing.setDepartmentId(appointmentDTO.getDepartmentId());
        existing.setDepartmentName(appointmentDTO.getDepartmentName());
        existing.setAppointmentDate(appointmentDTO.getAppointmentDate());
        existing.setTimeSlot(appointmentDTO.getTimeSlot());
        existing.setSessionType(appointmentDTO.getSessionType());
        existing.setNotes(appointmentDTO.getNotes());
        existing.setUpdatedAt(LocalDateTime.now());
        
        existing = appointmentRepository.save(existing);
        return toDTO(existing);
    }
    
    @Override
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }
    
    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return toDTO(appointment);
    }
    
    @Override
    public Page<Appointment> getAllAppointments(String search, Pageable pageable) {
        try {
            if (search == null || search.isBlank()) {
                return appointmentRepository.findAll(pageable);
            }
            return appointmentRepository.findByPatientNameContainingIgnoreCaseOrDoctorNameContainingIgnoreCase(
                search, search, pageable);
        } catch (Exception e) {
            System.err.println("Service error getting appointments: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    @Override
    public AppointmentDTO cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointment.setUpdatedAt(LocalDateTime.now());
        
        appointment = appointmentRepository.save(appointment);
        return toDTO(appointment);
    }
    
    @Override
    public AppointmentDTO rescheduleAppointment(Long id, LocalDateTime newDate, String newTimeSlot) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setAppointmentDate(newDate);
        appointment.setTimeSlot(newTimeSlot);
        appointment.setStatus(Appointment.AppointmentStatus.RESCHEDULED);
        appointment.setUpdatedAt(LocalDateTime.now());
        
        appointment = appointmentRepository.save(appointment);
        return toDTO(appointment);
    }
    
    @Override
    public List<String> getAvailableTimeSlots(Long doctorId, LocalDateTime date) {
        // Get booked slots for all sessions
        List<String> morningBooked = appointmentRepository.findBookedTimeSlots(doctorId, date, "MORNING");
        List<String> afternoonBooked = appointmentRepository.findBookedTimeSlots(doctorId, date, "AFTERNOON");
        List<String> eveningBooked = appointmentRepository.findBookedTimeSlots(doctorId, date, "EVENING");
        
        List<String> allBookedSlots = new java.util.ArrayList<>();
        allBookedSlots.addAll(morningBooked);
        allBookedSlots.addAll(afternoonBooked);
        allBookedSlots.addAll(eveningBooked);
        
        return allBookedSlots;
    }
    
    @Override
    public List<AppointmentDTO> getDoctorAppointments(Long doctorId, LocalDateTime startDate, LocalDateTime endDate) {
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentDateBetween(
            doctorId, startDate, endDate);
        return appointments.stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    @Override
    public Map<String, Object> getDoctorSchedule(Long doctorId, String date) {
        try {
            // Call MasterMs to get doctor schedules
            String url = masterServiceUrl + "/master/doctor-schedules/doctor/" + doctorId;
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            
            List<Map<String, Object>> schedules = response.getBody();
            if (schedules == null || schedules.isEmpty()) {
                return new HashMap<>(); // Return empty if no schedule found
            }
            
            // Parse the date to get day of week
            LocalDate requestedDate = LocalDate.parse(date);
            String dayOfWeek = requestedDate.getDayOfWeek().name();
            
            Map<String, Object> result = new HashMap<>();
            
            // Filter schedules for the specific date and group by session
            for (Map<String, Object> schedule : schedules) {
                String scheduleDayOfWeek = (String) schedule.get("dayOfWeek");
                String scheduleType = (String) schedule.get("scheduleType");
                String scheduleDateStr = (String) schedule.get("scheduleDate");
                Boolean isAvailable = (Boolean) schedule.get("isAvailable");
                Boolean isHoliday = (Boolean) schedule.get("isHoliday");
                Boolean isLeave = (Boolean) schedule.get("isLeave");
                Boolean active = (Boolean) schedule.get("active");
                
                boolean dateMatches = false;
                
                // Check if the schedule applies to the requested date
                if ("DAILY".equals(scheduleType)) {
                    // For daily schedules, check exact date match
                    dateMatches = date.equals(scheduleDateStr);
                } else if ("WEEKLY".equals(scheduleType)) {
                    // For weekly schedules, check day of week match
                    dateMatches = dayOfWeek.equals(scheduleDayOfWeek);
                } else if ("MONTHLY".equals(scheduleType)) {
                    // For monthly schedules, check day of month match
                    LocalDate scheduleDate = LocalDate.parse(scheduleDateStr);
                    dateMatches = requestedDate.getDayOfMonth() == scheduleDate.getDayOfMonth();
                }
                
                // Only include if it matches the date criteria and is available
                if (dateMatches && 
                    Boolean.TRUE.equals(isAvailable) && 
                    Boolean.FALSE.equals(isHoliday) && 
                    Boolean.FALSE.equals(isLeave) && 
                    Boolean.TRUE.equals(active)) {
                    
                    String sessionType = (String) schedule.get("sessionType");
                    Object startTimeObj = schedule.get("startTime");
                    Object endTimeObj = schedule.get("endTime");
                    Integer slotDuration = (Integer) schedule.get("slotDuration");
                    
                    // Convert LocalTime to string format
                    String startTime = startTimeObj != null ? startTimeObj.toString() : "09:00";
                    String endTime = endTimeObj != null ? endTimeObj.toString() : "10:00";
                    
                    Map<String, Object> sessionData = new HashMap<>();
                    sessionData.put("startTime", startTime);
                    sessionData.put("endTime", endTime);
                    sessionData.put("slotDuration", slotDuration != null ? slotDuration : 15);
                    
                    result.put(sessionType.toLowerCase(), sessionData);
                }
            }
            
            return result;
        } catch (Exception e) {
            System.err.println("Error fetching doctor schedule: " + e.getMessage());
            e.printStackTrace();
            return new HashMap<>(); // Return empty schedule on error
        }
    }
    
    private AppointmentDTO toDTO(Appointment appointment) {
        return new AppointmentDTO(
            appointment.getAppointmentId(),
            appointment.getPatientId(),
            appointment.getPatientName(),
            appointment.getDoctorId(),
            appointment.getDoctorName(),
            appointment.getDepartmentId(),
            appointment.getDepartmentName(),
            appointment.getAppointmentDate(),
            appointment.getTimeSlot(),
            appointment.getSessionType(),
            appointment.getStatus(),
            appointment.getNotes(),
            appointment.getBookedBy(),
            appointment.getCreatedAt(),
            appointment.getUpdatedAt()
        );
    }
}