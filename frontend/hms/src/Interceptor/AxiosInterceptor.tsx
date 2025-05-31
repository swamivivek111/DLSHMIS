import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance=axios.create({
    baseURL:'http://localhost:9000', //Spring Gateway URL

})
axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token=localStorage.getItem('token');
        if(token && config.headers){
            config.headers.Authorization=`Bearer ${token}`;
        }
        console.log("Interceptor : Authorization :"+config.headers.Authorization);
        config.headers['X-Secret-Key'] = 'SECRET';//Authorization
        return config;
    }
)

export default axiosInstance;