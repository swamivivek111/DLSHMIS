import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Doctor } from '../../Types/Doctor';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDoctor, getDoctor, syncDoctorToUser } from '../../../Services/DoctorServices';

const PAGE_SIZE = 10;

export default function DoctorGrid() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDoctor(page, PAGE_SIZE, search);
      setDoctors(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load doctors');
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
          <h2 className="text-2xl font-bold text-gray-800">Doctor Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/doctors/add')}
          >
            Add Doctor
          </Button>
        </div>

        <DataTable<Doctor>
      data={doctors}
      columns={[
        { key: 'name', label: 'Doctor' },
        { key: 'code', label: 'Code' },
        { key: 'specialization', label: 'Specialization' },
        { key: 'contactNumber', label: 'Contact' }, 
        { key: 'emailId', label: 'Email' },
        { key: 'firstConsultationFees', label: 'Consultation Fees' },
        { key: 'followUpFees', label: 'Follow-up Fees' },
        { key: 'joiningDate', label: 'Joining Date' },
        { 
          key: 'active', 
          label: 'Status',
          render: (value: boolean) => (
            <Badge color={value ? 'green' : 'red'}>
              {value ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      onView={(d) => d?.doctorId && navigate(`/admin/mastersettings/doctors/view/${d.doctorId}`)}
      onEdit={(d) => d?.doctorId && navigate(`/admin/mastersettings/doctors/edit/${d.doctorId}`)}
      onDelete={async (d) => {
        if (d?.doctorId && confirm(`Delete ${d.name}?`)) {
          await deleteDoctor(d.doctorId);
          successNotification(`${d.name} deleted successfully!`);
          fetchData();
        }
      }}
      onSync={async (d) => {
        try {
          if (d?.doctorId) {
            await syncDoctorToUser(d.doctorId);
            successNotification(`${d.name} synced to user management successfully!`);
          }
        } catch (error) {
          errorNotification('Failed to sync doctor to user management');
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/doctors/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}
