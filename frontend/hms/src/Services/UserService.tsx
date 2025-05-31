import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser=async(user:any)=>{
    return axiosInstance.post('/user/register', user)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};
const loginUser=async(user:any)=>{
    return axiosInstance.post('/user/login', user)
    .then((response:any) => response.data) // logs: It worked!
    .catch((error:any) => {throw error;}); // runs if reject()
};

export {registerUser, loginUser};