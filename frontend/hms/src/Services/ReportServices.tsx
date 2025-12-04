import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDailyReport = async () => {
  return axiosInstance.get('/billing/reports/daily')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getMonthlyReport = async () => {
  return axiosInstance.get('/billing/reports/monthly')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAnalytics = async () => {
  return axiosInstance.get('/billing/reports/analytics')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getReportHistory = async () => {
  return axiosInstance.get('/billing/reports/history')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getMobileConfig = async () => {
  return axiosInstance.get('/mobile/config')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getMobileEndpoints = async () => {
  return axiosInstance.get('/mobile/endpoints')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};