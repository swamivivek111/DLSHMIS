import axiosInstance from "../Interceptor/AxiosInterceptor";

export const createAuditLog = async (auditLog: any) => {
  return axiosInstance.post('/audit/log', auditLog)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const searchAuditLogs = async (filters: any = {}, page: number = 0, size: number = 50) => {
  const params: any = { page, size, ...filters };
  
  return axiosInstance.get('/audit/search', { params })
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const exportAuditLogsCSV = async (filters: any = {}) => {
  const params: any = { ...filters };
  
  return axiosInstance.get('/audit/export/csv', { 
    params,
    responseType: 'blob'
  })
    .then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error: any) => { throw error; });
};

export const getAuditStats = async () => {
  return axiosInstance.get('/audit/stats')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAuditReport = async () => {
  return axiosInstance.get('/audit/report')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};