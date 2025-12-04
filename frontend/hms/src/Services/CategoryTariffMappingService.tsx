import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/master/category-tariff-mapping';

export const CategoryTariffMappingService = {
  getAllMappings: async () => {
    const response = await axios.get(`${API_BASE_URL}/list`);
    return response.data;
  },

  getMappingById: async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  createMapping: async (mapping: any) => {
    const response = await axios.post(`${API_BASE_URL}/create`, mapping);
    return response.data;
  },

  updateMapping: async (id: number, mapping: any) => {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, mapping);
    return response.data;
  },

  deleteMapping: async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  }
};