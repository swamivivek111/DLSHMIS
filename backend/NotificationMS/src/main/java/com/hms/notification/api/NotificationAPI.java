package com.hms.notification.api;

import com.hms.notification.entity.Notification;
import com.hms.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/notification")
public class NotificationAPI {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendNotification(@RequestBody Notification notification) {
        Notification saved = notificationRepository.save(notification);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Notification sent successfully!");
        response.put("notificationId", saved.getNotificationId());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }
    
    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationRepository.findByUserIdAndIsReadOrderByCreatedAtDesc(userId, false));
    }
    
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Map<String, Object>> getNotificationCount(@PathVariable Long userId) {
        Long unreadCount = notificationRepository.countByUserIdAndIsRead(userId, false);
        Map<String, Object> response = new HashMap<>();
        response.put("unreadCount", unreadCount);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long notificationId) {
        return notificationRepository.findById(notificationId)
                .map(notification -> {
                    notification.setIsRead(true);
                    notification.setReadAt(LocalDateTime.now());
                    notificationRepository.save(notification);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Notification marked as read!");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}