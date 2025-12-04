import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/opd/patient-registration`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const OPDPatientRegistrationService = {
  getAllRegistrations: (page = 0, size = 10, search = '') => api.get('/list'),
  getRegistrationById: (id: number) => api.get(`/${id}`),
  getRegistrationByUhid: (uhid: string) => api.get(`/uhid/${uhid}`),
  createRegistration: (data: any) => api.post('/create', data),
  updateRegistration: (id: number, data: any) => api.put(`/update/${id}`, data),
  deleteRegistration: (id: number) => api.delete(`/delete/${id}`),
};