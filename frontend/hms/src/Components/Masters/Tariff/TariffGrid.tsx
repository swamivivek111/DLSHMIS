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
  serviceName: string;
  serviceCode: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  serviceCategory: string;
  department: string;
  unit: string;
  taxPercentage?: number;
  isActive: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
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
            tariff.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
            tariff.serviceCode?.toLowerCase().includes(search.toLowerCase()) ||
            tariff.serviceCategory?.toLowerCase().includes(search.toLowerCase()) ||
            tariff.department?.toLowerCase().includes(search.toLowerCase())
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
      successNotification(`${tariff.serviceName} deleted successfully!`);
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
          <h2 className="text-2xl font-bold text-gray-800">Tariff Management</h2>
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
          { key: 'serviceName', label: 'Service Name' },
          { key: 'serviceCode', label: 'Service Code' },
          { key: 'serviceCategory', label: 'Category', render: (row) => row.serviceCategory?.replace('_', ' ') },
          { key: 'department', label: 'Department', render: (row) => row.department?.replace('_', ' ') },
          { key: 'basePrice', label: 'Base Price', render: (row) => `₹${row.basePrice?.toFixed(2)}` },
          { key: 'unit', label: 'Unit', render: (row) => row.unit?.replace('_', ' ') },
          { key: 'isActive', label: 'Status', render: (row) => row.isActive ? 'Active' : 'Inactive' },
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
        message={`Are you sure you want to delete ${tariffToDelete?.serviceName} tariff? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}