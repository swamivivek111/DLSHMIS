import axiosInstance from "../Interceptor/AxiosInterceptor";

export const TariffService = {
  getAllTariffs: async () => {
    const response = await axiosInstance.get('/master/tariffs');
    return { tariffs: response.data };
  },

  getTariffById: async (id: number) => {
    const response = await axiosInstance.get(`/master/tariffs/${id}`);
    return { tariff: response.data };
  },

  createTariff: async (tariff: any) => {
    const response = await axiosInstance.post('/master/tariffs', tariff);
    return response.data;
  },

  updateTariff: async (id: number, tariff: any) => {
    const response = await axiosInstance.put(`/master/tariffs/${id}`, tariff);
    return response.data;
  },

  deleteTariff: async (id: number) => {
    const response = await axiosInstance.delete(`/master/tariffs/${id}`);
    return response.data;
  },

  getNextTariffCode: async () => {
    const response = await axiosInstance.get('/master/tariffs/next-code');
    return response.data;
  }
};