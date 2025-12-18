import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceSubGroupService } from '../../../Services/ServiceSubGroupService';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ServiceSubGroup {
  subGroupId: number;
  groupId: number;
  subGroupName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ServiceSubGroupGrid() {
  const [serviceSubGroups, setServiceSubGroups] = useState<ServiceSubGroup[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceSubGroupToDelete, setServiceSubGroupToDelete] = useState<ServiceSubGroup | null>(null);
  const [serviceGroups, setServiceGroups] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const loadServiceGroups = async () => {
    try {
      const groups = await ServiceGroupService.getAllServiceGroups();
      const groupMap: { [key: number]: string } = {};
      groups.forEach((group: any) => {
        groupMap[group.groupId] = group.groupName;
      });
      setServiceGroups(groupMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const fetchData = async () => {
    try {
      const allServiceSubGroups = await ServiceSubGroupService.getAllServiceSubGroups();
      
      // Filter by search
      const filteredServiceSubGroups = search 
        ? allServiceSubGroups.filter((serviceSubGroup: ServiceSubGroup) =>
            serviceSubGroup.subGroupName?.toLowerCase().includes(search.toLowerCase())
          )
        : allServiceSubGroups;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedServiceSubGroups = filteredServiceSubGroups.slice(startIndex, endIndex);
      
      setServiceSubGroups(paginatedServiceSubGroups);
      setTotalPages(Math.ceil(filteredServiceSubGroups.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load service sub groups');
    }
  };

  useEffect(() => {
    loadServiceGroups();
    fetchData();
  }, [page, search]);

  const handleDelete = async (serviceSubGroup: ServiceSubGroup) => {
    try {
      await ServiceSubGroupService.deleteServiceSubGroup(serviceSubGroup.subGroupId);
      successNotification(`${serviceSubGroup.subGroupName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete service sub group');
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
          <h2 className="text-2xl font-bold text-gray-800">Service Sub Group Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/service-sub-groups/add')}
          >
            Add Service Sub Group
          </Button>
        </div>

        <DataTable<ServiceSubGroup>
        data={serviceSubGroups}
        columns={[
          { key: 'groupId', label: 'Group', render: (row) => serviceGroups[row.groupId] || `ID: ${row.groupId}` },
          { key: 'subGroupName', label: 'Sub Group Name' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(s) => navigate(`/admin/mastersettings/service-sub-groups/view/${s.subGroupId}`)}
        onEdit={(s) => navigate(`/admin/mastersettings/service-sub-groups/edit/${s.subGroupId}`)}
        onDelete={(s) => {
          setServiceSubGroupToDelete(s);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/service-sub-groups/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (serviceSubGroupToDelete) {
            await handleDelete(serviceSubGroupToDelete);
          }
        }}
        title="Delete Service Sub Group"
        message={`Are you sure you want to delete ${serviceSubGroupToDelete?.subGroupName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}