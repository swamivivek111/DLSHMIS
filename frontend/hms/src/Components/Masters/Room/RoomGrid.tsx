import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { RoomServices } from '../../../Services/RoomServices';

const RoomGrid: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { key: 'id', label: 'Room ID' },
    { key: 'wardName', label: 'Ward' },
    { key: 'roomNumber', label: 'Room Number' },
    { 
      key: 'roomType', 
      label: 'Room Type',
      render: (row: any) => (
        <Badge color={getRoomTypeColor(row.roomType)}>
          {formatRoomType(row.roomType)}
        </Badge>
      )
    },
    { key: 'maxBedsAllowed', label: 'Max Beds' },
    { 
      key: 'roomChargesPerDay', 
      label: 'Daily Charges',
      render: (row: any) => row.roomChargesPerDay ? `₹${row.roomChargesPerDay}` : 'N/A'
    },
    { 
      key: 'isAC', 
      label: 'AC/Non-AC',
      render: (row: any) => (
        <Badge color={row.isAC ? 'blue' : 'gray'}>
          {row.isAC ? 'AC' : 'Non-AC'}
        </Badge>
      )
    },
    { 
      key: 'roomStatus', 
      label: 'Status',
      render: (row: any) => (
        <Badge color={row.roomStatus === 'ACTIVE' ? 'green' : 'orange'}>
          {row.roomStatus === 'UNDER_MAINTENANCE' ? 'Under Maintenance' : row.roomStatus}
        </Badge>
      )
    },
  ];

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'ICU_CUBICLE': return 'red';
      case 'DELUXE': return 'blue';
      case 'SINGLE': return 'cyan';
      case 'TWIN_SHARING': return 'teal';
      default: return 'gray';
    }
  };

  const formatRoomType = (type: string) => {
    switch (type) {
      case 'TWIN_SHARING': return 'Twin-sharing';
      case 'ICU_CUBICLE': return 'ICU cubicle';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await RoomServices.getRoom(currentPage, 10, searchValue);
      setRooms(response.data || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch rooms',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/rooms/add');
  };

  const handleEdit = (room: any) => {
    navigate(`/admin/mastersettings/rooms/edit/${room.id}`);
  };

  const handleView = (room: any) => {
    navigate(`/admin/mastersettings/rooms/view/${room.id}`);
  };

  const handleDelete = async (room: any) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await RoomServices.deleteRoom(room.id);
        notifications.show({
          title: 'Success',
          message: 'Room deleted successfully',
          color: 'green',
        });
        fetchRooms();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete room',
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
          <h2 className="text-2xl font-bold text-gray-800">Room Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Room
          </Button>
        </div>

        <DataTable
          data={rooms}
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

export default RoomGrid;