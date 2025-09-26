import React from 'react';
import { DoctorInfo } from '../Types/appointment';

interface Props {
  doctor: DoctorInfo;
}

const DoctorProfile: React.FC<Props> = ({ doctor }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Doctor Image and Name */}
      <div className="flex-shrink-0 text-center md:text-left">
        image: 'https://via.placeholder.com/100x100.png?text=Dr+Vivek'

        <h3 className="text-lg font-semibold mt-3">{doctor.name}</h3>
      </div>

      {/* Doctor Info */}
      <div className="grid gap-2 text-sm">
        <p>
          <span className="font-medium">Specialty:</span>{' '}
          <span className="text-gray-700">{doctor.specialty}</span>
        </p>
        <p>
          <span className="font-medium">Experience:</span>{' '}
          <span className="text-gray-700">{doctor.experience}</span>
        </p>
        <p>
          <span className="font-medium">Fee:</span>{' '}
          <span className="text-gray-700">{doctor.fee}</span>
        </p>
        <p>
          <span className="font-medium">Education:</span>{' '}
          <span className="text-gray-700">{doctor.education}</span>
        </p>
        <p>
          <span className="font-medium">Address:</span>{' '}
          <span className="text-gray-700">{doctor.address}</span>
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
