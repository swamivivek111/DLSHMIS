import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDoctorsSchedule = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/doctorsSchedule/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.doctorSchedules,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};

export const addDoctorsSchedule=async(doctorsSchedule:any)=>{
  return axiosInstance.post('/master/doctorsSchedule/add', doctorsSchedule)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateDoctorsSchedule=async(id:any, doctorsSchedule:any)=>{
  return axiosInstance.put('/master/doctorsSchedule/update/'+id, doctorsSchedule)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getDoctorsScheduleById=async(id: number)=>{ 
  return axiosInstance.get('/master/doctorsSchedule/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getAllDoctorsSchedules=async()=>{ 
  return axiosInstance.get('/master/doctorsSchedule/getAll/')
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteDoctorsSchedule=async(id: string)=>{
  return axiosInstance.delete('/master/doctorsSchedule/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
