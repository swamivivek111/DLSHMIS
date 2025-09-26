import React from 'react';
import { DoctorInfo, SessionType } from '../Types/appointment';

interface Props {
  doctor: DoctorInfo;
  selectedDay: string;
  selectedSession: SessionType;
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

const AppointmentTimingSlotDetails: React.FC<Props> = ({
  doctor,
  selectedDay,
  selectedSession,
}) => {
  const availability = doctor.availability.find(
    (a) => a.day.toLowerCase() === selectedDay.toLowerCase()
  );

  const sessionData = availability?.[selectedSession];

  if (!sessionData || !sessionData.isAvailable) {
    return (
      <div className="text-center text-red-500 font-semibold my-4">
        No slots available for {selectedSession} on {selectedDay}.
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        {selectedSession.charAt(0).toUpperCase() + selectedSession.slice(1)} Slots on{' '}
        {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {sessionData.slots.map((slot, idx) => (
          <button
            key={idx}
            className="px-4 py-2 text-sm border rounded-md text-green-700 bg-green-100 hover:bg-green-200"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTimingSlotDetails;
