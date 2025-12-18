import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { District } from '../../Types/District';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDistrict, getDistrict } from '../../../Services/DistrictServices';

const PAGE_SIZE = 10;

export default function DistrictGrid() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDistrict(page, PAGE_SIZE, search);
      setDistricts(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load districts');
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
          <h2 className="text-2xl font-bold text-gray-800">District Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/districts/add')}
          >
            Add District
          </Button>
        </div>

        <DataTable<District>
      data={districts}
      columns={[
        { key: 'districtName', label: 'District Name' },
        { key: 'districtCode', label: 'District Code' },
        { 
          key: 'active', 
          label: 'Status',
          render: (district: District) => (
            <Badge color={district.active ? 'green' : 'red'} size="sm">
              {district.active ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/districts/view/${d.districtId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/districts/edit/${d.districtId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.districtName+' district?')) {
          await deleteDistrict(d.districtId);
          successNotification(d.districtName+' district deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/districts/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}
 