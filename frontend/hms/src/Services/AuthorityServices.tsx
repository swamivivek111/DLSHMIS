import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getAuthority = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/authorities/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.authorities,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addAuthority = async (authority: any) => {
  return axiosInstance.post('/master/authorities/add', authority)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateAuthority = async (id: any, authority: any) => {
  return axiosInstance.put('/master/authorities/update/' + id, authority)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAuthorityById = async (id: number) => {
  return axiosInstance.get('/master/authorities/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteAuthority = async (id: number) => {
  return axiosInstance.delete('/master/authorities/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};