import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  TextInput,
  Select,
  Badge,
  Group,
  ActionIcon,
  Title,
  Text,
  Modal,
  Stack,
} from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconPlus, IconDownload } from '@tabler/icons-react';

interface RadiologyOrder {
  id: number;
  patientName: string;
  patientId: string;
  doctorName: string;
  examType: string;
  bodyPart: string;
  priority: 'Normal' | 'Urgent' | 'STAT';
  status: 'Ordered' | 'Scheduled' | 'In Progress' | 'Completed' | 'Reported';
  orderDate: string;
  scheduledDate?: string;
  modality: string;
  clinicalHistory: string;
}

const RadiologyOrders: React.FC = () => {
  const [orders, setOrders] = useState<RadiologyOrder[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [modalityFilter, setModalityFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<RadiologyOrder | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const mockOrders: RadiologyOrder[] = [
      {
        id: 1,
        patientName: 'John Doe',
        patientId: 'P001',
        doctorName: 'Dr. Smith',
        examType: 'Chest X-Ray',
        bodyPart: 'Chest',
        priority: 'Normal',
        status: 'Scheduled',
        orderDate: '2024-11-15',
        scheduledDate: '2024-11-16',
        modality: 'X-Ray',
        clinicalHistory: 'Persistent cough for 2 weeks',
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        patientId: 'P002',
        doctorName: 'Dr. Johnson',
        examType: 'Brain MRI',
        bodyPart: 'Head',
        priority: 'Urgent',
        status: 'In Progress',
        orderDate: '2024-11-15',
        scheduledDate: '2024-11-15',
        modality: 'MRI',
        clinicalHistory: 'Severe headaches and dizziness',
      },
    ];
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(search.toLowerCase()) ||
                         order.examType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesModality = !modalityFilter || order.modality === modalityFilter;
    return matchesSearch && matchesStatus && matchesModality;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'STAT': return 'red';
      case 'Urgent': return 'orange';
      default: return 'blue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Reported': return 'teal';
      case 'In Progress': return 'yellow';
      case 'Scheduled': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Radiology Orders</Title>
          <Button leftSection={<IconPlus size={16} />} variant="outline">
            New Imaging Order
          </Button>
        </Group>

        <Group mb="md">
          <TextInput
            placeholder="Search by patient or exam type..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Modality"
            data={[
              { value: '', label: 'All Modalities' },
              { value: 'X-Ray', label: 'X-Ray' },
              { value: 'CT', label: 'CT Scan' },
              { value: 'MRI', label: 'MRI' },
              { value: 'Ultrasound', label: 'Ultrasound' },
              { value: 'Mammography', label: 'Mammography' },
            ]}
            value={modalityFilter}
            onChange={(value) => setModalityFilter(value || '')}
          />
          <Select
            placeholder="Status"
            data={[
              { value: '', label: 'All Status' },
              { value: 'Ordered', label: 'Ordered' },
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Reported', label: 'Reported' },
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || '')}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Exam Type</Table.Th>
              <Table.Th>Modality</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Order Date</Table.Th>
              <Table.Th>Scheduled</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredOrders.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td>
                  <div>
                    <Text fw={500}>{order.patientName}</Text>
                    <Text size="sm" c="dimmed">{order.patientId}</Text>
                  </div>
                </Table.Td>
                <Table.Td>
                  <div>
                    <Text>{order.examType}</Text>
                    <Text size="sm" c="dimmed">{order.bodyPart}</Text>
                  </div>
                </Table.Td>
                <Table.Td>{order.modality}</Table.Td>
                <Table.Td>
                  <Badge color={getPriorityColor(order.priority)} size="sm">
                    {order.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(order.status)} size="sm">
                    {order.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{order.orderDate}</Table.Td>
                <Table.Td>{order.scheduledDate || '-'}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => {
                        setSelectedOrder(order);
                        setModalOpened(true);
                      }}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="orange">
                      <IconEdit size={16} />
                    </ActionIcon>
                    {order.status === 'Reported' && (
                      <ActionIcon variant="light" color="green">
                        <IconDownload size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Radiology Order Details"
        size="lg"
      >
        {selectedOrder && (
          <Stack gap="md">
            <Group>
              <Text fw={500}>Patient:</Text>
              <Text>{selectedOrder.patientName} ({selectedOrder.patientId})</Text>
            </Group>
            <Group>
              <Text fw={500}>Ordering Doctor:</Text>
              <Text>{selectedOrder.doctorName}</Text>
            </Group>
            <Group>
              <Text fw={500}>Examination:</Text>
              <Text>{selectedOrder.examType} - {selectedOrder.bodyPart}</Text>
            </Group>
            <Group>
              <Text fw={500}>Modality:</Text>
              <Text>{selectedOrder.modality}</Text>
            </Group>
            <Group>
              <Text fw={500}>Clinical History:</Text>
              <Text>{selectedOrder.clinicalHistory}</Text>
            </Group>
            <Group>
              <Text fw={500}>Priority:</Text>
              <Badge color={getPriorityColor(selectedOrder.priority)}>
                {selectedOrder.priority}
              </Badge>
            </Group>
            <Group>
              <Text fw={500}>Status:</Text>
              <Badge color={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status}
              </Badge>
            </Group>
            <Group>
              <Text fw={500}>Order Date:</Text>
              <Text>{selectedOrder.orderDate}</Text>
            </Group>
            {selectedOrder.scheduledDate && (
              <Group>
                <Text fw={500}>Scheduled Date:</Text>
                <Text>{selectedOrder.scheduledDate}</Text>
              </Group>
            )}
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default RadiologyOrders;