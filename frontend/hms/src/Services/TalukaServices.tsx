import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getTaluka = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/taluka/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.talukas,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addTaluka=async(taluka:any)=>{
  return axiosInstance.post('/master/taluka/add', taluka)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateTaluka=async(id:any, taluka:any)=>{
  return axiosInstance.put('/master/taluka/update/'+id, taluka)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getTalukaById=async(id: number)=>{ 
  return axiosInstance.get('/master/taluka/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteTaluka=async(id: number)=>{
  return axiosInstance.delete('/master/taluka/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
