import axiosInstance from "../Interceptor/AxiosInterceptor";

const getPatientById = async (id: number) => {
    return axiosInstance.get(`/profile/patient/get/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const addPatient = async (patient: any) => {
    return axiosInstance.post('/profile/patient/add', patient)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const updatePatient = async (patient: any) => {
    return axiosInstance.put('/profile/patient/update', patient)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const deletePatient = async (id: number) => {
    return axiosInstance.delete(`/profile/patient/delete/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getAllPatients = async () => {
    return axiosInstance.get('/profile/patient/getall')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const createPatient = async (patient: any) => {
    return addPatient(patient);
};

export const PatientProfileService = {
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient,
    getAllPatients,
    createPatient
};

// Legacy exports for backward compatibility
export { getPatientById as getPatient, updatePatient, getAllPatients };