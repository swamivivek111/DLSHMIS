import React from 'react';

interface DoctorSelectorProps {
  department: string;
  doctor: string;
  selectedDate: string;
  onDepartmentChange: (dept: string) => void;
  onDoctorChange: (doc: string) => void;
  onDateChange: (date: string) => void;
  doctorList: { name: string; department: string }[];
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  department,
  doctor,
  selectedDate,
  onDepartmentChange,
  onDoctorChange,
  onDateChange,
  doctorList,
}) => {
  const departments = Array.from(
    new Set(doctorList.map((doc) => doc.department))
  );

  const filteredDoctors = doctorList.filter((doc) => doc.department === department);

  return (
    <div className="w-full max-w-xs mx-auto bg-white p-5 rounded shadow">
      <div className="grid gap-4">
        {/* Department Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
          <select
            value={doctor}
            onChange={(e) => onDoctorChange(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.name} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorSelector;
