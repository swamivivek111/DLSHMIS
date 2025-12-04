import axios, { InternalAxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000',
    timeout: 15000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'}/user/refresh`, {
        refreshToken
    });
    
    return response.data;
};

axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Skip token processing for login/logout requests
        if (config.url?.includes('/user/login') || config.url?.includes('/user/logout') || config.url?.includes('/user/register')) {
            config.headers['X-Secret-Key'] = 'SECRET';
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
        
        let token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        
        // Check if token exists and is valid
        if (token) {
            try {
                // Decode token to check expiry
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Date.now() / 1000;
                
                // If token is expired, try to refresh
                if (payload.exp < currentTime) {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'}/user/refresh`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Secret-Key': 'SECRET'
                                },
                                body: JSON.stringify({ refreshToken })
                            });
                            
                            if (!response.ok) {
                                throw new Error('Refresh failed');
                            }
                            
                            const data = await response.json();
                            
                            const newToken = data.accessToken;
                            localStorage.setItem('accessToken', newToken);
                            localStorage.setItem('token', newToken);
                            token = newToken;
                        } catch (refreshError) {
                            // Refresh failed, redirect to login
                            localStorage.clear();
                            window.location.href = '/login';
                            return Promise.reject(refreshError);
                        }
                    } else {
                        // No refresh token, redirect to login
                        localStorage.clear();
                        window.location.href = '/login';
                        return Promise.reject(new Error('No refresh token'));
                    }
                }
            } catch (error) {
                // Invalid token format, clear and redirect
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['X-Secret-Key'] = 'SECRET';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            
            try {
                const tokenData = await refreshToken();
                const newAccessToken = tokenData.accessToken;
                
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('token', newAccessToken);
                
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                
                // Save current location before logout
                const currentPath = window.location.pathname + window.location.search;
                localStorage.setItem('lastVisitedPath', currentPath);
                
                // Clear all tokens
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                
                notifications.show({
                    title: 'Session Expired',
                    message: 'Please login again to continue',
                    color: 'orange',
                });
                
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
                
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        
        if (error.response?.status === 500 && 
            (error.response?.data?.message?.includes('Token is invalid') || 
             error.response?.data?.message?.includes('Authorization header is missing'))) {
            const currentPath = window.location.pathname + window.location.search;
            localStorage.setItem('lastVisitedPath', currentPath);
            
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            
            notifications.show({
                title: 'Session Expired',
                message: 'Please login again to continue',
                color: 'orange',
            });
            
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;