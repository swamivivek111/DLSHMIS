import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTable from '../DataTable/DataTable';
import { getOPDVisits, deleteOPDVisit } from '../../Services/OPDServices';

const OPDVisitGrid: React.FC = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: 'visitId', label: 'Visit ID' },
    { key: 'patientId', label: 'Patient ID' },
    { key: 'doctorId', label: 'Doctor ID' },
    { key: 'visitDate', label: 'Visit Date' },
    { key: 'status', label: 'Status' },
    { key: 'consultationFee', label: 'Fee' }
  ];

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const response = await getOPDVisits();
      setVisits(response.visits || []);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteOPDVisit(id);
      fetchVisits();
    } catch (error) {
      console.error('Error deleting visit:', error);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">OPD Visits</h2>
        <DataTable
          data={visits}
          columns={[
            { key: 'visitId', label: 'Visit ID' },
            { key: 'patientId', label: 'Patient ID' },
            { key: 'doctorId', label: 'Doctor ID' },
            { key: 'visitDate', label: 'Visit Date' },
            { key: 'status', label: 'Status' },
            { key: 'consultationFee', label: 'Fee' }
          ]}
          loading={loading}
          onEdit={(item) => console.log('Edit:', item)}
          onDelete={(id) => console.log('Delete:', id)}
          onView={(item) => console.log('View:', item)}
        />
      </div>
    </motion.div>
  );
};

export default OPDVisitGrid;