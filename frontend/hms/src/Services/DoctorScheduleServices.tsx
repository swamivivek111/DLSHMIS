import axiosInstance from "../Interceptor/AxiosInterceptor";
import { AuditService } from "./AuditService";

export interface DoctorSchedule {
  id?: number;
  doctorId: number;
  doctorName: string;
  scheduleDate: string;
  dayOfWeek: string;
  scheduleType: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  sessionType: 'MORNING' | 'AFTERNOON' | 'EVENING';
  startTime: string;
  endTime: string;
  slotDuration: number;
  maxPatients: number;
  isAvailable: boolean;
  isHoliday: boolean;
  isLeave: boolean;
  leaveReason?: string;
  holidayReason?: string;
  notes?: string;
  active: boolean;
}

export const DoctorScheduleServices = {
  getAllSchedules: async (page: number = 1, size: number = 10, search: string = '') => {
    const response = await axiosInstance.get(`/master/doctor-schedules?page=${page}&size=${size}&search=${search}`);
    return response.data;
  },

  getScheduleById: async (id: number) => {
    const response = await axiosInstance.get(`/master/doctor-schedules/${id}`);
    return response.data;
  },

  createSchedule: async (schedule: DoctorSchedule) => {
    const response = await axiosInstance.post('/master/doctor-schedules', schedule);
    
    // Audit log
    try {
      console.log('Creating audit log for schedule creation...');
      await AuditService.logAction({
        operation: 'DOCTOR_SCHEDULE_CREATE',
        moduleName: 'Schedule Management',
        microservice: 'AppointmentMS',
        description: `Doctor schedule created for Dr. ${schedule.doctorName} on ${schedule.scheduleDate}`,
        operationType: 'CREATE',
        entityType: 'DoctorSchedule',
        entityId: response.data.id
      });
      console.log('Audit log created successfully');
    } catch (auditError) {
      console.error('Failed to create audit log:', auditError);
    }
    
    return response.data;
  },

  updateSchedule: async (id: number, schedule: DoctorSchedule) => {
    const response = await axiosInstance.put(`/master/doctor-schedules/${id}`, schedule);
    
    // Audit log
    try {
      console.log('Creating audit log for schedule update...');
      await AuditService.logAction({
        operation: 'DOCTOR_SCHEDULE_UPDATE',
        moduleName: 'Schedule Management',
        microservice: 'AppointmentMS',
        description: `Doctor schedule updated for Dr. ${schedule.doctorName} (ID: ${id})`,
        operationType: 'UPDATE',
        entityType: 'DoctorSchedule',
        entityId: id
      });
      console.log('Audit log updated successfully');
    } catch (auditError) {
      console.error('Failed to create audit log:', auditError);
    }
    
    return response.data;
  },

  deleteSchedule: async (id: number) => {
    // Get schedule details before deletion for audit
    const scheduleDetails = await axiosInstance.get(`/master/doctor-schedules/${id}`);
    const response = await axiosInstance.delete(`/master/doctor-schedules/${id}`);
    
    // Audit log
    try {
      console.log('Creating audit log for schedule deletion...');
      await AuditService.logAction({
        operation: 'DOCTOR_SCHEDULE_DELETE',
        moduleName: 'Schedule Management',
        microservice: 'AppointmentMS',
        description: `Doctor schedule deleted for Dr. ${scheduleDetails.data.doctorName} (ID: ${id})`,
        operationType: 'DELETE',
        entityType: 'DoctorSchedule',
        entityId: id
      });
      console.log('Audit log deleted successfully');
    } catch (auditError) {
      console.error('Failed to create audit log:', auditError);
    }
    
    return response.data;
  },

  getSchedulesByDoctor: async (doctorId: number) => {
    const response = await axiosInstance.get(`/master/doctor-schedules/doctor/${doctorId}`);
    return response.data;
  },

  getSchedulesByDate: async (date: string) => {
    const response = await axiosInstance.get(`/master/doctor-schedules/date/${date}`);
    return response.data;
  },

  getSchedulesInRange: async (doctorId: number, startDate: string, endDate: string) => {
    const response = await axiosInstance.get(`/master/doctor-schedules/doctor/${doctorId}/range?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  }
};