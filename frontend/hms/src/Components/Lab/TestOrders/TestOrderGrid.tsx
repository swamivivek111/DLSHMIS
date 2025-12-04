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
  Modal,
  Stack,
  Title,
  Text,
} from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';

interface TestOrder {
  id: number;
  patientName: string;
  patientId: string;
  doctorName: string;
  testName: string;
  testType: string;
  priority: 'Normal' | 'Urgent' | 'STAT';
  status: 'Pending' | 'Collected' | 'Processing' | 'Completed';
  orderDate: string;
  sampleType: string;
}

const TestOrderGrid: React.FC = () => {
  const [orders, setOrders] = useState<TestOrder[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<TestOrder | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const mockOrders: TestOrder[] = [
      {
        id: 1,
        patientName: 'John Doe',
        patientId: 'P001',
        doctorName: 'Dr. Smith',
        testName: 'Complete Blood Count',
        testType: 'Hematology',
        priority: 'Normal',
        status: 'Pending',
        orderDate: '2024-11-15',
        sampleType: 'Blood',
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        patientId: 'P002',
        doctorName: 'Dr. Johnson',
        testName: 'Liver Function Test',
        testType: 'Biochemistry',
        priority: 'Urgent',
        status: 'Collected',
        orderDate: '2024-11-15',
        sampleType: 'Serum',
      },
    ];
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(search.toLowerCase()) ||
                         order.testName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
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
      case 'Processing': return 'yellow';
      case 'Collected': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Lab Test Orders</Title>
          <Button leftSection={<IconPlus size={16} />} variant="outline">
            New Test Order
          </Button>
        </Group>

        <Group mb="md">
          <TextInput
            placeholder="Search by patient name or test..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by status"
            data={[
              { value: '', label: 'All Status' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Collected', label: 'Collected' },
              { value: 'Processing', label: 'Processing' },
              { value: 'Completed', label: 'Completed' },
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || '')}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Test Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Order Date</Table.Th>
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
                <Table.Td>{order.testName}</Table.Td>
                <Table.Td>{order.testType}</Table.Td>
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
                    <ActionIcon variant="light" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
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
        title="Test Order Details"
        size="lg"
      >
        {selectedOrder && (
          <Stack gap="md">
            <Group>
              <Text fw={500}>Patient:</Text>
              <Text>{selectedOrder.patientName} ({selectedOrder.patientId})</Text>
            </Group>
            <Group>
              <Text fw={500}>Doctor:</Text>
              <Text>{selectedOrder.doctorName}</Text>
            </Group>
            <Group>
              <Text fw={500}>Test:</Text>
              <Text>{selectedOrder.testName}</Text>
            </Group>
            <Group>
              <Text fw={500}>Sample Type:</Text>
              <Text>{selectedOrder.sampleType}</Text>
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
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default TestOrderGrid;