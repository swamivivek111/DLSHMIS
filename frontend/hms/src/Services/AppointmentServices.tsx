import axiosInstance from '../Interceptor/AxiosInterceptor';

export interface Appointment {
  appointmentId?: number;
  patientId?: number;
  patientName: string;
  doctorId: number;
  doctorName?: string;
  departmentId: number;
  departmentName?: string;
  appointmentDate: string;
  timeSlot: string;
  sessionType: string;
  status?: string;
  notes?: string;
  bookedBy?: string;
}

export interface AppointmentResponse {
  content: Appointment[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const AppointmentServices = {
  // Create appointment
  createAppointment: async (appointment: Appointment): Promise<any> => {
    const response = await axiosInstance.post('/appointment/create', appointment);
    return response.data;
  },

  // Update appointment
  updateAppointment: async (id: number, appointment: Appointment): Promise<any> => {
    const response = await axiosInstance.put(`/appointment/update/${id}`, appointment);
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id: number): Promise<any> => {
    const response = await axiosInstance.delete(`/appointment/delete/${id}`);
    return response.data;
  },

  // Get appointment by ID
  getAppointmentById: async (id: number): Promise<Appointment> => {
    const response = await axiosInstance.get(`/appointment/get/${id}`);
    return response.data;
  },

  // Get all appointments with pagination
  getAllAppointments: async (page: number = 0, size: number = 10, search?: string): Promise<AppointmentResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await axiosInstance.get(`/appointment/getall?${params}`);
    return response.data;
  },

  // Cancel appointment
  cancelAppointment: async (id: number): Promise<any> => {
    const response = await axiosInstance.put(`/appointment/cancel/${id}`);
    return response.data;
  },

  // Reschedule appointment
  rescheduleAppointment: async (id: number, newDate: string, newTimeSlot: string): Promise<any> => {
    const response = await axiosInstance.put(`/appointment/reschedule/${id}`, {
      appointmentDate: newDate,
      timeSlot: newTimeSlot
    });
    return response.data;
  },

  // Get booked time slots
  getBookedTimeSlots: async (doctorId: number, date: string): Promise<string[]> => {
    const response = await axiosInstance.get(`/appointment/booked-slots/${doctorId}/${date}`);
    return response.data;
  },

  // Get doctor schedule
  getDoctorSchedule: async (doctorId: number, date: string): Promise<any> => {
    const response = await axiosInstance.get(`/appointment/doctor-schedule/${doctorId}/${date}`);
    return response.data;
  },
};