import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { WardGroupService } from '../../../Services/WardGroupService';

interface WardGroup {
  wardGroupId: number;
  wardGroupName: string;
  wardGroupCategory: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function WardGroupGrid() {
  const [wardGroups, setWardGroups] = useState<WardGroup[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allWardGroups = await WardGroupService.getAllWardGroups();
      
      // Filter by search
      const filteredWardGroups = search 
        ? allWardGroups.filter((wardGroup: WardGroup) =>
            wardGroup.wardGroupName?.toLowerCase().includes(search.toLowerCase())
          )
        : allWardGroups;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedWardGroups = filteredWardGroups.slice(startIndex, endIndex);
      
      setWardGroups(paginatedWardGroups);
      setTotalPages(Math.ceil(filteredWardGroups.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load ward groups');
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
          <h2 className="text-2xl font-bold text-gray-800">Ward Group Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/ward-groups/add')}
          >
            Add Ward Group
          </Button>
        </div>

        <DataTable<WardGroup>
          data={wardGroups}
          columns={[
            { key: 'wardGroupName', label: 'Ward Group Name' },
            { key: 'wardGroupCategory', label: 'Category' },
            { 
              key: 'isActive', 
              label: 'Status',
              render: (value: boolean) => (
                <Badge color={value ? 'green' : 'red'}>
                  {value ? 'Active' : 'Inactive'}
                </Badge>
              )
            },
            { key: 'createdAt', label: 'Created At', render: (value: string) => new Date(value).toLocaleDateString() },
            { key: 'updatedAt', label: 'Updated At', render: (value: string) => value ? new Date(value).toLocaleDateString() : 'N/A' },
          ]}
          onView={(w) => w?.wardGroupId && navigate(`/admin/mastersettings/ward-groups/view/${w.wardGroupId}`)}
          onEdit={(w) => w?.wardGroupId && navigate(`/admin/mastersettings/ward-groups/edit/${w.wardGroupId}`)}
          onDelete={async (w) => {
            if (w?.wardGroupId && confirm(`Delete ${w.wardGroupName}?`)) {
              await WardGroupService.deleteWardGroup(w.wardGroupId);
              successNotification(`${w.wardGroupName} deleted successfully!`);
              fetchData();
            }
          }}
          onAdd={() => navigate('/admin/mastersettings/ward-groups/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
    </motion.div>
  );
}