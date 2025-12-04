import axiosInstance from "../Interceptor/AxiosInterceptor";

export const ReferralTypeService = {
  getAllReferralTypes: async () => {
    const response = await axiosInstance.get('/master/referral-types');
    return { referralTypes: response.data };
  },

  getReferralTypeById: async (id: number) => {
    const response = await axiosInstance.get(`/master/referral-types/${id}`);
    return { referralType: response.data };
  },

  createReferralType: async (referralType: any) => {
    const response = await axiosInstance.post('/master/referral-types', referralType);
    return response.data;
  },

  updateReferralType: async (id: number, referralType: any) => {
    const response = await axiosInstance.put(`/master/referral-types/${id}`, referralType);
    return response.data;
  },

  deleteReferralType: async (id: number) => {
    const response = await axiosInstance.delete(`/master/referral-types/${id}`);
    return response.data;
  }
};