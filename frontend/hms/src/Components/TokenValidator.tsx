import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

const TokenValidator = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      if (!token) {
        return;
      }

      try {
        // Decode JWT token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          
          notifications.show({
            title: 'Session Expired',
            message: 'Your session has expired. Please login again.',
            color: 'orange',
          });
          
          navigate('/login', { replace: true });
        }
      } catch (error) {
        // Invalid token format
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        notifications.show({
          title: 'Invalid Session',
          message: 'Please login again.',
          color: 'red',
        });
        
        navigate('/login', { replace: true });
      }
    };

    // Validate on component mount (page refresh)
    validateToken();
    
    // Validate every 30 seconds
    const interval = setInterval(validateToken, 30000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  return <>{children}</>;
};

export default TokenValidator;