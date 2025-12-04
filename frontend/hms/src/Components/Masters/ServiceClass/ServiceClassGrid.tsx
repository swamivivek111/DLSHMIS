import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceClassService } from '../../../Services/ServiceClassService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ServiceClass {
  serviceClassId: number;
  serviceClassName: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ServiceClassGrid() {
  const [serviceClasses, setServiceClasses] = useState<ServiceClass[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceClassToDelete, setServiceClassToDelete] = useState<ServiceClass | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allServiceClasses = await ServiceClassService.getAllServiceClasses();
      
      // Filter by search
      const filteredServiceClasses = search 
        ? allServiceClasses.filter((serviceClass: ServiceClass) =>
            serviceClass.serviceClassName?.toLowerCase().includes(search.toLowerCase())
          )
        : allServiceClasses;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedServiceClasses = filteredServiceClasses.slice(startIndex, endIndex);
      
      setServiceClasses(paginatedServiceClasses);
      setTotalPages(Math.ceil(filteredServiceClasses.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load service classes');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (serviceClass: ServiceClass) => {
    try {
      await ServiceClassService.deleteServiceClass(serviceClass.serviceClassId);
      successNotification(`${serviceClass.serviceClassName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete service class');
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
          <h2 className="text-2xl font-bold text-gray-800">Service Class Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/service-classes/add')}
          >
            Add Service Class
          </Button>
        </div>

        <DataTable<ServiceClass>
        data={serviceClasses}
        columns={[
          { key: 'serviceClassName', label: 'Service Class Name' },
          { key: 'isActive', label: 'Status', render: (row) => row.isActive ? 'Active' : 'Inactive' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(s) => navigate(`/admin/mastersettings/service-classes/view/${s.serviceClassId}`)}
        onEdit={(s) => navigate(`/admin/mastersettings/service-classes/edit/${s.serviceClassId}`)}
        onDelete={(s) => {
          setServiceClassToDelete(s);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/service-classes/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (serviceClassToDelete) {
            await handleDelete(serviceClassToDelete);
          }
        }}
        title="Delete Service Class"
        message={`Are you sure you want to delete ${serviceClassToDelete?.serviceClassName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}