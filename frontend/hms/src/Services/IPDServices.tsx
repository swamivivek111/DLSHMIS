import axiosInstance from "../Interceptor/AxiosInterceptor";

export const createAdmission = async (admission: any) => {
  return axiosInstance.post('/ipd/admission/add', admission)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAllAdmissions = async () => {
  return axiosInstance.get('/ipd/admission/getall')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAdmissionById = async (id: number) => {
  return axiosInstance.get(`/ipd/admission/get/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const dischargePatient = async (id: number) => {
  return axiosInstance.put(`/ipd/admission/discharge/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};