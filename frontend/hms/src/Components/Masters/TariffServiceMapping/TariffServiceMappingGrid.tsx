import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { TariffServiceMappingService } from '../../../Services/TariffServiceMappingService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface TariffServiceMapping {
  id: number;
  defaultTariffName: string;
  serviceName: string;
  corporateServiceName: string;
  baseRate: number;
  companyTariffRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function TariffServiceMappingGrid() {
  const [mappings, setMappings] = useState<TariffServiceMapping[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [mappingToDelete, setMappingToDelete] = useState<TariffServiceMapping | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allMappings = await TariffServiceMappingService.getAllTariffServiceMappings();
      
      // Filter by search
      const filteredMappings = search 
        ? allMappings.filter((mapping: TariffServiceMapping) =>
            mapping.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
            mapping.corporateServiceName?.toLowerCase().includes(search.toLowerCase())
          )
        : allMappings;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedMappings = filteredMappings.slice(startIndex, endIndex);
      
      setMappings(paginatedMappings);
      setTotalPages(Math.ceil(filteredMappings.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load tariff service mappings');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (mapping: TariffServiceMapping) => {
    try {
      await TariffServiceMappingService.deleteTariffServiceMapping(mapping.id);
      successNotification(`${mapping.serviceName} mapping deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete tariff service mapping');
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
          <h2 className="text-2xl font-bold text-gray-800">Tariff Service Mapping Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/tariff-service-mappings/add')}
          >
            Add Mapping
          </Button>
        </div>

        <DataTable<TariffServiceMapping>
        data={mappings}
        columns={[
          { key: 'defaultTariffName', label: 'Default Tariff' },
          { key: 'serviceName', label: 'Service Name' },
          { key: 'corporateServiceName', label: 'Corporate Service Name' },
          { key: 'baseRate', label: 'Base Rate', render: (row) => row.baseRate || 0 },
          { key: 'companyTariffRate', label: 'Company Rate', render: (row) => row.companyTariffRate || 0 },
          { key: 'isActive', label: 'Status', render: (row) => row.isActive ? 'Active' : 'Inactive' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
        ]}
        onView={(m) => navigate(`/admin/mastersettings/tariff-service-mappings/view/${m.id}`)}
        onEdit={(m) => navigate(`/admin/mastersettings/tariff-service-mappings/edit/${m.id}`)}
        onDelete={(m) => {
          setMappingToDelete(m);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/tariff-service-mappings/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (mappingToDelete) {
            await handleDelete(mappingToDelete);
          }
        }}
        title="Delete Tariff Service Mapping"
        message={`Are you sure you want to delete ${mappingToDelete?.serviceName} mapping? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}