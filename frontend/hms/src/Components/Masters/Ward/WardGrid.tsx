import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { WardServices } from '../../../Services/WardServices';

const WardGrid: React.FC = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { key: 'id', label: 'Ward ID' },
    { key: 'wardName', label: 'Ward Name' },
    { 
      key: 'wardType', 
      label: 'Ward Type',
      render: (row: any) => (
        <Badge color={getWardTypeColor(row.wardType)}>
          {formatWardType(row.wardType)}
        </Badge>
      )
    },
    { key: 'floorNo', label: 'Floor No' },
    { key: 'blockBuildingName', label: 'Block/Building' },
    { key: 'departmentName', label: 'Department' },
    { 
      key: 'status', 
      label: 'Status',
      render: (row: any) => (
        <Badge color={row.status === 'ACTIVE' ? 'green' : 'red'}>
          {row.status}
        </Badge>
      )
    },
  ];

  const getWardTypeColor = (type: string) => {
    switch (type) {
      case 'ICU': return 'red';
      case 'SPECIAL': return 'blue';
      case 'SEMI_SPECIAL': return 'cyan';
      case 'ISOLATION': return 'orange';
      default: return 'gray';
    }
  };

  const formatWardType = (type: string) => {
    switch (type) {
      case 'SEMI_SPECIAL': return 'Semi-special';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  const fetchWards = async () => {
    setLoading(true);
    try {
      const response = await WardServices.getWard(currentPage, 10, searchValue);
      setWards(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching wards:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch wards',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWards();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/wards/add');
  };

  const handleEdit = (ward: any) => {
    navigate(`/admin/mastersettings/wards/edit/${ward.id}`);
  };

  const handleView = (ward: any) => {
    navigate(`/admin/mastersettings/wards/view/${ward.id}`);
  };

  const handleDelete = async (ward: any) => {
    if (window.confirm('Are you sure you want to delete this ward?')) {
      try {
        await WardServices.deleteWard(ward.id);
        notifications.show({
          title: 'Success',
          message: 'Ward deleted successfully',
          color: 'green',
        });
        fetchWards();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete ward',
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
          <h2 className="text-2xl font-bold text-gray-800">Ward Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Ward
          </Button>
        </div>

        <DataTable
          data={wards}
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

export default WardGrid;