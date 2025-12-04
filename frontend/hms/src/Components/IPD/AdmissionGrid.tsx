import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTable from '../DataTable/DataTable';
import { getAllAdmissions, dischargePatient } from '../../Services/IPDServices';

const AdmissionGrid: React.FC = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: 'admissionId', label: 'Admission ID' },
    { key: 'patientId', label: 'Patient ID' },
    { key: 'doctorId', label: 'Doctor ID' },
    { key: 'admissionDate', label: 'Admission Date' },
    { key: 'status', label: 'Status' },
    { key: 'reasonForAdmission', label: 'Reason' }
  ];

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const response = await getAllAdmissions();
      setAdmissions(response || []);
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDischarge = async (id: number) => {
    try {
      await dischargePatient(id);
      fetchAdmissions();
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">IPD Admissions</h2>
        <DataTable
          data={admissions}
          columns={columns}
          loading={loading}
          onEdit={(item) => console.log('Edit:', item)}
          onDelete={handleDischarge}
          onView={(item) => console.log('View:', item)}
          addRoute="/admin/ipd/admissions/add"
          editRoute="/admin/ipd/admissions/edit"
          viewRoute="/admin/ipd/admissions/view"
        />
      </div>
    </motion.div>
  );
};

export default AdmissionGrid;