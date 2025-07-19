import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDesignation = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/designation/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.designations,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addDesignation=async(designation:any)=>{
  return axiosInstance.post('/master/designation/add', designation)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateDesignation=async(id:any, designation:any)=>{
  return axiosInstance.put('/master/designation/update/'+id, designation)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getDesignationById=async(id: number)=>{ 
  return axiosInstance.get('/master/designation/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteDesignation=async(id: number)=>{
  return axiosInstance.delete('/master/designation/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
