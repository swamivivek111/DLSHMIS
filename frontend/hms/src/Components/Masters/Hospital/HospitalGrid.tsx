import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Hospital } from '../../Types/Hospital';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteHospital, getHospital } from '../../../Services/HospitalServices';

const PAGE_SIZE = 10;

export default function HospitalGrid() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getHospital(page, PAGE_SIZE, search);
      setHospitals(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error('Error loading hospitals:', error);
      setHospitals([]);
      setTotalPages(1);
      errorNotification('Failed to load hospitals');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Hospital Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/hospitals/add')}
          >
            Add Hospital
          </Button>
        </div>

        <DataTable<Hospital>
      data={hospitals}
      columns={[
        { key: 'hospitalId', label: 'Hospital ID' },
        { key: 'hospitalCode', label: 'Hospital Code' },
        { key: 'hospitalName', label: 'Hospital Name' },
        { key: 'hospitalType', label: 'Type' },
        { key: 'city', label: 'City' },
        { key: 'phoneNumber', label: 'Phone' },
        { 
          key: 'active', 
          label: 'Status',
          render: (hospital: Hospital) => (
            <Badge color={hospital.active ? 'green' : 'red'} size="sm">
              {hospital.active ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/hospitals/view/${d.hospitalId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/hospitals/edit/${d.hospitalId}`)}
      onDelete={async (d) => {
        if (confirm('Delete ' + d.hospitalName + ' hospital?')) {
          await deleteHospital(d.hospitalId);
          successNotification(d.hospitalName + ' hospital deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/hospitals/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}