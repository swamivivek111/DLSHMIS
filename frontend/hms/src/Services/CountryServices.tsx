import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getCountry = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/country/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.countrys,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addCountry=async(country:any)=>{
  return axiosInstance.post('/master/country/add', country)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateCountry=async(id:any, country:any)=>{
  return axiosInstance.put('/master/country/update/'+id, country)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getCountryById=async(id: number)=>{ 
  return axiosInstance.get('/master/country/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteCountry=async(id: number)=>{
  return axiosInstance.delete('/master/country/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
