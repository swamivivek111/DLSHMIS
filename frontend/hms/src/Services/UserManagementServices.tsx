import axiosInstance from '../Interceptor/AxiosInterceptor';

export interface UserManagement {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  profileId?: number;
  userRole?: {
    roleId: number;
    roleName: string;
  };
  active?: boolean;
}

export interface UserResponse {
  content: UserManagement[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const UserManagementServices = {
  // Create user
  createUser: async (user: UserManagement): Promise<any> => {
    const response = await axiosInstance.post('/user/create', user);
    return response.data;
  },

  // Update user
  updateUser: async (id: number, user: UserManagement): Promise<any> => {
    const roleMapping: { [key: string]: string } = {
      'ADMIN': 'Admin',
      'DOCTOR': 'Doctor', 
      'PATIENT': 'Patient'
    };
    
    const updatedUser = {
      ...user,
      role: roleMapping[user.role || ''] || user.role,
      // Only include password if it's provided (not empty)
      ...(user.password && user.password.trim() !== '' ? { password: user.password } : {})
    };
    
    // Remove confirmPassword from request
    delete (updatedUser as any).confirmPassword;
    
    const response = await axiosInstance.put(`/user/update/${id}`, updatedUser);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<any> => {
    const response = await axiosInstance.delete(`/user/delete/${id}`);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<UserManagement> => {
    const response = await axiosInstance.get(`/user/get/${id}`);
    return response.data;
  },

  // Get all users with pagination
  getAllUsers: async (page: number = 0, size: number = 10, search?: string): Promise<UserResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await axiosInstance.get(`/user/getall?${params}`);
    return response.data;
  },

  // Get active users
  getActiveUsers: async (): Promise<UserManagement[]> => {
    const response = await axiosInstance.get('/user/active');
    return response.data;
  },

  // Assign role to user
  assignRole: async (userId: number, roleId: number): Promise<any> => {
    const response = await axiosInstance.put(`/user/assign-role/${userId}/${roleId}`);
    return response.data;
  },
};