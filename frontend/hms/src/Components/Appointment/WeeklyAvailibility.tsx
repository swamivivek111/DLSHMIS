import React from 'react';

type SessionKey = 'morning' | 'afternoon' | 'evening';

interface SessionAvailability {
  isAvailable: boolean;
  timeRange?: string;
  slots?: string[];
}

interface DailyAvailability {
  day: string; // "Monday", "Tuesday", ...
  morning: SessionAvailability;
  afternoon: SessionAvailability;
  evening: SessionAvailability;
}

interface DoctorInfo {
  name: string;
  specialty: string;
  experience: string;
  fee: string;
  education: string;
  address: string;
  image?: string;
  availability: DailyAvailability[];
}

interface Props {
  doctor: DoctorInfo;
}

const WeeklyAvailability: React.FC<Props> = ({ doctor }) => {
  const sessions: SessionKey[] = ['morning', 'afternoon', 'evening'];

  return (
    <div className="w-full overflow-x-auto">
      <h4 className="text-lg font-semibold text-center mb-3">Weekly Availability Plan</h4>
      <table className="min-w-full border text-sm text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Day</th>
            {sessions.map((session) => (
              <th key={session} className="border px-4 py-2 capitalize">
                {session}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctor.availability.map((dayItem) => (
            <tr key={dayItem.day}>
              <td className="border px-4 py-2 font-medium">{dayItem.day}</td>
              {sessions.map((session) => {
                const sessionData = dayItem[session];
                const isAvailable = sessionData?.isAvailable;

                return (
                  <td
                    key={session}
                    className={`border px-4 py-2 ${
                      isAvailable ? 'text-green-600 font-medium' : 'text-red-500'
                    }`}
                  >
                    {isAvailable && sessionData.timeRange
                      ? sessionData.timeRange
                      : 'Not Available'}
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

export default WeeklyAvailability;
