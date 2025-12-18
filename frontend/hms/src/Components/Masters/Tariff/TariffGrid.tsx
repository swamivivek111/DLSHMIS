import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { TariffService } from '../../../Services/TariffService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface Tariff {
  tariffId: number;
  tariffName: string;
  tariffCode: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const PAGE_SIZE = 10;

export default function TariffGrid() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [tariffToDelete, setTariffToDelete] = useState<Tariff | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await TariffService.getAllTariffs();
      const allTariffs = res.tariffs || [];
      
      // Filter by search
      const filteredTariffs = search 
        ? allTariffs.filter((tariff: Tariff) =>
            tariff.tariffName?.toLowerCase().includes(search.toLowerCase()) ||
            tariff.tariffCode?.toLowerCase().includes(search.toLowerCase()) ||
            tariff.description?.toLowerCase().includes(search.toLowerCase())
          )
        : allTariffs;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedTariffs = filteredTariffs.slice(startIndex, endIndex);
      
      setTariffs(paginatedTariffs);
      setTotalPages(Math.ceil(filteredTariffs.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load tariffs');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (tariff: Tariff) => {
    try {
      await TariffService.deleteTariff(tariff.tariffId);
      successNotification(`${tariff.tariffName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete tariff');
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
          <h2 className="text-2xl font-bold text-gray-800">Tariff Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/tariffs/add')}
          >
            Add Tariff
          </Button>
        </div>

        <DataTable<Tariff>
        data={tariffs}
        columns={[
          { key: 'tariffName', label: 'Tariff Name' },
          { key: 'tariffCode', label: 'Tariff Code' },
          { key: 'description', label: 'Description' },
          { key: 'createdAt', label: 'Created At', render: (value: string) => value ? new Date(value).toLocaleDateString() : 'N/A' },
        ]}
        onView={(t) => navigate(`/admin/mastersettings/tariffs/view/${t.tariffId}`)}
        onEdit={(t) => navigate(`/admin/mastersettings/tariffs/edit/${t.tariffId}`)}
        onDelete={(t) => {
          setTariffToDelete(t);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/tariffs/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (tariffToDelete) {
            await handleDelete(tariffToDelete);
          }
        }}
        title="Delete Tariff"
        message={`Are you sure you want to delete ${tariffToDelete?.tariffName} tariff? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}