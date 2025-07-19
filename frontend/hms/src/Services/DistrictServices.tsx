import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDistrict = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/district/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.districts,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addDistrict=async(district:any)=>{
  return axiosInstance.post('/master/district/add', district)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateDistrict=async(id:any, district:any)=>{
  return axiosInstance.put('/master/district/update/'+id, district)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getDistrictById=async(id: number)=>{ 
  return axiosInstance.get('/master/district/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteDistrict=async(id: number)=>{
  return axiosInstance.delete('/master/district/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
