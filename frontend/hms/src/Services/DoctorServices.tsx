import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDoctor = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/profile/doctor/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.doctors || response.data,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get('/profile/doctor/getall', {
      params: { page: 0, limit: 1000, search: '' }
    });
    return response.data.doctors || response.data || [];
  } catch (error: any) {
    console.error('Failed to load doctors:', error);
    return [];
  }
};

export const addDoctor=async(doctor:any)=>{
  return axiosInstance.post('/profile/doctor/add', doctor)
  .then((response:any) => response.data)
  .catch((error:any) => {throw error;});
};

export const updateDoctor=async(id:any, doctor:any)=>{
  return axiosInstance.put('/profile/doctor/update/'+id, doctor)
  .then((response:any) => response.data)
  .catch((error:any) => {throw error;});
};

export const getDoctorById=async(id: number)=>{ 
  return axiosInstance.get('/profile/doctor/get/'+id)
  .then((response:any) => response.data)
  .catch((error:any) => {throw error;});
};

export const deleteDoctor=async(id: number)=>{
  return axiosInstance.delete('/profile/doctor/delete/'+id)
  .then((response:any) => response.data)
  .catch((error:any) => {throw error;});
};

export const syncDoctorToUser = async (doctorData: any) => {
  return axiosInstance.post('/profile/doctor/sync', doctorData)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

// Get doctors for dropdown (simplified)
export const getDoctorsForDropdown = async () => {
  try {
    const response = await axiosInstance.get('/profile/doctor/getall', {
      params: { page: 0, limit: 100, search: '' }
    });
    return response.data.doctors || response.data || [];
  } catch (error: any) {
    console.error('Failed to load doctors:', error);
    return [];
  }
};

export const DoctorServices = {
  getAllDoctors,
  getDoctor,
  addDoctor,
  updateDoctor,
  getDoctorById,
  deleteDoctor,
  syncDoctorToUser,
  getDoctorsForDropdown
};
