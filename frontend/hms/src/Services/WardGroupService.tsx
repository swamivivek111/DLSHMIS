import axiosInstance from "../Interceptor/AxiosInterceptor";

export const WardGroupService = {
  getAllWardGroups: async () => {
    const response = await axiosInstance.get('/master/ward-groups');
    return response.data;
  },

  getWardGroupById: async (id: number) => {
    const response = await axiosInstance.get(`/master/ward-groups/${id}`);
    return response.data;
  },

  createWardGroup: async (wardGroup: any) => {
    const response = await axiosInstance.post('/master/ward-groups', wardGroup);
    return response.data;
  },

  updateWardGroup: async (id: number, wardGroup: any) => {
    const response = await axiosInstance.put(`/master/ward-groups/${id}`, wardGroup);
    return response.data;
  },

  deleteWardGroup: async (id: number) => {
    const response = await axiosInstance.delete(`/master/ward-groups/${id}`);
    return response.data;
  },

  searchWardGroups: async (wardGroupName: string) => {
    const response = await axiosInstance.get(`/master/ward-groups/search?wardGroupName=${wardGroupName}`);
    return response.data;
  }
};