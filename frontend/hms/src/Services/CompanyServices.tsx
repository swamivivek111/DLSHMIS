import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getCompany = async (page: number = 1, limit: number = 10, search: string = '') => {
  try {
    page = page - 1;
    const response = await axiosInstance.get('/master/companies/getall', {
      params: { page, limit, search }
    });
    return {
      data: response.data.companies,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw error;
  }
};

export const addCompany = async (company: any) => {
  return axiosInstance.post('/master/companies/add', company)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateCompany = async (id: any, company: any) => {
  return axiosInstance.put('/master/companies/update/' + id, company)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getCompanyById = async (id: number) => {
  return axiosInstance.get('/master/companies/get/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteCompany = async (id: number) => {
  return axiosInstance.delete('/master/companies/delete/' + id)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getAllActiveCompanies = async () => {
  try {
    const response = await axiosInstance.get('/master/companies/active');
    return response.data || [];
  } catch (error: any) {
    console.error('Failed to load companies:', error);
    return [];
  }
};

export const CompanyServices = {
  getAllActiveCompanies,
  getCompany,
  addCompany,
  updateCompany,
  getCompanyById,
  deleteCompany
};