import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getPatientCategory = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/patient-categories/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.patientCategories,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addPatientCategory = async (category: any) => {
  return axiosInstance.post('/master/patient-categories/add', category)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updatePatientCategory = async (id: any, category: any) => {
  return axiosInstance.put('/master/patient-categories/update/' + id, category)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getPatientCategoryById = async (id: number) => {
  return axiosInstance.get('/master/patient-categories/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deletePatientCategory = async (id: number) => {
  return axiosInstance.delete('/master/patient-categories/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};