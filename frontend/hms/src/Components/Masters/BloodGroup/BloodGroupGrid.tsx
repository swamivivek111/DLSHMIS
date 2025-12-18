import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { BloodGroup } from '../../Types/BloodGroup';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteBloodGroup, getBloodGroup } from '../../../Services/BloodGroupServices';

const PAGE_SIZE = 10;

export default function BloodGroupGrid() {
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getBloodGroup(page, PAGE_SIZE, search);
      setBloodGroups(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load bloodGroups');
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
          <h2 className="text-2xl font-bold text-gray-800">Blood Group Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/bloodGroups/add')}
          >
            Add Blood Group
          </Button>
        </div>

        <DataTable<BloodGroup>
          data={bloodGroups}
          columns={[
            { key: 'bloodGroup', label: 'Blood Group' },
            { key: 'active', label: 'Status', render: (value) => value ? 'Active' : 'Inactive' },
            { key: 'createdBy', label: 'Created By' },
          ]}
          onView={(d) => navigate(`/admin/mastersettings/bloodGroups/view/${d.bloodGroupId}`)}
          onEdit={(d) => navigate(`/admin/mastersettings/bloodGroups/edit/${d.bloodGroupId}`)}
          onDelete={async (d) => {
            if (confirm('Delete '+d.bloodGroup+' bloodGroup?')) {
              await deleteBloodGroup(d.bloodGroupId);
              successNotification(d.bloodGroup+' bloodGroup deleted successfully!');
              fetchData();
            }
          }}
          onAdd={() => navigate('/admin/mastersettings/bloodGroups/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
    </motion.div>
  );
}