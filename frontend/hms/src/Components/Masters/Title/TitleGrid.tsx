import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { TitleMaster } from '../../Types/Title';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteTitle, getTitle } from '../../../Services/TitleServices';

const PAGE_SIZE = 10;

export default function TitleGrid() {
  const [titles, setTitles] = useState<TitleMaster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTitle(page, PAGE_SIZE, search);
      setTitles(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load titles');
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
          <h2 className="text-2xl font-bold text-gray-800">Title Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/titles/add')}
          >
            Add Title
          </Button>
        </div>

        <DataTable<TitleMaster>
      data={titles}
      columns={[
        { key: 'titleName', label: 'Title Name' },
        { key: 'gender', label: 'Gender' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/titles/view/${d.titleId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/titles/edit/${d.titleId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.titleName+' title?')) {
          await deleteTitle(d.titleId);
          successNotification(d.titleName+' title deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/titles/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}
 