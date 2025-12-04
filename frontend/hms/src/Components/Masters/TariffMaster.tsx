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
  Text,
  NumberInput
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconBadge,
  IconCheck,
  IconX,
  IconCurrencyRupee
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DateTimePicker } from '@mantine/dates';
import axios from 'axios';

interface Tariff {
  tariffId?: number;
  serviceName: string;
  serviceCode: string;
  description: string;
  basePrice: number;
  discountPrice?: number;
  serviceCategory: string;
  department: string;
  unit: string;
  taxPercentage?: number;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdAt?: string;
  updatedAt?: string;
}

const TariffMaster: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingTariff, setEditingTariff] = useState<Tariff | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<Tariff>({
    initialValues: {
      serviceName: '',
      serviceCode: '',
      description: '',
      basePrice: 0,
      discountPrice: 0,
      serviceCategory: '',
      department: '',
      unit: '',
      taxPercentage: 0,
      isActive: true,
      effectiveFrom: new Date(),
    },
    validate: {
      serviceName: (value) => (!value ? 'Service name is required' : null),
      basePrice: (value) => (value <= 0 ? 'Base price must be greater than 0' : null),
      serviceCategory: (value) => (!value ? 'Service category is required' : null),
      department: (value) => (!value ? 'Department is required' : null),
      unit: (value) => (!value ? 'Unit is required' : null),
    },
  });

  const serviceCategories = [
    { value: 'CONSULTATION', label: 'Consultation' },
    { value: 'DIAGNOSTIC', label: 'Diagnostic' },
    { value: 'TREATMENT', label: 'Treatment' },
    { value: 'SURGERY', label: 'Surgery' },
    { value: 'LABORATORY', label: 'Laboratory' },
    { value: 'RADIOLOGY', label: 'Radiology' },
    { value: 'PHARMACY', label: 'Pharmacy' },
    { value: 'EMERGENCY', label: 'Emergency' },
    { value: 'ADMISSION', label: 'Admission' },
    { value: 'DISCHARGE', label: 'Discharge' },
  ];

  const departments = [
    { value: 'CARDIOLOGY', label: 'Cardiology' },
    { value: 'NEUROLOGY', label: 'Neurology' },
    { value: 'ORTHOPEDICS', label: 'Orthopedics' },
    { value: 'PEDIATRICS', label: 'Pediatrics' },
    { value: 'GYNECOLOGY', label: 'Gynecology' },
    { value: 'GENERAL_MEDICINE', label: 'General Medicine' },
    { value: 'SURGERY', label: 'Surgery' },
    { value: 'EMERGENCY', label: 'Emergency' },
    { value: 'RADIOLOGY', label: 'Radiology' },
    { value: 'LABORATORY', label: 'Laboratory' },
  ];

  const units = [
    { value: 'PER_VISIT', label: 'Per Visit' },
    { value: 'PER_HOUR', label: 'Per Hour' },
    { value: 'PER_DAY', label: 'Per Day' },
    { value: 'PER_TEST', label: 'Per Test' },
    { value: 'PER_PROCEDURE', label: 'Per Procedure' },
    { value: 'PER_ITEM', label: 'Per Item' },
    { value: 'LUMP_SUM', label: 'Lump Sum' },
  ];

  useEffect(() => {
    fetchTariffs();
  }, []);

  const fetchTariffs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:9000/master/tariffs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTariffs(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch tariffs',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Tariff) => {
    setLoading(true);
    try {
      if (editingTariff) {
        await axios.put(`http://localhost:9000/master/tariffs/${editingTariff.tariffId}`, values);
        notifications.show({
          title: 'Success',
          message: 'Tariff updated successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        await axios.post('http://localhost:9000/master/tariffs', values);
        notifications.show({
          title: 'Success',
          message: 'Tariff created successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      }
      
      setModalOpened(false);
      form.reset();
      setEditingTariff(null);
      fetchTariffs();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data || 'Failed to save tariff',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tariff: Tariff) => {
    setEditingTariff(tariff);
    form.setValues({
      ...tariff,
      effectiveFrom: tariff.effectiveFrom ? new Date(tariff.effectiveFrom) : new Date(),
      effectiveTo: tariff.effectiveTo ? new Date(tariff.effectiveTo) : undefined,
    });
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this tariff?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:9000/master/tariffs/${id}`);
        notifications.show({
          title: 'Success',
          message: 'Tariff deleted successfully',
          color: 'green',
          icon: <IconCheck />,
        });
        fetchTariffs();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete tariff',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = () => {
    setEditingTariff(null);
    form.reset();
    setModalOpened(true);
  };

  const filteredTariffs = tariffs.filter(tariff =>
    tariff.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tariff.serviceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tariff.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tariff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="md">
      <Paper shadow="sm" p="md" withBorder>
        <LoadingOverlay visible={loading} />
        
        <Group justify="space-between" mb="md">
          <Group>
            <IconBadge size={24} className="text-orange-500" />
            <Title order={2}>Tariff Master</Title>
          </Group>
          <Button leftSection={<IconPlus size={16} />} onClick={openModal}>
            Add Tariff
          </Button>
        </Group>

        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search tariffs..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="dimmed">
              Total Tariffs: {filteredTariffs.length}
            </Text>
          </Grid.Col>
        </Grid>

        <Card withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Service Name</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Department</Table.Th>
                <Table.Th>Base Price</Table.Th>
                <Table.Th>Unit</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredTariffs.map((tariff) => (
                <Table.Tr key={tariff.tariffId}>
                  <Table.Td>{tariff.serviceName}</Table.Td>
                  <Table.Td>{tariff.serviceCode}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {tariff.serviceCategory}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="grape">
                      {tariff.department}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <IconCurrencyRupee size={14} />
                      <Text>{tariff.basePrice.toFixed(2)}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>{tariff.unit}</Table.Td>
                  <Table.Td>
                    <Badge color={tariff.isActive ? 'green' : 'red'}>
                      {tariff.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleEdit(tariff)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDelete(tariff.tariffId!)}
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
          title={editingTariff ? 'Edit Tariff' : 'Add Tariff'}
          size="lg"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Service Name"
                  placeholder="Enter service name"
                  required
                  {...form.getInputProps('serviceName')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Service Code"
                  placeholder="Enter service code"
                  {...form.getInputProps('serviceCode')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Service Category"
                  placeholder="Select category"
                  data={serviceCategories}
                  required
                  {...form.getInputProps('serviceCategory')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Department"
                  placeholder="Select department"
                  data={departments}
                  required
                  {...form.getInputProps('department')}
                />
              </Grid.Col>
              
              <Grid.Col span={4}>
                <NumberInput
                  label="Base Price"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  required
                  {...form.getInputProps('basePrice')}
                />
              </Grid.Col>
              
              <Grid.Col span={4}>
                <NumberInput
                  label="Discount Price"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  {...form.getInputProps('discountPrice')}
                />
              </Grid.Col>
              
              <Grid.Col span={4}>
                <NumberInput
                  label="Tax %"
                  placeholder="0.00"
                  min={0}
                  max={100}
                  decimalScale={2}
                  {...form.getInputProps('taxPercentage')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Unit"
                  placeholder="Select unit"
                  data={units}
                  required
                  {...form.getInputProps('unit')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Switch
                  label="Active"
                  {...form.getInputProps('isActive', { type: 'checkbox' })}
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
              
              <Grid.Col span={6}>
                <DateTimePicker
                  label="Effective From"
                  placeholder="Select date and time"
                  {...form.getInputProps('effectiveFrom')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateTimePicker
                  label="Effective To"
                  placeholder="Select date and time"
                  {...form.getInputProps('effectiveTo')}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                {editingTariff ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>
      </Paper>
    </Container>
  );
};

export default TariffMaster;