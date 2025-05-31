import axiosInstance from "../Interceptor/AxiosInterceptor";

const scheduleAppointment=async(appointment:any)=>{
    return axiosInstance.post('/appointment/schedule', appointment)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const cancelAppointment=async(id:any)=>{
    return axiosInstance.put('/appointment/cancel/'+ id)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const getAppointment=async(id:any)=>{
    return axiosInstance.get('/appointment/get/'+ id)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const updateAppointment=async(id:any, appointment:any)=>{
    return axiosInstance.put('/appointment/'+ id, appointment)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const getAllAppointment=async()=>{
    return axiosInstance.get('/appointment/getall')
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};

export {scheduleAppointment, cancelAppointment, getAppointment, updateAppointment, getAllAppointment};