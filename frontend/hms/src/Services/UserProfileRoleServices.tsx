import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getUserProfileRole = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/userProfileRole/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.userProfileRoles,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addUserProfileRole=async(userProfileRole:any)=>{
  return axiosInstance.post('/master/userProfileRole/add', userProfileRole)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateUserProfileRole=async(id:any, userProfileRole:any)=>{
  return axiosInstance.put('/master/userProfileRole/update/'+id, userProfileRole)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getUserProfileRoleById=async(id: number)=>{ 
  return axiosInstance.get('/master/userProfileRole/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteUserProfileRole=async(id: number)=>{
  return axiosInstance.delete('/master/userProfileRole/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
