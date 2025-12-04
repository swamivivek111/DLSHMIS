import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { State } from '../../Types/State';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteState, getState } from '../../../Services/StateServices';

const PAGE_SIZE = 10;

export default function StateGrid() {
  const [states, setStates] = useState<State[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getState(page, PAGE_SIZE, search);
      setStates(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load states');
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
          <h2 className="text-2xl font-bold text-gray-800">State Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/states/add')}
          >
            Add State
          </Button>
        </div>

        <DataTable<State>
      data={states}
      columns={[
        { key: 'stateName', label: 'State Name' },
        { key: 'stateCode', label: 'State Code' },
        { key: 'countryName', label: 'Country Name'},
        { 
          key: 'active', 
          label: 'Status',
          render: (state: State) => (
            <Badge color={state.active ? 'green' : 'red'} size="sm">
              {state.active ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/states/view/${d.stateId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/states/edit/${d.stateId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.stateName+' state?')) {
          await deleteState(d.stateId);
          successNotification(d.stateName+' state deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/states/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
      </div>
    </motion.div>
  );
}
