import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDoctor = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/doctor/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.doctors,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addDoctor=async(doctor:any)=>{
  return axiosInstance.post('/master/doctor/add', doctor)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateDoctor=async(id:any, doctor:any)=>{
  return axiosInstance.put('/master/doctor/update/'+id, doctor)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getDoctorById=async(id: number)=>{ 
  return axiosInstance.get('/master/doctor/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteDoctor=async(id: number)=>{
  return axiosInstance.delete('/master/doctor/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
