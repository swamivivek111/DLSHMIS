import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { getDesignation, deleteDesignation } from '../../../Services/DesignationServices';

const DesignationGrid: React.FC = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { key: 'designationId', label: 'Designation ID' },
    { key: 'designationName', label: 'Designation Name' },
    { key: 'designationCode', label: 'Designation Code' },
    { key: 'description', label: 'Description' },
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

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const response = await getDesignation(currentPage, 10, searchValue);
      setDesignations(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching designations:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch designations',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/designations/add');
  };

  const handleEdit = (designation: any) => {
    navigate(`/admin/mastersettings/designations/edit/${designation.designationId}`);
  };

  const handleView = (designation: any) => {
    navigate(`/admin/mastersettings/designations/view/${designation.designationId}`);
  };

  const handleDelete = async (designation: any) => {
    if (window.confirm('Are you sure you want to delete this designation?')) {
      try {
        await deleteDesignation(designation.designationId);
        notifications.show({
          title: 'Success',
          message: 'Designation deleted successfully',
          color: 'green',
        });
        fetchDesignations();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete designation',
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
          <h2 className="text-2xl font-bold text-gray-800">Designation Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Designation
          </Button>
        </div>

        <DataTable
          data={designations}
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

export default DesignationGrid;
 