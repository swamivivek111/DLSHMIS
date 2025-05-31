import axiosInstance from "../Interceptor/AxiosInterceptor";

const getDoctor=async(id:any)=>{
    return axiosInstance.get('/profile/doctor/get/'+ id)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const updateDoctor=async(doctor:any)=>{
    return axiosInstance.put('/profile/doctor/update', doctor)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const getAllDoctors=async()=>{
    return axiosInstance.get('/profile/doctor/getall')
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};

export {getDoctor, updateDoctor, getAllDoctors};