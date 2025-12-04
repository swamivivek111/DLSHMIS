import axiosInstance from '../Interceptor/AxiosInterceptor';

export interface ApplicationSetting {
  id?: number;
  settingKey: string;
  settingValue?: string;
  category?: string;
  dataType?: string;
  description?: string;
  active?: boolean;
}

export const ApplicationSettingServices = {
  // Create setting
  createSetting: async (setting: ApplicationSetting): Promise<any> => {
    const response = await axiosInstance.post('/master/applicationsetting/create', setting);
    return response.data;
  },

  // Update single setting
  updateSetting: async (key: string, value: string): Promise<any> => {
    const response = await axiosInstance.put(`/master/applicationsetting/update/${key}`, { value });
    return response.data;
  },

  // Update multiple settings
  updateMultipleSettings: async (settings: { [key: string]: string }): Promise<any> => {
    const response = await axiosInstance.put('/master/applicationsetting/update-multiple', settings);
    return response.data;
  },

  // Get setting value
  getSettingValue: async (key: string): Promise<string> => {
    const response = await axiosInstance.get(`/master/applicationsetting/get/${key}`);
    return response.data;
  },

  // Get settings by category
  getSettingsByCategory: async (category: string): Promise<ApplicationSetting[]> => {
    const response = await axiosInstance.get(`/master/applicationsetting/category/${category}`);
    return response.data;
  },

  // Get all settings
  getAllSettings: async (): Promise<ApplicationSetting[]> => {
    const response = await axiosInstance.get('/master/applicationsetting/all');
    return response.data;
  },

  // Delete setting
  deleteSetting: async (key: string): Promise<any> => {
    const response = await axiosInstance.delete(`/master/applicationsetting/delete/${key}`);
    return response.data;
  },

  // Test API connection
  testConnection: async (): Promise<string> => {
    const response = await axiosInstance.get('/master/applicationsetting/test');
    return response.data;
  },
};