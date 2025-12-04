import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { getDepartment, deleteDepartment } from '../../../Services/DepartmentServices';

const DepartmentGrid: React.FC = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { key: 'id', label: 'Department ID' },
    { key: 'name', label: 'Department Name' },
    { key: 'code', label: 'Department Code' },
    { key: 'headOfDepartment', label: 'Head of Department' },
    { key: 'contactNumber', label: 'Contact Number' },
    { key: 'email', label: 'Email' },
    { 
      key: 'active', 
      label: 'Status',
      render: (row: any) => (
        <Badge color={row.active ? 'green' : 'red'}>
          {row.active ? 'ACTIVE' : 'INACTIVE'}
        </Badge>
      )
    },
  ];

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await getDepartment(currentPage, 10, searchValue);
      setDepartments(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching departments:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch departments',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/departments/add');
  };

  const handleEdit = (department: any) => {
    navigate(`/admin/mastersettings/departments/edit/${department.id}`);
  };

  const handleView = (department: any) => {
    navigate(`/admin/mastersettings/departments/view/${department.id}`);
  };

  const handleDelete = async (department: any) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(department.id);
        notifications.show({
          title: 'Success',
          message: 'Department deleted successfully',
          color: 'green',
        });
        fetchDepartments();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete department',
          color: 'red',
        });
      }
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
          <h2 className="text-2xl font-bold text-gray-800">Department Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Department
          </Button>
        </div>

        <DataTable
          data={departments}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onAdd={handleAdd}
          pagination={{
            page: currentPage,
            total: totalPages,
            onPageChange: setCurrentPage,
          }}
          search={{
            value: searchValue,
            onChange: setSearchValue,
          }}
          loading={loading}
        />
      </div>
    </motion.div>
  );
};

export default DepartmentGrid;