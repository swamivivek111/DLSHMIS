import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getBloodGroup = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/bloodGroup/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.bloodGroups,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addBloodGroup=async(bloodGroup:any)=>{
  return axiosInstance.post('/master/bloodGroup/add', bloodGroup)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateBloodGroup=async(id:any, bloodGroup:any)=>{
  return axiosInstance.put('/master/bloodGroup/update/'+id, bloodGroup)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getBloodGroupById=async(id: number)=>{ 
  return axiosInstance.get('/master/bloodGroup/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteBloodGroup=async(id: number)=>{
  return axiosInstance.delete('/master/bloodGroup/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
