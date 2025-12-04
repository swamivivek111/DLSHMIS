import axiosInstance from "../Interceptor/AxiosInterceptor";
import store from "../Store";

export interface AuditLogRequest {
  operation: string;
  moduleName: string;
  microservice: string;
  description: string;
  operationType: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ' | 'LOGIN' | 'LOGOUT';
  entityType?: string;
  entityId?: number;
  logLevel?: 'INFO' | 'WARN' | 'ERROR';
  status?: string;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  operation: string;
  moduleName: string;
  microservice: string;
  userId?: number;
  userEmail?: string;
  userRole?: string;
  operationType: string;
  logLevel: string;
  entityType?: string;
  entityId?: number;
  status: string;
  description: string;
  ipAddress?: string;
}

export const AuditService = {
  logAction: async (auditData: AuditLogRequest) => {
    try {
      console.log('AuditService: Sending audit log:', auditData);
      
      // Get current user from Redux store
      const user = store.getState().user;
      
      const payload = {
        ...auditData,
        userId: user?.id || null,
        userEmail: user?.email || null,
        userRole: user?.role || null,
        logLevel: auditData.logLevel || 'INFO',
        status: auditData.status || 'SUCCESS',
        timestamp: new Date().toISOString()
      };
      console.log('AuditService: Payload with user info:', payload);
      
      const response = await axiosInstance.post('/audit/log', payload);
      console.log('AuditService: Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('AuditService: Failed to log audit:', error);
      throw error;
    }
  },

  getLogs: async (params: any = {}) => {
    try {
      const response = await axiosInstance.get('/audit/logs', { params });
      return response.data;
    } catch (error) {
      console.error('AuditService: Failed to fetch logs:', error);
      throw error;
    }
  },

  getLogById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/audit/logs/${id}`);
      return response.data;
    } catch (error) {
      console.error('AuditService: Failed to fetch log:', error);
      throw error;
    }
  }
};