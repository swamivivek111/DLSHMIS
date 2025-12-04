import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getBed = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/bed/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.beds,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addBed = async (bed: any) => {
  return axiosInstance.post('/master/bed/add', bed)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateBed = async (id: any, bed: any) => {
  return axiosInstance.put('/master/bed/update/' + id, bed)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getBedById = async (id: number) => {
  return axiosInstance.get('/master/bed/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteBed = async (id: number) => {
  return axiosInstance.delete('/master/bed/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getRoomsByWard = async (wardId: number) => {
  try {
    const response = await axiosInstance.get(`/master/room/getall?wardId=${wardId}`);
    return response.data.rooms || [];
  } catch (error: any) {
    console.error('Failed to load rooms:', error);
    return [];
  }
};

export const BedServices = {
  getBed,
  addBed,
  updateBed,
  getBedById,
  deleteBed,
  getRoomsByWard
};