import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ServiceTypeService = {
  getAllServiceTypes: async () => {
    const response = await axiosInstance.get('/master/service-types');
    return response.data;
  },

  getServiceTypeById: async (id: number) => {
    const response = await axiosInstance.get(`/master/service-types/${id}`);
    return response.data;
  },

  createServiceType: async (serviceType: any) => {
    const response = await axiosInstance.post('/master/service-types', serviceType);
    return response.data;
  },

  updateServiceType: async (id: number, serviceType: any) => {
    const response = await axiosInstance.put(`/master/service-types/${id}`, serviceType);
    return response.data;
  },

  deleteServiceType: async (id: number) => {
    const response = await axiosInstance.delete(`/master/service-types/${id}`);
    return response.data;
  },

  getByServiceClass: async (serviceClassName: number) => {
    const response = await axiosInstance.get(`/master/service-types/class/${serviceClassName}`);
    return response.data;
  }
};