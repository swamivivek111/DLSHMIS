import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ServiceGroupService = {
  getAllServiceGroups: async () => {
    const response = await axiosInstance.get('/master/service-groups');
    return response.data;
  },

  getServiceGroupById: async (id: number) => {
    const response = await axiosInstance.get(`/master/service-groups/${id}`);
    return response.data;
  },

  createServiceGroup: async (serviceGroup: any) => {
    const response = await axiosInstance.post('/master/service-groups', serviceGroup);
    return response.data;
  },

  updateServiceGroup: async (id: number, serviceGroup: any) => {
    const response = await axiosInstance.put(`/master/service-groups/${id}`, serviceGroup);
    return response.data;
  },

  deleteServiceGroup: async (id: number) => {
    const response = await axiosInstance.delete(`/master/service-groups/${id}`);
    return response.data;
  },

  searchServiceGroups: async (groupName: string) => {
    const response = await axiosInstance.get(`/master/service-groups/search?groupName=${groupName}`);
    return response.data;
  },

  getByDepartmentId: async (departmentId: number) => {
    const response = await axiosInstance.get(`/master/service-groups/department/${departmentId}`);
    return response.data;
  }
};