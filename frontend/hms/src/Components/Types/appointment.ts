export type SessionType = 'morning' | 'afternoon' | 'evening';

export interface SessionAvailability {
  isAvailable: boolean;
  slots: string[];
}

export interface Availability {
  day: string;
  morning?: SessionAvailability;
  afternoon?: SessionAvailability;
  evening?: SessionAvailability;
}




export interface DoctorInfo {
  id: string;
  name: string;
  department: string; 
  specialty: string;
  experience: string;
  fee: number;
  education: string;
  address: string;
  image: string;
  availability: Availability[];
}

export interface AppointmentSelection {
  department: string;
  doctor: DoctorInfo | null;
  selectedDate: string;
  selectedSession: 'morning' | 'afternoon' | 'evening' | ''; 
  selectedSlot: string | null;
}


export type TimeSlotStatus = 'available' | 'booked' | 'passed';

export interface TimeSlot {
  time: string;
  status: TimeSlotStatus;
}

