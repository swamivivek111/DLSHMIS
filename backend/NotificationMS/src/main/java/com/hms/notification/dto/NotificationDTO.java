package com.hms.notification.dto;

import com.hms.notification.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
    private Long notificationId;
    private Long userId;
    private String title;
    private String message;
    private Notification.NotificationType type;
    private Notification.Priority priority;
    private String module;
    private Long referenceId;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
    
    public Notification toEntity() {
        return new Notification(notificationId, userId, title, message, type, priority, module, referenceId, isRead, createdAt, readAt);
    }
}