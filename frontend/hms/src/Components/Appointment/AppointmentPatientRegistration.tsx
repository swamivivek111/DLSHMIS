import React, { useState } from 'react';
import { DoctorInfo } from '../Types/appointment';



interface Props {
  doctor: DoctorInfo;
  selectedDate: string;
  selectedSession: string;
  selectedSlot: string;
  onCancel: () => void; 
  onSave: (patientData: any) => void; 
}

const AppointmentPatientRegistration: React.FC<Props> = ({
  doctor,
  selectedDate,
  selectedSession,
  selectedSlot,
  onCancel,
  onSave, 
}) => {
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    age: '',
    healthId: '',
    mobile: '',
    address: '',
  });




  
  // ✅ Add this handler INSIDE the component
  const handleSubmit = () => {
    if (!formData.firstName || !formData.mobile) {
      alert('Please fill in required fields: First Name and Mobile.');
      return;
    }

    // Log or send data
    console.log('Saving Patient Data:', {
      ...formData,
      doctorName: doctor.name,
      date: selectedDate,
      session: selectedSession,
      slot: selectedSlot,
      
    });

    onSave({ ...formData, doctorName: doctor.name, date: selectedDate, session: selectedSession, slot: selectedSlot });

  };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-6 mt-6 max-w-4xl mx-auto">
      <h2 className="text-center text-lg font-semibold text-white bg-[#1e2a49] py-3 rounded-t-md">
        Appointment Patient Registration
      </h2>

      {/* Doctor Info and Slot Details */}
      <div className="bg-gray-50 p-4 border rounded mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src="/doctor-avatar.png"
            alt="Doctor"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-600">{doctor.address}</p>
            <p className="text-sm text-gray-600">{doctor.experience} Years Exp</p>
          </div>
        </div>

        {/* Slot Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm">
          <div>
            <span className="font-semibold">Consultant: </span>
            {doctor.name}
          </div>
          <div>
            <span className="font-semibold">Date: </span>
            {selectedDate}
          </div>
          <div>
            <span className="font-semibold">Daypart: </span>
            {selectedSession.charAt(0).toUpperCase() + selectedSession.slice(1)}
          </div>
          <div>
            <span className="font-semibold">Time: </span>
            {selectedSlot}
          </div>
        </div>
      </div>

      {/* Patient Form */}
      <div className="space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Existing PRN No, Patient Name, Mobile No., Aadhaar"
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Patient Demographics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            name="prefix"
            placeholder="Prefix"
            value={formData.prefix}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="healthId"
            placeholder="Health ID"
            value={formData.healthId}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded col-span-1 sm:col-span-2"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded col-span-1 sm:col-span-3"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
            Cancel
            </button>

         <button
      onClick={handleSubmit}
  className="px-6 py-2 bg-[#1e2a49] text-white rounded hover:bg-[#1a2440]"
>
  Save
</button>

        </div>
      </div>
    </div>
  );
};

export default AppointmentPatientRegistration;
