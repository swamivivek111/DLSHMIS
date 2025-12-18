import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';
import { DepartmentServices } from '../../../Services/DepartmentServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ServiceGroup {
  groupId: number;
  groupName: string;
  departmentId: number;
  isResultRequired: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ServiceGroupGrid() {
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceGroupToDelete, setServiceGroupToDelete] = useState<ServiceGroup | null>(null);
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const loadDepartments = async () => {
    try {
      const response = await DepartmentServices.getAllDepartments();
      const deptList = response.departments || response;
      const deptMap: { [key: number]: string } = {};
      deptList.forEach((dept: any) => {
        deptMap[dept.id] = dept.name;
      });
      setDepartments(deptMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const fetchData = async () => {
    try {
      const allServiceGroups = await ServiceGroupService.getAllServiceGroups();
      
      // Filter by search
      const filteredServiceGroups = search 
        ? allServiceGroups.filter((serviceGroup: ServiceGroup) =>
            serviceGroup.groupName?.toLowerCase().includes(search.toLowerCase())
          )
        : allServiceGroups;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedServiceGroups = filteredServiceGroups.slice(startIndex, endIndex);
      
      setServiceGroups(paginatedServiceGroups);
      setTotalPages(Math.ceil(filteredServiceGroups.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load service groups');
    }
  };

  useEffect(() => {
    loadDepartments();
    fetchData();
  }, [page, search]);

  const handleDelete = async (serviceGroup: ServiceGroup) => {
    try {
      await ServiceGroupService.deleteServiceGroup(serviceGroup.groupId);
      successNotification(`${serviceGroup.groupName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete service group');
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
          <h2 className="text-2xl font-bold text-gray-800">Service Group Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/service-groups/add')}
          >
            Add Service Group
          </Button>
        </div>

        <DataTable<ServiceGroup>
        data={serviceGroups}
        columns={[
          { key: 'groupName', label: 'Group Name' },
          { key: 'departmentId', label: 'Department', render: (row) => departments[row.departmentId] || `ID: ${row.departmentId}` },
          { key: 'isResultRequired', label: 'Result Required', render: (row) => row.isResultRequired ? 'Yes' : 'No' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(s) => navigate(`/admin/mastersettings/service-groups/view/${s.groupId}`)}
        onEdit={(s) => navigate(`/admin/mastersettings/service-groups/edit/${s.groupId}`)}
        onDelete={(s) => {
          setServiceGroupToDelete(s);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/service-groups/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (serviceGroupToDelete) {
            await handleDelete(serviceGroupToDelete);
          }
        }}
        title="Delete Service Group"
        message={`Are you sure you want to delete ${serviceGroupToDelete?.groupName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}