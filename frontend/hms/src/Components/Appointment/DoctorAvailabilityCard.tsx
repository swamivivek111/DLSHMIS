import React from 'react';
import { DoctorInfo } from '../Types/appointment';

interface Props {
  doctor: DoctorInfo;
  onSelectSession?: (day: string, session: 'morning' | 'afternoon' | 'evening') => void;
}

const sessions = ['morning', 'afternoon', 'evening'] as const;
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const DoctorAvailabilityCard: React.FC<Props> = ({ doctor, onSelectSession }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-center text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Session / Day</th>
            {days.map((day) => (
              <th key={day} className="p-2 border border-gray-300">
                {capitalize(day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <td className="font-semibold p-2 border border-gray-300 capitalize">
                {capitalize(session)}
              </td>
              {days.map((day) => {
                const availabilityForDay = doctor.availability.find(
                  (a) => a.day.toLowerCase() === day.toLowerCase()
                );

                const sessionData = availabilityForDay?.[session];

                const isAvailable = sessionData?.isAvailable;
                const slotText = isAvailable
                  ? sessionData.slots.join(', ')
                  : 'Not Available';

                return (
                  <td
                    key={`${day}-${session}`}
                    className={`p-2 border border-gray-300 cursor-pointer hover:bg-blue-50 ${
                      isAvailable ? '' : 'text-red-500 font-semibold'
                    }`}
                    onClick={() => {
                      if (isAvailable && onSelectSession) {
                        onSelectSession(day, session);
                      }
                    }}
                  >
                    <span className={isAvailable ? 'text-green-700 font-medium' : 'text-red-500 font-semibold'}>
                      {slotText}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAvailabilityCard;
