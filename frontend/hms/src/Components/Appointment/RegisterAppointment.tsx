import React, { useState, useEffect } from "react";
import { Card, CardContent } from '../../Components/Ui/card';
import { Select } from '../../Components/Ui/Select';
import { Button } from '../../Components/Ui/button';
import { CalendarIcon } from '../../Components/Icons/CalendarIcon';

interface Department {
  id: string;
  name: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  fee: string;
  education: string;
  address: string;
  availability: Record<
    string,
    {
      morning: string;
      afternoon: string;
      evening: string;
    }
  >;
}

const BookAppointment: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const dummyDepartments: Department[] = [
      { id: "1", name: "General Medicine" },
      { id: "2", name: "Cardiology" },
    ];
    setDepartments(dummyDepartments);
  }, []);

  useEffect(() => {
    const dummyDoctors: Doctor[] = [
      {
        id: "d1",
        name: "Dr. Vivekanand Swami",
        specialty: "General Medicine",
        experience: "5 Yrs Exp",
        fee: "500₹ Fee",
        education: "MBBS, MD",
        address: "Baner, Pune, MH",
        availability: {
          Monday: {
            morning: "07:00 AM – 11:59 AM",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "5:00 PM – 8:59 PM",
          },
          Tuesday: {
            morning: "Not Available",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "5:00 PM – 8:59 PM",
          },
          Wednesday: {
            morning: "Not Available",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "Not Available",
          },
          Thursday: {
            morning: "Not Available",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "5:00 PM – 8:59 PM",
          },
          Friday: {
            morning: "Not Available",
            afternoon: "Not Available",
            evening: "5:00 PM – 8:59 PM",
          },
          Saturday: {
            morning: "Not Available",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "5:00 PM – 8:59 PM",
          },
          Sunday: {
            morning: "07:00 AM – 11:59 AM",
            afternoon: "12:00 PM – 4:59 PM",
            evening: "5:00 PM – 8:59 PM",
          },
        },
      },
    ];
    setDoctors(dummyDoctors);
  }, []);

  useEffect(() => {
    const doctor = doctors.find((doc) => doc.id === selectedDoctorId);
    setSelectedDoctor(doctor || null);
  }, [selectedDoctorId, doctors]);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Card className="p-6 max-w-6xl mx-auto mt-6 shadow-md">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Appointment
        </h2>

        <div className="grid grid-cols-3 gap-4 items-end mb-6">
          <Select
            label="Choose Department Name"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </Select>

          <Select
            label="Choose Doctor Name"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            disabled={!selectedDept}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </Select>

          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" /> Select Date
          </Button>
        </div>

        {selectedDoctor && (
          <div className="grid grid-cols-5 gap-6 mt-8">
            <div className="col-span-1">
              <img
                src="/doctor-avatar.png"
                alt="Doctor Avatar"
                className="rounded-full w-24 h-24 mb-4"
              />
              <h3 className="text-lg font-bold mb-1">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              <p className="text-sm text-gray-600 mt-2">
                {selectedDoctor.experience}
              </p>
              <p className="text-sm text-gray-600">{selectedDoctor.fee}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.education}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.address}</p>
            </div>

            <div className="col-span-4">
              <h4 className="text-md font-semibold mb-2">
                Weekly Availability Plan
              </h4>
              <table className="w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Day</th>
                    <th className="border px-2 py-1">Morning</th>
                    <th className="border px-2 py-1">Afternoon</th>
                    <th className="border px-2 py-1">Evening</th>
                  </tr>
                </thead>
                <tbody>
                  {weekDays.map((day) => (
                    <tr key={day}>
                      <td className="border px-2 py-1 font-medium">{day}</td>
                      <td
                        className={`border px-2 py-1 text-center ${
                          selectedDoctor.availability[day].morning ===
                          "Not Available"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {selectedDoctor.availability[day].morning}
                      </td>
                      <td
                        className={`border px-2 py-1 text-center ${
                          selectedDoctor.availability[day].afternoon ===
                          "Not Available"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {selectedDoctor.availability[day].afternoon}
                      </td>
                      <td
                        className={`border px-2 py-1 text-center ${
                          selectedDoctor.availability[day].evening ===
                          "Not Available"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {selectedDoctor.availability[day].evening}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookAppointment;
