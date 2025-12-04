import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { CashCounterService } from '../../../Services/CashCounterService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface CashCounter {
  cashCounterId: number;
  counterName: string;
  description?: string;
  systemName?: string;
  tokenRequired: boolean;
  counterType: string;
  createdAt?: string;
}

const PAGE_SIZE = 10;

export default function CashCounterGrid() {
  const [cashCounters, setCashCounters] = useState<CashCounter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [counterToDelete, setCounterToDelete] = useState<CashCounter | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await CashCounterService.getAllCashCounters();
      const allCounters = res.cashCounters || [];
      
      // Filter by search
      const filteredCounters = search 
        ? allCounters.filter((counter: CashCounter) =>
            counter.counterName?.toLowerCase().includes(search.toLowerCase()) ||
            counter.counterType?.toLowerCase().includes(search.toLowerCase()) ||
            counter.systemName?.toLowerCase().includes(search.toLowerCase())
          )
        : allCounters;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedCounters = filteredCounters.slice(startIndex, endIndex);
      
      setCashCounters(paginatedCounters);
      setTotalPages(Math.ceil(filteredCounters.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load cash counters');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (counter: CashCounter) => {
    try {
      await CashCounterService.deleteCashCounter(counter.cashCounterId);
      successNotification(`${counter.counterName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete cash counter');
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Cash Counter Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/cash-counters/add')}
          >
            Add Cash Counter
          </Button>
        </div>

        <DataTable<CashCounter>
          data={cashCounters}
          columns={[
            { key: 'counterName', label: 'Counter Name' },
            { key: 'counterType', label: 'Counter Type', render: (row) => row.counterType?.replace('_', ' ') },
            { key: 'systemName', label: 'System Name' },
            { key: 'tokenRequired', label: 'Token Required', render: (row) => row.tokenRequired ? 'Yes' : 'No' },
            { key: 'description', label: 'Description' },
          ]}
          onView={(c) => navigate(`/admin/mastersettings/cash-counters/view/${c.cashCounterId}`)}
          onEdit={(c) => navigate(`/admin/mastersettings/cash-counters/edit/${c.cashCounterId}`)}
          onDelete={(c) => {
            setCounterToDelete(c);
            setDeleteConfirmOpen(true);
          }}
          onAdd={() => navigate('/admin/mastersettings/cash-counters/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (counterToDelete) {
            await handleDelete(counterToDelete);
          }
        }}
        title="Delete Cash Counter"
        message={`Are you sure you want to delete ${counterToDelete?.counterName} cash counter? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}