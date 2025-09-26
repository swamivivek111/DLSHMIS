import React from 'react';
import { DoctorInfo } from '../Types/appointment'; 


type SlotStatus = 'available' | 'booked' | 'passed';

interface Props {
  doctor: DoctorInfo;
  date: string;
  session: 'morning' | 'afternoon' | 'evening';
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
}

const AppointmentSlotSelector: React.FC<Props> = ({
  doctor,
  date,
  session,
  selectedSlot,
  onSlotSelect,
}) => {
  const weekday = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

  // Find the availability for the selected day
  const dayAvailability = doctor.availability.find((a) => a.day === weekday);
  const sessionData = dayAvailability ? dayAvailability[session] : null;

  // Dummy function to assign slot status
  const getSlotStatus = (slot: string): SlotStatus => {
    if (slot.includes('8:15') || slot.includes('3:15') || slot.includes('6:30')) {
      return 'booked';
    }
    if (slot.includes('7:00') || slot.includes('7:15') || slot.includes('7:30')) {
      return 'passed';
    }
    return 'available';
  };

  if (!sessionData || !sessionData.isAvailable || sessionData.slots.length === 0) {
    return (
      <div className="text-red-500 mt-4 text-center">
        No slots available for this session.
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gray-100 rounded-lg p-4">
      <h4 className="text-lg font-semibold mb-3 text-center capitalize text-gray-700">
        {session} Slots
      </h4>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {sessionData.slots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = selectedSlot === slot;

          const baseClass =
            status === 'booked'
              ? 'bg-red-200 text-red-800 cursor-not-allowed'
              : status === 'passed'
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : isSelected
              ? 'bg-green-500 text-white'
              : 'bg-white hover:bg-green-100 text-gray-800';

          return (
            <button
              key={slot}
              onClick={() => status === 'available' && onSlotSelect(slot)}
              disabled={status !== 'available'}
              className={`px-3 py-2 text-sm border rounded text-center transition ${baseClass}`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentSlotSelector;