import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getRoom = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/room/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.rooms,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addRoom = async (room: any) => {
  return axiosInstance.post('/master/room/add', room)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateRoom = async (id: any, room: any) => {
  return axiosInstance.put('/master/room/update/' + id, room)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getRoomById = async (id: number) => {
  return axiosInstance.get('/master/room/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteRoom = async (id: number) => {
  return axiosInstance.delete('/master/room/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAllRooms = async () => {
  try {
    const response = await axiosInstance.get('/master/room/getall', {
      params: { page: 0, limit: 1000, search: '' }
    });
    return response.data.rooms || [];
  } catch (error: any) {
    console.error('Failed to load rooms:', error);
    return [];
  }
};

export const RoomServices = {
  getAllRooms,
  getRoom,
  addRoom,
  updateRoom,
  getRoomById,
  deleteRoom
};