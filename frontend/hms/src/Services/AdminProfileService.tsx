import axiosInstance from "../Interceptor/AxiosInterceptor";

const getAdmin=async(id:any)=>{
    return axiosInstance.get('/profile/admin/get/'+ id)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const updateAdmin=async(admin:any)=>{
    return axiosInstance.put('/profile/admin/update', admin)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};

export {getAdmin, updateAdmin};