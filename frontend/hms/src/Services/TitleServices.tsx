import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getTitle = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/title/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.titles,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addTitle=async(title:any)=>{
  return axiosInstance.post('/master/title/add', title)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateTitle=async(id:any, title:any)=>{
  return axiosInstance.put('/master/title/update/'+id, title)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getTitleById=async(id: number)=>{ 
  return axiosInstance.get('/master/title/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteTitle=async(id: number)=>{
  return axiosInstance.delete('/master/title/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
