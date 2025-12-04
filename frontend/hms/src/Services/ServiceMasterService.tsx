import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ServiceMasterService = {
  getAllServices: async () => {
    try {
      const response = await axiosInstance.get('/master/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getServiceById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/master/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  createService: async (service: any) => {
    try {
      const response = await axiosInstance.post('/master/services', service);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  updateService: async (id: number, service: any) => {
    try {
      const response = await axiosInstance.put(`/master/services/${id}`, service);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  deleteService: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/master/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  searchServices: async (serviceName: string) => {
    try {
      const response = await axiosInstance.get(`/master/services/search?serviceName=${serviceName}`);
      return response.data;
    } catch (error) {
      console.error('Error searching services:', error);
      throw error;
    }
  }
};