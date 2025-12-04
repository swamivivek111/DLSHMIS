import axiosInstance from "../Interceptor/AxiosInterceptor";

export const SourceService = {
  getAllSources: async () => {
    const response = await axiosInstance.get('/master/sources');
    return { sources: response.data };
  },

  getSourceById: async (id: number) => {
    const response = await axiosInstance.get(`/master/sources/${id}`);
    return { source: response.data };
  },

  createSource: async (source: any) => {
    const response = await axiosInstance.post('/master/sources', source);
    return response.data;
  },

  updateSource: async (id: number, source: any) => {
    const response = await axiosInstance.put(`/master/sources/${id}`, source);
    return response.data;
  },

  deleteSource: async (id: number) => {
    const response = await axiosInstance.delete(`/master/sources/${id}`);
    return response.data;
  }
};