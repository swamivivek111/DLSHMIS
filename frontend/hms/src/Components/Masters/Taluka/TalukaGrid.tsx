import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Taluka } from '../../Types/Taluka';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteTaluka, getTaluka } from '../../../Services/TalukaServices';

const PAGE_SIZE = 10;

export default function TalukaGrid() {
  const [talukas, setTalukas] = useState<Taluka[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTaluka(page, PAGE_SIZE, search);
      setTalukas(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load talukas');
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
          <h2 className="text-2xl font-bold text-gray-800">Taluka Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/talukas/add')}
          >
            Add Taluka
          </Button>
        </div>

        <DataTable<Taluka>
      data={talukas}
      columns={[
        { key: 'talukaName', label: 'Taluka Name' },
        { key: 'talukaCode', label: 'Taluka Code' },
        { 
          key: 'active', 
          label: 'Status',
          render: (taluka: Taluka) => (
            <Badge color={taluka.active ? 'green' : 'red'} size="sm">
              {taluka.active ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/talukas/view/${d.talukaId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/talukas/edit/${d.talukaId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.talukaName+' taluka?')) {
          await deleteTaluka(d.talukaId);
          successNotification(d.talukaName+' taluka deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/talukas/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}
 