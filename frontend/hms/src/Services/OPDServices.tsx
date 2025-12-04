import axiosInstance from "../Interceptor/AxiosInterceptor";

export const createOPDVisit = async (visit: any) => {
  return axiosInstance.post('/opd/visit/add', visit)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getOPDVisits = async (page: number = 0, limit: number = 10) => {
  return axiosInstance.get('/opd/visit/getall', { params: { page, limit } })
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getOPDVisitById = async (id: number) => {
  return axiosInstance.get(`/opd/visit/get/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const updateOPDVisit = async (id: number, visit: any) => {
  return axiosInstance.put(`/opd/visit/update/${id}`, visit)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const deleteOPDVisit = async (id: number) => {
  return axiosInstance.delete(`/opd/visit/delete/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getVisitsByPatient = async (patientId: number) => {
  return axiosInstance.get(`/opd/visit/patient/${patientId}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};

export const getVisitsByDoctor = async (doctorId: number) => {
  return axiosInstance.get(`/opd/visit/doctor/${doctorId}`)
    .then((response: any) => response.data)
    .catch((error: any) => { throw error; });
};