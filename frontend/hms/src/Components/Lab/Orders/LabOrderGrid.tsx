import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group, Text, Container, Title } from '@mantine/core';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import DataTable from '../../DataTable/DataTable';

interface LabOrder {
  id: number;
  patientId: number;
  patientName: string;
  doctorName: string;
  orderDate: string;
  status: string;
  priority: string;
  notes: string;
}

const PAGE_SIZE = 10;

export default function LabOrderGrid() {
  const [orders, setOrders] = useState<LabOrder[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Mock data for now
      const mockOrders: LabOrder[] = [
        {
          id: 1,
          patientId: 1001,
          patientName: 'John Doe',
          doctorName: 'Dr. Smith',
          orderDate: '2024-01-15T10:30:00',
          status: 'PENDING',
          priority: 'ROUTINE',
          notes: 'Complete blood count required'
        },
        {
          id: 2,
          patientId: 1002,
          patientName: 'Jane Smith',
          doctorName: 'Dr. Johnson',
          orderDate: '2024-01-15T11:00:00',
          status: 'SAMPLE_COLLECTED',
          priority: 'URGENT',
          notes: 'Lipid profile test'
        }
      ];
      
      const filteredData = search 
        ? mockOrders.filter(order => 
            order.patientName.toLowerCase().includes(search.toLowerCase()) ||
            order.doctorName.toLowerCase().includes(search.toLowerCase())
          )
        : mockOrders;
      
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setOrders(filteredData.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load lab orders',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (order: LabOrder) => {
    if (confirm(`Delete lab order for ${order.patientName}?`)) {
      notifications.show({
        title: 'Success',
        message: 'Lab order deleted successfully',
        color: 'green',
      });
      fetchData();
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = { 
      PENDING: 'orange', 
      SAMPLE_COLLECTED: 'blue', 
      PROCESSING: 'yellow', 
      COMPLETED: 'green', 
      CANCELLED: 'red' 
    };
    return <Badge color={colors[status as keyof typeof colors] || 'gray'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = { ROUTINE: 'gray', URGENT: 'orange', STAT: 'red' };
    return <Badge color={colors[priority as keyof typeof colors] || 'gray'}>{priority}</Badge>;
  };

  return (
    <Container size="xl" className="py-4">
      <Title order={2} className="text-gray-800 mb-6">
        Lab Test Orders Management
      </Title>
      <DataTable<LabOrder>
        data={orders}
        columns={[
          { 
            key: 'id', 
            label: 'Order ID',
            render: (order) => (
              <div>
                <Text fw={500}>#{order.id}</Text>
                <Text size="xs" c="dimmed">{new Date(order.orderDate).toLocaleDateString()}</Text>
              </div>
            )
          },
          { 
            key: 'patientName', 
            label: 'Patient',
            render: (order) => (
              <div>
                <Group gap="xs">
                  <IconUser size={14} />
                  <Text fw={500}>{order.patientName}</Text>
                </Group>
                <Text size="xs" c="dimmed">ID: {order.patientId}</Text>
              </div>
            )
          },
          { 
            key: 'doctorName', 
            label: 'Doctor',
            render: (order) => <Text size="sm">{order.doctorName}</Text>
          },
          { 
            key: 'status', 
            label: 'Status',
            render: (order) => getStatusBadge(order.status)
          },
          { 
            key: 'priority', 
            label: 'Priority',
            render: (order) => getPriorityBadge(order.priority)
          },
          { 
            key: 'notes', 
            label: 'Notes',
            render: (order) => (
              <Text size="sm" truncate style={{ maxWidth: 150 }}>
                {order.notes}
              </Text>
            )
          }
        ]}
        onView={(order) => navigate(`/admin/lab/orders/view/${order.id}`)}
        onEdit={(order) => navigate(`/admin/lab/orders/edit/${order.id}`)}
        onDelete={handleDelete}
        onAdd={() => navigate('/admin/lab/orders/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        exportData={orders}
        exportFilename="lab-orders"
      />
    </Container>
  );
}