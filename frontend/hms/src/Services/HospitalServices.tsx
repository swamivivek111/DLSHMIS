import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getHospital = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/hospital/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.hospital || [],
      totalPages: response.data.totalPages || 1,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addHospital = async (hospital: any) => {
  return axiosInstance.post('/master/hospital/add', hospital)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateHospital = async (id: any, hospital: any) => {
  return axiosInstance.put('/master/hospital/update/' + id, hospital)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getHospitalById = async (id: number) => {
  return axiosInstance.get('/master/hospital/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteHospital = async (id: number) => {
  return axiosInstance.delete('/master/hospital/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};