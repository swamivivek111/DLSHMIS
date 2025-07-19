import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getCity = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/city/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.citys,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addCity=async(city:any)=>{
  return axiosInstance.post('/master/city/add', city)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateCity=async(id:any, city:any)=>{
  return axiosInstance.put('/master/city/update/'+id, city)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getCityById=async(id: number)=>{ 
  return axiosInstance.get('/master/city/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteCity=async(id: number)=>{
  return axiosInstance.delete('/master/city/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
