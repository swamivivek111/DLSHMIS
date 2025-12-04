import axiosInstance from "../Interceptor/AxiosInterceptor";

export const TariffServiceMappingService = {
  getAllTariffServiceMappings: async () => {
    const response = await axiosInstance.get('/master/tariff-service-mappings');
    return response.data;
  },

  getTariffServiceMappingById: async (id: number) => {
    const response = await axiosInstance.get(`/master/tariff-service-mappings/${id}`);
    return response.data;
  },

  createTariffServiceMapping: async (mapping: any) => {
    const response = await axiosInstance.post('/master/tariff-service-mappings', mapping);
    return response.data;
  },

  updateTariffServiceMapping: async (id: number, mapping: any) => {
    const response = await axiosInstance.put(`/master/tariff-service-mappings/${id}`, mapping);
    return response.data;
  },

  deleteTariffServiceMapping: async (id: number) => {
    const response = await axiosInstance.delete(`/master/tariff-service-mappings/${id}`);
    return response.data;
  },

  searchTariffServiceMappings: async (serviceName: string) => {
    const response = await axiosInstance.get(`/master/tariff-service-mappings/search?serviceName=${serviceName}`);
    return response.data;
  }
};