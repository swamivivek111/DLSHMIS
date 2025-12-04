import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Button,
  Group,
  TextInput,
  Select,
  Textarea,
  Switch,
  Modal,
  Table,
  ActionIcon,
  Badge,
  LoadingOverlay,
  Grid,
  Card,
  Text
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconCheck,
  IconX,
  IconCash
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { CashCounterService } from '../../Services/CashCounterService';

interface CashCounter {
  cashCounterId?: number;
  counterName: string;
  description?: string;
  systemName?: string;
  tokenRequired: boolean;
  counterType: string;
  createdAt?: string;
  updatedAt?: string;
}

const CashCounterMaster: React.FC = () => {
  const [cashCounters, setCashCounters] = useState<CashCounter[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCounter, setEditingCounter] = useState<CashCounter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<CashCounter>({
    initialValues: {
      counterName: '',
      description: '',
      systemName: '',
      tokenRequired: false,
      counterType: '',
    },
    validate: {
      counterName: (value) => (!value ? 'Counter name is required' : null),
      counterType: (value) => (!value ? 'Counter type is required' : null),
    },
  });

  const counterTypes = [
    { value: 'OPD_BILLING', label: 'OPD Billing' },
    { value: 'IPD_BILLING', label: 'IPD Billing' },
    { value: 'RECEPTION', label: 'Reception' },
    { value: 'OPD_PHARMACY', label: 'OPD Pharmacy' },
    { value: 'PATHOLOGY', label: 'Pathology' },
    { value: 'RADIOLOGY', label: 'Radiology' },
  ];

  useEffect(() => {
    fetchCashCounters();
  }, []);

  const fetchCashCounters = async () => {
    setLoading(true);
    try {
      const response = await CashCounterService.getAllCashCounters();
      setCashCounters(response.cashCounters || []);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch cash counters',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CashCounter) => {
    setLoading(true);
    try {
      if (editingCounter) {
        await CashCounterService.updateCashCounter(editingCounter.cashCounterId!, values);
        notifications.show({
          title: 'Success',
          message: 'Cash Counter updated successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        await CashCounterService.createCashCounter(values);
        notifications.show({
          title: 'Success',
          message: 'Cash Counter created successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      }
      
      setModalOpened(false);
      form.reset();
      setEditingCounter(null);
      fetchCashCounters();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save cash counter',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (counter: CashCounter) => {
    setEditingCounter(counter);
    form.setValues(counter);
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this cash counter?')) {
      setLoading(true);
      try {
        await CashCounterService.deleteCashCounter(id);
        notifications.show({
          title: 'Success',
          message: 'Cash Counter deleted successfully',
          color: 'green',
          icon: <IconCheck />,
        });
        fetchCashCounters();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete cash counter',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = () => {
    setEditingCounter(null);
    form.reset();
    setModalOpened(true);
  };

  const filteredCounters = cashCounters.filter(counter =>
    counter.counterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counter.counterType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    counter.systemName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="md">
      <Paper shadow="sm" p="md" withBorder>
        <LoadingOverlay visible={loading} />
        
        <Group justify="space-between" mb="md">
          <Group>
            <IconCash size={24} className="text-orange-500" />
            <Title order={2}>Cash Counter Master</Title>
          </Group>
          <Group>
            <Button 
              variant="outline" 
              leftSection={<IconX size={16} />}
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," + 
                  "Counter Name,Description,System Name,Token Required,Counter Type,Created At\n" +
                  filteredCounters.map(c => 
                    `${c.counterName},${c.description || ''},${c.systemName || ''},${c.tokenRequired ? 'Yes' : 'No'},${c.counterType},${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}`
                  ).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "cash_counters.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Export
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={openModal}>
              Add Cash Counter
            </Button>
          </Group>
        </Group>

        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search cash counters..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="dimmed">
              Total Cash Counters: {filteredCounters.length}
            </Text>
          </Grid.Col>
        </Grid>

        <Card withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Counter Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>System Name</Table.Th>
                <Table.Th>Counter Type</Table.Th>
                <Table.Th>Token Required</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredCounters.map((counter) => (
                <Table.Tr key={counter.cashCounterId}>
                  <Table.Td>{counter.counterName}</Table.Td>
                  <Table.Td>{counter.description || 'N/A'}</Table.Td>
                  <Table.Td>{counter.systemName || 'N/A'}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {counter.counterType?.replace('_', ' ')}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={counter.tokenRequired ? 'green' : 'gray'}>
                      {counter.tokenRequired ? 'Yes' : 'No'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleEdit(counter)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDelete(counter.cashCounterId!)}
                      >
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
          title={editingCounter ? 'Edit Cash Counter' : 'Add Cash Counter'}
          size="md"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Counter Name"
                  placeholder="Enter counter name"
                  required
                  {...form.getInputProps('counterName')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  rows={3}
                  {...form.getInputProps('description')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <TextInput
                  label="System Name"
                  placeholder="Enter system name"
                  {...form.getInputProps('systemName')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Select
                  label="Counter Type"
                  placeholder="Select counter type"
                  data={counterTypes}
                  required
                  {...form.getInputProps('counterType')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Switch
                  label="Token Required"
                  {...form.getInputProps('tokenRequired', { type: 'checkbox' })}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                {editingCounter ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>
      </Paper>
    </Container>
  );
};

export default CashCounterMaster;