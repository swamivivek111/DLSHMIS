package com.hms.notification.service;

import com.hms.notification.dto.NotificationDTO;
import com.hms.notification.entity.Notification;
import com.hms.notification.exception.HMSException;
import com.hms.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Override
    public Long sendNotification(NotificationDTO notificationDTO) throws HMSException {
        try {
            Notification notification = notificationDTO.toEntity();
            return notificationRepository.save(notification).getNotificationId();
        } catch (Exception e) {
            throw new HMSException("NOTIFICATION_SEND_FAILED");
        }
    }
    
    @Override
    public NotificationDTO getNotificationById(Long id) throws HMSException {
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(() -> new HMSException("NOTIFICATION_NOT_FOUND"));
        return convertToDTO(notification);
    }
    
    @Override
    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<NotificationDTO> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public void markAsRead(Long id) throws HMSException {
        Notification notification = notificationRepository.findById(id)
            .orElseThrow(() -> new HMSException("NOTIFICATION_NOT_FOUND"));
        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }
    
    @Override
    public void deleteNotification(Long id) throws HMSException {
        if (!notificationRepository.existsById(id)) {
            throw new HMSException("NOTIFICATION_NOT_FOUND");
        }
        notificationRepository.deleteById(id);
    }
    
    @Override
    public void sendRealTimeNotification(Long userId, String title, String message, String type, String module) {
        // Implementation moved here from the old service class
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(Notification.NotificationType.valueOf(type.toUpperCase()));
        notification.setModule(module);
        
        Notification saved = notificationRepository.save(notification);
        
        // Send real-time notification via WebSocket would require SimpMessagingTemplate
        // For now, just save to database
    }
    
    private NotificationDTO convertToDTO(Notification notification) {
        return new NotificationDTO(
            notification.getNotificationId(),
            notification.getUserId(),
            notification.getTitle(),
            notification.getMessage(),
            notification.getType(),
            notification.getPriority(),
            notification.getModule(),
            notification.getReferenceId(),
            notification.getIsRead(),
            notification.getCreatedAt(),
            notification.getReadAt()
        );
    }
}