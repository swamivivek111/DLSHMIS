import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { BedServices } from '../../../Services/BedServices';

const BedGrid: React.FC = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { key: 'id', label: 'Bed ID' },
    { key: 'wardName', label: 'Ward' },
    { key: 'roomNumber', label: 'Room' },
    { key: 'bedNumber', label: 'Bed Number' },
    { 
      key: 'bedType', 
      label: 'Bed Type',
      render: (row: any) => (
        <Badge color={getBedTypeColor(row.bedType)}>
          {formatBedType(row.bedType)}
        </Badge>
      )
    },
    { 
      key: 'bedStatus', 
      label: 'Status',
      render: (row: any) => (
        <Badge color={getBedStatusColor(row.bedStatus)}>
          {formatBedStatus(row.bedStatus)}
        </Badge>
      )
    },
    { 
      key: 'bedChargesPerDay', 
      label: 'Daily Charges',
      render: (row: any) => row.bedChargesPerDay ? `₹${row.bedChargesPerDay}` : 'N/A'
    },
    { 
      key: 'currentPatientId', 
      label: 'Patient ID',
      render: (row: any) => row.currentPatientId || 'N/A'
    },
  ];

  const getBedTypeColor = (type: string) => {
    switch (type) {
      case 'ICU_BED': return 'red';
      case 'EMERGENCY_BED': return 'orange';
      case 'VENTILATOR_BED': return 'purple';
      case 'DELUXE_BED': return 'blue';
      case 'PEDIATRIC_BED': return 'pink';
      case 'MATERNITY_BED': return 'teal';
      default: return 'gray';
    }
  };

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'green';
      case 'OCCUPIED': return 'red';
      case 'RESERVED': return 'yellow';
      case 'CLEANING': return 'blue';
      case 'UNDER_MAINTENANCE': return 'orange';
      default: return 'gray';
    }
  };

  const formatBedType = (type: string) => {
    switch (type) {
      case 'ICU_BED': return 'ICU Bed';
      case 'EMERGENCY_BED': return 'Emergency Bed';
      case 'PEDIATRIC_BED': return 'Pediatric Bed';
      case 'MATERNITY_BED': return 'Maternity Bed';
      case 'DELUXE_BED': return 'Deluxe Bed';
      case 'VENTILATOR_BED': return 'Ventilator Bed';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  const formatBedStatus = (status: string) => {
    switch (status) {
      case 'UNDER_MAINTENANCE': return 'Under Maintenance';
      default: return status.charAt(0) + status.slice(1).toLowerCase();
    }
  };

  const fetchBeds = async () => {
    setLoading(true);
    try {
      const response = await BedServices.getBed(currentPage, 10, searchValue);
      setBeds(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching beds:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch beds',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/beds/add');
  };

  const handleEdit = (bed: any) => {
    navigate(`/admin/mastersettings/beds/edit/${bed.id}`);
  };

  const handleView = (bed: any) => {
    navigate(`/admin/mastersettings/beds/view/${bed.id}`);
  };

  const handleDelete = async (bed: any) => {
    if (window.confirm('Are you sure you want to delete this bed?')) {
      try {
        await BedServices.deleteBed(bed.id);
        notifications.show({
          title: 'Success',
          message: 'Bed deleted successfully',
          color: 'green',
        });
        fetchBeds();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete bed',
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
          <h2 className="text-2xl font-bold text-gray-800">Bed Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Bed
          </Button>
        </div>

        <DataTable
          data={beds}
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

export default BedGrid;