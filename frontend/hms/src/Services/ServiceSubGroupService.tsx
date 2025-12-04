import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ServiceSubGroupService = {
  getAllServiceSubGroups: async () => {
    const response = await axiosInstance.get('/master/service-sub-groups');
    return response.data;
  },

  getServiceSubGroupById: async (id: number) => {
    const response = await axiosInstance.get(`/master/service-sub-groups/${id}`);
    return response.data;
  },

  createServiceSubGroup: async (serviceSubGroup: any) => {
    const response = await axiosInstance.post('/master/service-sub-groups', serviceSubGroup);
    return response.data;
  },

  updateServiceSubGroup: async (id: number, serviceSubGroup: any) => {
    const response = await axiosInstance.put(`/master/service-sub-groups/${id}`, serviceSubGroup);
    return response.data;
  },

  deleteServiceSubGroup: async (id: number) => {
    const response = await axiosInstance.delete(`/master/service-sub-groups/${id}`);
    return response.data;
  },

  searchServiceSubGroups: async (subGroupName: string) => {
    const response = await axiosInstance.get(`/master/service-sub-groups/search?subGroupName=${subGroupName}`);
    return response.data;
  },

  getByGroupId: async (groupId: number) => {
    const response = await axiosInstance.get(`/master/service-sub-groups/group/${groupId}`);
    return response.data;
  }
};