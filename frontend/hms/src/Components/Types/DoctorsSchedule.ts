export interface DoctorsSchedule {
  id: string;
  doctor: string;
  date: string;
  morningSlotFrom: string | null;
  morningSlotTo: string | null;
  afternoonSlotFrom: string | null;
  afternoonSlotTo: string | null;
  eveningSlotFrom: string | null;
  eveningSlotTo: string | null;
  status: 'Available' | 'On Leave';
}
