import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getWard = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/ward/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.wards,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addWard = async (ward: any) => {
  return axiosInstance.post('/master/ward/add', ward)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateWard = async (id: any, ward: any) => {
  return axiosInstance.put('/master/ward/update/' + id, ward)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getWardById = async (id: number) => {
  return axiosInstance.get('/master/ward/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteWard = async (id: number) => {
  return axiosInstance.delete('/master/ward/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAllWards = async () => {
  try {
    const response = await axiosInstance.get('/master/ward/getall', {
      params: { page: 0, limit: 1000, search: '' }
    });
    return response.data.wards || [];
  } catch (error: any) {
    console.error('Failed to load wards:', error);
    return [];
  }
};

export const WardServices = {
  getAllWards,
  getWard,
  addWard,
  updateWard,
  getWardById,
  deleteWard
};