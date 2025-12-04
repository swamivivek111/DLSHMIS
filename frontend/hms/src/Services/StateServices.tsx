import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getState = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1; // Backend expects 0-based pagination
    const response = await axiosInstance.get('/master/state/getall', {
      params: { page, limit, search }
    });
    console.log('State API response:', response.data);
    return {
      data: response.data.states || [],
      totalPages: response.data.totalPages || 1,
    };
  } catch (error: any) {
    console.error('State API error:', error);
    throw error;
  }
};


export const addState=async(state:any)=>{
  return axiosInstance.post('/master/state/add', state)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateState=async(id:any, state:any)=>{
  return axiosInstance.put('/master/state/update/'+id, state)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getStateById=async(id: number)=>{ 
  return axiosInstance.get('/master/state/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteState=async(id: number)=>{
  return axiosInstance.delete('/master/state/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
