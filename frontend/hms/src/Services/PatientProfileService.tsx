import axiosInstance from "../Interceptor/AxiosInterceptor";

const getPatient=async(id:any)=>{
    return axiosInstance.get('/profile/patient/get/'+ id)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const updatePatient=async(patient:any)=>{
    return axiosInstance.put('/profile/patient/update', patient)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const getAllPatients=async()=>{
    return axiosInstance.get('/profile/patient/getall')
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
export {getPatient, updatePatient, getAllPatients};