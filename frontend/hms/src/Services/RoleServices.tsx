import axiosInstance from '../Interceptor/AxiosInterceptor';

export interface Role {
  roleId?: number;
  roleName: string;
  description?: string;
  category?: string;
  active?: boolean;
}

export interface RoleResponse {
  content: Role[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const RoleServices = {
  // Create role
  createRole: async (role: Role): Promise<any> => {
    const response = await axiosInstance.post('/user/role/create', role);
    return response.data;
  },

  // Update role
  updateRole: async (id: number, role: Role): Promise<any> => {
    const response = await axiosInstance.put(`/user/role/update/${id}`, role);
    return response.data;
  },

  // Delete role
  deleteRole: async (id: number): Promise<any> => {
    const response = await axiosInstance.delete(`/user/role/delete/${id}`);
    return response.data;
  },

  // Get role by ID
  getRoleById: async (id: number): Promise<Role> => {
    const response = await axiosInstance.get(`/user/role/get/${id}`);
    return response.data;
  },

  // Get all roles with pagination
  getAllRoles: async (page: number = 0, size: number = 10, search?: string): Promise<RoleResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await axiosInstance.get(`/user/role/getall?${params}`);
    return response.data;
  },

  // Get active roles
  getActiveRoles: async (): Promise<Role[]> => {
    const response = await axiosInstance.get('/user/role/active');
    return response.data;
  },

  // Get roles by category
  getRolesByCategory: async (category: string): Promise<Role[]> => {
    const response = await axiosInstance.get(`/user/role/category/${category}`);
    return response.data;
  },
};