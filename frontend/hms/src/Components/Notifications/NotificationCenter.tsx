import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserNotifications, markAsRead, getNotificationCount } from '../../Services/NotificationServices';

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const userId = 1; // Get from auth context
      const [notifs, count] = await Promise.all([
        getUserNotifications(userId),
        getNotificationCount(userId)
      ]);
      setNotifications(notifs);
      setUnreadCount(count.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} Unread
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading notifications...</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification: any) => (
              <div
                key={notification.notificationId}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => !notification.isRead && handleMarkAsRead(notification.notificationId)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    notification.type === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                    notification.type === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                    notification.type === 'ERROR' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCenter;