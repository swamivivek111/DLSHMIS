import axiosInstance from "../Interceptor/AxiosInterceptor";

export const BillingHeadService = {
  getAllBillingHeads: async () => {
    const response = await axiosInstance.get('/master/billing-heads');
    return response.data;
  },

  getBillingHeadById: async (id: number) => {
    const response = await axiosInstance.get(`/master/billing-heads/${id}`);
    return response.data;
  },

  createBillingHead: async (billingHead: any) => {
    const response = await axiosInstance.post('/master/billing-heads', billingHead);
    return response.data;
  },

  updateBillingHead: async (id: number, billingHead: any) => {
    const response = await axiosInstance.put(`/master/billing-heads/${id}`, billingHead);
    return response.data;
  },

  deleteBillingHead: async (id: number) => {
    const response = await axiosInstance.delete(`/master/billing-heads/${id}`);
    return response.data;
  },

  searchBillingHeads: async (billingHeadName: string) => {
    const response = await axiosInstance.get(`/master/billing-heads/search?billingHeadName=${billingHeadName}`);
    return response.data;
  }
};