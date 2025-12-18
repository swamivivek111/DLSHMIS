import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceMasterService } from '../../../Services/ServiceMasterService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ServiceMaster {
  tariffId: number;
  serviceName: string;
  displayName: string;
  serviceType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ServiceMasterGrid() {
  const [services, setServices] = useState<ServiceMaster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceMaster | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allServices = await ServiceMasterService.getAllServices();
      
      // Filter by search
      const filteredServices = search 
        ? allServices.filter((service: ServiceMaster) =>
            service.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
            service.displayName?.toLowerCase().includes(search.toLowerCase())
          )
        : allServices;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedServices = filteredServices.slice(startIndex, endIndex);
      
      setServices(paginatedServices);
      setTotalPages(Math.ceil(filteredServices.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load services');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (service: ServiceMaster) => {
    try {
      await ServiceMasterService.deleteService(service.tariffId);
      successNotification(`${service.serviceName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete service');
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
          <h2 className="text-2xl font-bold text-gray-800">Service Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/services/add')}
          >
            Add Service
          </Button>
        </div>

        <DataTable<ServiceMaster>
        data={services}
        columns={[
          { key: 'serviceName', label: 'Service Name' },
          { key: 'displayName', label: 'Display Name' },
          { key: 'serviceType', label: 'Service Type' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(s) => navigate(`/admin/mastersettings/services/view/${s.tariffId}`)}
        onEdit={(s) => navigate(`/admin/mastersettings/services/edit/${s.tariffId}`)}
        onDelete={(s) => {
          setServiceToDelete(s);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/services/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (serviceToDelete) {
            await handleDelete(serviceToDelete);
          }
        }}
        title="Delete Service"
        message={`Are you sure you want to delete ${serviceToDelete?.serviceName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}