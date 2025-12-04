import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ReferralNameService = {
  getAllReferralNames: async () => {
    const response = await axiosInstance.get('/master/referral-names');
    return { referralNames: response.data };
  },

  getReferralNameById: async (id: number) => {
    const response = await axiosInstance.get(`/master/referral-names/${id}`);
    return { referralName: response.data };
  },

  createReferralName: async (referralName: any) => {
    const response = await axiosInstance.post('/master/referral-names', referralName);
    return response.data;
  },

  updateReferralName: async (id: number, referralName: any) => {
    const response = await axiosInstance.put(`/master/referral-names/${id}`, referralName);
    return response.data;
  },

  deleteReferralName: async (id: number) => {
    const response = await axiosInstance.delete(`/master/referral-names/${id}`);
    return response.data;
  }
};