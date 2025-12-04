import axiosInstance from "../Interceptor/AxiosInterceptor";

export const createRadiologyOrder = async (order: any) => {
  return axiosInstance.post('/radiology/orders/add', order)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAllRadiologyOrders = async () => {
  return axiosInstance.get('/radiology/orders/getall')
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getRadiologyOrderById = async (id: number) => {
  return axiosInstance.get(`/radiology/orders/get/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const completeRadiologyOrder = async (id: number) => {
  return axiosInstance.put(`/radiology/orders/complete/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};