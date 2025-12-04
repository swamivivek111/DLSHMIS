import axiosInstance from "../Interceptor/AxiosInterceptor";

export const CategoryService = {
  getAllCategories: async () => {
    const response = await axiosInstance.get('/master/categories');
    return response.data;
  },

  getCategoryById: async (id: number) => {
    const response = await axiosInstance.get(`/master/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: any) => {
    const response = await axiosInstance.post('/master/categories', category);
    return response.data;
  },

  updateCategory: async (id: number, category: any) => {
    const response = await axiosInstance.put(`/master/categories/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await axiosInstance.delete(`/master/categories/${id}`);
    return response.data;
  }
};