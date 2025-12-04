import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getEmployee = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/employee/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.employee || [],       // backend returns 'employee', not 'employees'
      totalPages: response.data.totalPages || 1,
    };
  } catch (error: any) {
    throw error;
  }
};


export const addEmployee=async(employee:any)=>{
  return axiosInstance.post('/master/employee/add', employee)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateEmployee=async(id:any, employee:any)=>{
  return axiosInstance.put('/master/employee/update/'+id, employee)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getEmployeeById=async(id: number)=>{ 
  return axiosInstance.get('/master/employee/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteEmployee=async(id: number)=>{
  return axiosInstance.delete('/master/employee/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};
