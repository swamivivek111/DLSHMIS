import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import DoctorSelector from './DoctorSelector';
import AppointmentSlotSelector from './AppointmentSlotSelector';
import AppointmentPatientRegistration from './AppointmentPatientRegistration';
import DoctorAvailabilityCard from './DoctorAvailabilityCard';
import { AppointmentSelection, DoctorInfo } from '../Types/appointment';
import { doctors } from '../Types/Doctor';
import { getDepartment } from '../../Services/DepartmentServices';
import { Department } from '../Types/Department';
import { errorNotification } from '../../Utility/NotificationUtil';
import { getDoctor, getDoctorById } from '../../Services/DoctorServices';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const BookAppointment = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);
  const [appointment, setAppointment] = useState<AppointmentSelection>({
    department: '',
    doctor: null,
    selectedDate: '',
    selectedSession: '',
    selectedSlot: null,
  });

  const [appointments, setAppointments] = useState<any[]>([]); // Add real type later
  const [showForm, setShowForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);


  const fetchData = async () => {
    try {
      
  const dummyDepartments = await getDepartment(1, 100, '');
    setDepartments(dummyDepartments.data);
    } catch {
      errorNotification('Failed to load departments');
    }
  };
    const fetchDoctors = async () => {
    try {
          const deptDoctors = await getDoctor();
          setDoctors(deptDoctors.data);
    } catch {
      errorNotification('Failed to load doctors');
    }
  };
  useEffect(() => {
    /*const dummyDepartments: Department[] = [
      { id: "1", name: "General Medicine" },
      { id: "2", name: "Cardiology" },
    ];*/

    fetchData();
    fetchDoctors();
  }, []);

  const handleDoctorChange = (doc: DoctorInfo) => {
    setAppointment((prev) => ({
      ...prev,
      doctor: doc,
      selectedSession: '',
      selectedSlot: null,
    }));
    setShowRegistrationForm(false);
  };

  const handleSlotSelect = (slot: string) => {
    setAppointment((prev) => ({ ...prev, selectedSlot: slot }));
  };

  const handleSessionSelectFromGrid = (day: string, session: 'morning' | 'afternoon' | 'evening') => {
    if (!appointment.selectedDate) return;

    const selected = new Date(appointment.selectedDate);
    const selectedDayIndex = selected.getDay();
    const gridDayIndex = days.indexOf(day.toLowerCase());
    const difference = gridDayIndex - selectedDayIndex;
    const sessionDate = new Date(selected);
    sessionDate.setDate(selected.getDate() + difference);

    const formattedDate = sessionDate.toISOString().split('T')[0];

    setAppointment((prev) => ({
      ...prev,
      selectedDate: formattedDate,
      selectedSession: session,
      selectedSlot: null,
    }));
    setShowRegistrationForm(false);
  };

  const handleSaveAppointment = (patientData: any) => {
    const newAppointment = {
      ...appointment,
      patient: patientData,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setAppointment({
      department: '',
      doctor: null,
      selectedDate: '',
      selectedSession: '',
      selectedSlot: null,
    });
    setShowForm(false);
    setShowRegistrationForm(false);
  };

  const handleDelete = (index: number) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const selected = appointments[index];
    setAppointment({
      department: selected.department,
      doctor: selected.doctor,
      selectedDate: selected.selectedDate,
      selectedSession: selected.selectedSession,
      selectedSlot: selected.selectedSlot,
    });
    setAppointments(appointments.filter((_, i) => i !== index));
    setShowForm(true);
    setShowRegistrationForm(true);
  };

  return (
    <div>
      <Title order={2} className="text-gray-800 mb-6">
        Book Appointment
      </Title>
      <div className="bg-white p-6 shadow-md">
        {!showForm ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Appointments</h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                Add Appointment
              </button>
            </div>

            {appointments.length === 0 ? (
              <p className="text-gray-600 text-center">No appointments yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Patient</th>
                      <th className="p-2 border">Doctor</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Session</th>
                      <th className="p-2 border">Slot</th>
                      <th className="p-2 border text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{a.patient?.name || '-'}</td>
                        <td className="p-2 border">{a.doctor?.name}</td>
                        <td className="p-2 border">{a.selectedDate}</td>
                        <td className="p-2 border capitalize">{a.selectedSession}</td>
                        <td className="p-2 border">{a.selectedSlot}</td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-center font-semibold mb-6">Add Appointment</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Department */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">Department</label>
                <select
                  value={appointment.department}
                  onChange={(e) =>
                    setAppointment((prev) => ({ ...prev, department: e.target.value }))
                    //fetchDoctors();
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select Department</option>
                  {[...new Set(departments)].map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">Doctor</label>
                <select
                  value={appointment.doctor?.name || ''}
                  onChange={(e) => {
                    const found = doctors.find(
                      (d) => d.name.toLowerCase() === e.target.value.toLowerCase()
                    );
                    if (found) handleDoctorChange(found);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select Doctor</option>
                  {doctors
                    .filter(
                      (doc) =>
                        doc.department === appointment.department || !appointment.department
                    )
                    .map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block font-medium mb-1 text-gray-700">Appointment Date</label>
                <input
                  type="date"
                  value={appointment.selectedDate}
                  onChange={(e) =>
                    setAppointment((prev) => ({ ...prev, selectedDate: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Availability Grid */}
            {appointment.doctor && appointment.selectedDate && (
              <DoctorAvailabilityCard
                doctor={appointment.doctor}
                onSelectSession={handleSessionSelectFromGrid}
              />
            )}

            {/* Session Buttons */}
            {appointment.selectedDate && (
              <div className="flex justify-center gap-4 mt-6">
                {['morning', 'afternoon', 'evening'].map((session) => (
                  <button
                    key={session}
                    className={`px-6 py-2 rounded border transition-all duration-200 ${
                      appointment.selectedSession === session
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() =>
                      setAppointment((prev) => ({
                        ...prev,
                        selectedSession: session as 'morning' | 'afternoon' | 'evening',
                        selectedSlot: null,
                      }))
                    }
                  >
                    {session.charAt(0).toUpperCase() + session.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Slots & Form */}
            {appointment.doctor && appointment.selectedSession && (
              <>
                <AppointmentSlotSelector
                  doctor={appointment.doctor}
                  date={appointment.selectedDate}
                  session={appointment.selectedSession}
                  selectedSlot={appointment.selectedSlot}
                  onSlotSelect={handleSlotSelect}
                />

                {!showRegistrationForm ? (
                  appointment.selectedSlot && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setShowRegistrationForm(true)}
                        className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  )
                ) : (
                  <AppointmentPatientRegistration
                    doctor={appointment.doctor}
                    selectedDate={appointment.selectedDate}
                    selectedSession={appointment.selectedSession}
                    selectedSlot={appointment.selectedSlot ?? ''}
                    onCancel={() => setShowRegistrationForm(false)}
                    onSave={handleSaveAppointment}
                  />
                )}
              </>
            )}

            <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => {
                setShowForm(false);
                setShowRegistrationForm(false);
              }}
            >
              Back
            </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
