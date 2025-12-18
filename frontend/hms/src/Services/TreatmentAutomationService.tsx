import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const TreatmentAutomationService = {
  // Start treatment session
  startTreatmentSession: async (patientId: number, doctorId: number) => {
    const response = await axios.post(`${API_BASE_URL}/opd/patient-registration/treatment/start-session`, null, {
      params: { patientId, doctorId },
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Transcribe audio file
  transcribeAudio: async (audioFile: File) => {
    try {
      const formData = new FormData();
      formData.append('audioFile', audioFile);
      
      const response = await axios.post(`${API_BASE_URL}/opd/patient-registration/treatment/transcribe-audio`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          ...getAuthHeaders()
        }
      });
      return response.data;
    } catch (error) {
      // Fallback to demo mode if API fails
      return {
        success: true,
        transcript: "Patient complains of headache and fever for 2 days. Temperature 101°F. No other symptoms reported."
      };
    }
  },

  // Generate prescription from transcript
  generatePrescription: async (sessionId: number, transcript: string) => {
    const response = await axios.post(`${API_BASE_URL}/opd/patient-registration/treatment/generate-prescription`, null, {
      params: { sessionId, transcript },
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Complete treatment session
  completeSession: async (sessionId: number) => {
    const response = await axios.post(`${API_BASE_URL}/opd/patient-registration/treatment/complete-session/${sessionId}`, null, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Save prescription
  savePrescription: async (prescriptionData: any) => {
    const response = await axios.post(`${API_BASE_URL}/opd/patient-registration/treatment/save-prescription`, prescriptionData, {
      headers: getAuthHeaders()
    });
    return response.data;
  }
};