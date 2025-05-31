package com.hms.appointment.dto;

public enum AppointmentStatus {
    SCHEDULED,     // Appointment is booked and upcoming
    COMPLETED,     // Appointment has taken place
    CANCELLED,     // Appointment was cancelled
    RESCHEDULED,   // Appointment was rescheduled to a new time
    NO_SHOW        // Patient did not show up for the appointment
}