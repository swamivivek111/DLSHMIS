import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getDepartment = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page=page-1;
    const response = await axiosInstance.get('/master/department/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.departments,       // adjust based on your backend response
      totalPages: response.data.totalPages,  // or use totalCount / limit depending on your API
    };
  } catch (error: any) {
    throw error;
  }
};


export const addDepartment=async(department:any)=>{
  return axiosInstance.post('/master/department/add', department)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const updateDepartment=async(id:any, department:any)=>{
  return axiosInstance.put('/master/department/update/'+id, department)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getDepartmentById=async(id: number)=>{
  return axiosInstance.get('/master/department/get/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const deleteDepartment=async(id: number)=>{
  return axiosInstance.delete('/master/department/delete/'+id)
  .then((response:any) => response.data) // logs: It worked!
  .catch((error:any) => {throw error;}); // runs if reject()
};

export const getAllDepartments = async () => {
  try {
    const response = await axiosInstance.get('/master/department/getall', {
      params: { page: 0, limit: 1000, search: '' }
    });
    console.log('Department API response:', response.data);
    return response.data.departments || response.data || [];
  } catch (error: any) {
    console.error('Failed to load departments:', error);
    return [];
  }
};

export const DepartmentServices = {
  getAllDepartments,
  getDepartment,
  addDepartment,
  updateDepartment,
  getDepartmentById,
  deleteDepartment
};
