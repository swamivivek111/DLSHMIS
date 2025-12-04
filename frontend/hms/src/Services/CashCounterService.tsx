import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/master/cash-counters';

export const CashCounterService = {
  getAllCashCounters: async () => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_BASE_URL}/list`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getCashCounterById: async (id: number) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  createCashCounter: async (cashCounter: any) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_BASE_URL}/create`, cashCounter, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateCashCounter: async (id: number, cashCounter: any) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, cashCounter, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteCashCounter: async (id: number) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};