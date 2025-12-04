import axiosInstance from "../Interceptor/AxiosInterceptor";

// Lab Orders
const getAllLabOrders = async () => {
    return axiosInstance.get('/lab/orders')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getLabOrderById = async (id: number) => {
    return axiosInstance.get(`/lab/orders/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const createLabOrder = async (order: any) => {
    return axiosInstance.post('/lab/orders', order)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const updateLabOrder = async (id: number, order: any) => {
    return axiosInstance.put(`/lab/orders/${id}`, order)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const deleteLabOrder = async (id: number) => {
    return axiosInstance.delete(`/lab/orders/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

// Lab Samples
const getAllLabSamples = async () => {
    return axiosInstance.get('/lab/samples')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getLabSampleById = async (id: number) => {
    return axiosInstance.get(`/lab/samples/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const collectSample = async (sample: any) => {
    return axiosInstance.post('/lab/samples', sample)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const updateSample = async (id: number, sample: any) => {
    return axiosInstance.put(`/lab/samples/${id}`, sample)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

// Lab Results
const getAllLabResults = async () => {
    return axiosInstance.get('/lab/results')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getLabResultById = async (id: number) => {
    return axiosInstance.get(`/lab/results/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const createLabResult = async (result: any) => {
    return axiosInstance.post('/lab/results', result)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const updateLabResult = async (id: number, result: any) => {
    return axiosInstance.put(`/lab/results/${id}`, result)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const validateResult = async (id: number, validatorId: number) => {
    return axiosInstance.put(`/lab/results/${id}/validate?validatorId=${validatorId}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

// Lab Reports
const getAllLabReports = async () => {
    return axiosInstance.get('/lab/reports')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getLabReportById = async (id: number) => {
    return axiosInstance.get(`/lab/reports/${id}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const generateLabReport = async (report: any) => {
    return axiosInstance.post('/lab/reports', report)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

// Master Lab Tests
const getAllLabTests = async () => {
    return axiosInstance.get('/lab/tests')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getActiveLabTests = async () => {
    return axiosInstance.get('/lab/tests/active')
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

const getLabTestsByCategory = async (category: string) => {
    return axiosInstance.get(`/lab/tests/category/${category}`)
        .then((response: any) => response.data)
        .catch((error: any) => { throw error; });
};

export const LabServices = {
    // Orders
    getAllLabOrders,
    getLabOrderById,
    createLabOrder,
    updateLabOrder,
    deleteLabOrder,
    
    // Samples
    getAllLabSamples,
    getLabSampleById,
    collectSample,
    updateSample,
    
    // Results
    getAllLabResults,
    getLabResultById,
    createLabResult,
    updateLabResult,
    validateResult,
    
    // Reports
    getAllLabReports,
    getLabReportById,
    generateLabReport,
    
    // Master Tests
    getAllLabTests,
    getActiveLabTests,
    getLabTestsByCategory
};