import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceTypeService } from '../../../Services/ServiceTypeService';
import { ServiceClassService } from '../../../Services/ServiceClassService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ServiceType {
  serviceTypeId: number;
  serviceClassName: number;
  serviceClassTypeName: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ServiceTypeGrid() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<ServiceType | null>(null);
  const [serviceClasses, setServiceClasses] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const loadServiceClasses = async () => {
    try {
      const classes = await ServiceClassService.getAllServiceClasses();
      const classMap: { [key: number]: string } = {};
      classes.forEach((cls: any) => {
        classMap[cls.serviceClassId] = cls.serviceClassName;
      });
      setServiceClasses(classMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const fetchData = async () => {
    try {
      const allTypes = await ServiceTypeService.getAllServiceTypes();
      
      // Filter by search
      const filteredTypes = search 
        ? allTypes.filter((type: ServiceType) =>
            type.serviceClassTypeName?.toLowerCase().includes(search.toLowerCase())
          )
        : allTypes;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedTypes = filteredTypes.slice(startIndex, endIndex);
      
      setServiceTypes(paginatedTypes);
      setTotalPages(Math.ceil(filteredTypes.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load service types');
    }
  };

  useEffect(() => {
    loadServiceClasses();
    fetchData();
  }, [page, search]);

  const handleDelete = async (type: ServiceType) => {
    try {
      await ServiceTypeService.deleteServiceType(type.serviceTypeId);
      successNotification(`${type.serviceClassTypeName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete service type');
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
          <h2 className="text-2xl font-bold text-gray-800">Service Type Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/service-types/add')}
          >
            Add Service Type
          </Button>
        </div>

        <DataTable<ServiceType>
        data={serviceTypes}
        columns={[
          { key: 'serviceClassName', label: 'Service Class', render: (row) => serviceClasses[row.serviceClassName] || `ID: ${row.serviceClassName}` },
          { key: 'serviceClassTypeName', label: 'Service Class Type Name' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(t) => navigate(`/admin/mastersettings/service-types/view/${t.serviceTypeId}`)}
        onEdit={(t) => navigate(`/admin/mastersettings/service-types/edit/${t.serviceTypeId}`)}
        onDelete={(t) => {
          setTypeToDelete(t);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/service-types/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (typeToDelete) {
            await handleDelete(typeToDelete);
          }
        }}
        title="Delete Service Type"
        message={`Are you sure you want to delete ${typeToDelete?.serviceClassTypeName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}