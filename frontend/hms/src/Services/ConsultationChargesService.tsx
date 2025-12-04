import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ConsultationChargesService = {
  getAllConsultationCharges: async () => {
    const response = await axiosInstance.get('/master/consultation-charges');
    return { consultationCharges: response.data };
  },

  getConsultationChargesById: async (id: number) => {
    const response = await axiosInstance.get(`/master/consultation-charges/${id}`);
    return { consultationCharges: response.data };
  },

  createConsultationCharges: async (consultationCharges: any) => {
    const response = await axiosInstance.post('/master/consultation-charges', consultationCharges);
    return response.data;
  },

  updateConsultationCharges: async (id: number, consultationCharges: any) => {
    const response = await axiosInstance.put(`/master/consultation-charges/${id}`, consultationCharges);
    return response.data;
  },

  deleteConsultationCharges: async (id: number) => {
    const response = await axiosInstance.delete(`/master/consultation-charges/${id}`);
    return response.data;
  }
};