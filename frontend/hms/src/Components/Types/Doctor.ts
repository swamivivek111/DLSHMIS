import { DoctorInfo } from '../Types/appointment';

export const doctors: DoctorInfo[] = [
  {
    id: '12345',
    name: 'Dr. A. Sharma',
    department: 'Cardiologist', 
    specialty: 'Cardiologist',
    experience: '12 years',
    fee: 800,
    education: 'MD, Cardiology',
    address: 'Delhi Heart Clinic',
    image: '/public/avatar.jpg',
    availability: [
      {
        day: 'Monday',
        morning: { isAvailable: true, slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM'] },
        afternoon: { isAvailable: true, slots: ['02:00 PM', '02:30 PM'] },
        evening: { isAvailable: false, slots: [] },
      },
      {
        day: 'Tuesday',
        morning: { isAvailable: false, slots: [] },
        afternoon: { isAvailable: true, slots: ['01:00 PM', '01:30 PM'] },
        evening: { isAvailable: true, slots: ['06:00 PM', '06:30 PM'] },
      },
      // Add other weekdays
    ],
  },
];
