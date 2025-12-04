import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTable from '../DataTable/DataTable';
import { getAllRadiologyOrders, completeRadiologyOrder } from '../../Services/RadiologyServices';

const RadiologyOrderGrid: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'patientId', label: 'Patient ID' },
    { key: 'doctorId', label: 'Doctor ID' },
    { key: 'testName', label: 'Test Name' },
    { key: 'bodyPart', label: 'Body Part' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' }
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAllRadiologyOrders();
      setOrders(response || []);
    } catch (error) {
      console.error('Error fetching radiology orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = async (id: number) => {
    try {
      await completeRadiologyOrder(id);
      fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Radiology Orders</h2>
        <DataTable
          data={orders}
          columns={[
            { key: 'orderId', label: 'Order ID' },
            { key: 'patientId', label: 'Patient ID' },
            { key: 'doctorId', label: 'Doctor ID' },
            { key: 'testName', label: 'Test Name' },
            { key: 'bodyPart', label: 'Body Part' },
            { key: 'status', label: 'Status' },
            { key: 'priority', label: 'Priority' }
          ]}
          loading={loading}
          onEdit={(item) => console.log('Edit:', item)}
          onDelete={(id) => handleComplete(id)}
          onView={(item) => console.log('View:', item)}
        />
      </div>
    </motion.div>
  );
};

export default RadiologyOrderGrid;