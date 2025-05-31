/*import axiosInstance from "../Interceptor/AxiosInterceptor";

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

export {registerUser, loginUser};*/

import { Department } from "../Components/Types/Department";

let fakeDb: Department[] = [];

export const getDepartments = async (page = 1, limit = 10, search = '') => {
  const filtered = fakeDb.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * limit, page * limit);
  return {
    data: paginated,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

export const getDepartmentById = async (id: number): Promise<Department> => {
  const found = fakeDb.find(d => d.id === id);
  if (!found) throw new Error('Not found');
  return found;
};

export const createDepartment = async (dept: Omit<Department, 'id'>) => {
  const newDept = { ...dept, id: Date.now() };
  fakeDb.push(newDept);
  return newDept;
};

export const updateDepartment = async (id: number, dept: Partial<Department>) => {
  const index = fakeDb.findIndex(d => d.id === id);
  if (index >= 0) fakeDb[index] = { ...fakeDb[index], ...dept };
};

export const deleteDepartment = async (id: number) => {
  fakeDb = fakeDb.filter(d => d.id !== id);
};
