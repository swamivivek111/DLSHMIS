import axiosInstance from "../Interceptor/AxiosInterceptor";

export const sendNotification = async (notification: any) => {
  return axiosInstance.post('/notification/send', notification)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getUserNotifications = async (userId: number) => {
  return axiosInstance.get(`/notification/user/${userId}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getUnreadNotifications = async (userId: number) => {
  return axiosInstance.get(`/notification/user/${userId}/unread`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getNotificationCount = async (userId: number) => {
  return axiosInstance.get(`/notification/user/${userId}/count`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const markAsRead = async (notificationId: number) => {
  return axiosInstance.put(`/notification/read/${notificationId}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};