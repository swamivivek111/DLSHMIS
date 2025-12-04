import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ServiceClassService = {
  getAllServiceClasses: async () => {
    const response = await axiosInstance.get('/master/service-classes');
    return response.data;
  },

  getServiceClassById: async (id: number) => {
    const response = await axiosInstance.get(`/master/service-classes/${id}`);
    return response.data;
  },

  createServiceClass: async (serviceClass: any) => {
    const response = await axiosInstance.post('/master/service-classes', serviceClass);
    return response.data;
  },

  updateServiceClass: async (id: number, serviceClass: any) => {
    const response = await axiosInstance.put(`/master/service-classes/${id}`, serviceClass);
    return response.data;
  },

  deleteServiceClass: async (id: number) => {
    const response = await axiosInstance.delete(`/master/service-classes/${id}`);
    return response.data;
  },

  searchServiceClasses: async (serviceClassName: string) => {
    const response = await axiosInstance.get(`/master/service-classes/search?serviceClassName=${serviceClassName}`);
    return response.data;
  }
};