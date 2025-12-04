package com.hms.notification.service;

import com.hms.notification.dto.NotificationDTO;
import com.hms.notification.entity.Notification;
import com.hms.notification.exception.HMSException;
import java.util.List;

public interface NotificationService {
    Long sendNotification(NotificationDTO notificationDTO) throws HMSException;
    NotificationDTO getNotificationById(Long id) throws HMSException;
    List<NotificationDTO> getAllNotifications();
    List<NotificationDTO> getNotificationsByUserId(Long userId);
    void markAsRead(Long id) throws HMSException;
    void deleteNotification(Long id) throws HMSException;
    void sendRealTimeNotification(Long userId, String title, String message, String type, String module);
}