import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Button,
  Group,
  TextInput,
  Select,
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
  IconLink,
  IconDownload
} from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { CategoryTariffMappingService } from '../../Services/CategoryTariffMappingService';
import { getPatientCategory } from '../../Services/PatientCategoryServices';
import axios from 'axios';

interface CategoryTariffMapping {
  mappingId?: number;
  categoryName: string;
  tariffName: string;
  effectiveFrom: Date;
  effectiveTo?: Date;
  isActive: boolean;
  createdAt?: string;
}

const CategoryTariffMapping: React.FC = () => {
  const [mappings, setMappings] = useState<CategoryTariffMapping[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tariffs, setTariffs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingMapping, setEditingMapping] = useState<CategoryTariffMapping | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<CategoryTariffMapping>({
    initialValues: {
      categoryName: '',
      tariffName: '',
      effectiveFrom: new Date(),
      effectiveTo: undefined,
      isActive: true,
    },
    validate: {
      categoryName: (value) => (!value ? 'Category is required' : null),
      tariffName: (value) => (!value ? 'Tariff is required' : null),
      effectiveFrom: (value) => (!value ? 'Effective from date is required' : null),
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const [mappingsRes, categoriesRes, tariffsRes] = await Promise.all([
        CategoryTariffMappingService.getAllMappings(),
        getPatientCategory(1, 100, ''),
        axios.get('http://localhost:9000/master/tariffs', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setMappings(mappingsRes.mappings || []);
      setCategories(categoriesRes.data || []);
      setTariffs(tariffsRes.data || []);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch data',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CategoryTariffMapping) => {
    setLoading(true);
    try {
      const submitData = {
        ...values,
        effectiveFrom: values.effectiveFrom.toISOString().split('T')[0],
        effectiveTo: values.effectiveTo ? values.effectiveTo.toISOString().split('T')[0] : null,
      };

      if (editingMapping) {
        await CategoryTariffMappingService.updateMapping(editingMapping.mappingId!, submitData);
        notifications.show({
          title: 'Success',
          message: 'Mapping updated successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        await CategoryTariffMappingService.createMapping(submitData);
        notifications.show({
          title: 'Success',
          message: 'Mapping created successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      }
      
      setModalOpened(false);
      form.reset();
      setEditingMapping(null);
      fetchData();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save mapping',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mapping: CategoryTariffMapping) => {
    setEditingMapping(mapping);
    form.setValues({
      ...mapping,
      effectiveFrom: new Date(mapping.effectiveFrom),
      effectiveTo: mapping.effectiveTo ? new Date(mapping.effectiveTo) : undefined,
    });
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this mapping?')) {
      setLoading(true);
      try {
        await CategoryTariffMappingService.deleteMapping(id);
        notifications.show({
          title: 'Success',
          message: 'Mapping deleted successfully',
          color: 'green',
          icon: <IconCheck />,
        });
        fetchData();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete mapping',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = () => {
    setEditingMapping(null);
    form.reset();
    setModalOpened(true);
  };

  const filteredMappings = mappings.filter(mapping =>
    mapping.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mapping.tariffName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="md">
      <Paper shadow="sm" p="md" withBorder>
        <LoadingOverlay visible={loading} />
        
        <Group justify="space-between" mb="md">
          <Group>
            <IconLink size={24} className="text-orange-500" />
            <Title order={2}>Category Tariff Mapping</Title>
          </Group>
          <Group>
            <Button 
              variant="outline" 
              leftSection={<IconDownload size={16} />}
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," + 
                  "Category,Tariff,Effective From,Effective To,Status\n" +
                  filteredMappings.map(m => 
                    `${m.categoryName},${m.tariffName},${new Date(m.effectiveFrom).toLocaleDateString()},${m.effectiveTo ? new Date(m.effectiveTo).toLocaleDateString() : 'N/A'},${m.isActive ? 'Active' : 'Inactive'}`
                  ).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "category_tariff_mappings.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Export
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={openModal}>
              Add Mapping
            </Button>
          </Group>
        </Group>

        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search mappings..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="dimmed">
              Total Mappings: {filteredMappings.length}
            </Text>
          </Grid.Col>
        </Grid>

        <Card withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Tariff</Table.Th>
                <Table.Th>Effective From</Table.Th>
                <Table.Th>Effective To</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredMappings.map((mapping) => (
                <Table.Tr key={mapping.mappingId}>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {mapping.categoryName}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="grape">
                      {mapping.tariffName}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {new Date(mapping.effectiveFrom).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>
                    {mapping.effectiveTo ? new Date(mapping.effectiveTo).toLocaleDateString() : 'N/A'}
                  </Table.Td>
                  <Table.Td>
                    <Badge color={mapping.isActive ? 'green' : 'red'}>
                      {mapping.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleEdit(mapping)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDelete(mapping.mappingId!)}
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
          title={editingMapping ? 'Edit Mapping' : 'Add Mapping'}
          size="md"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={12}>
                <Select
                  label="Category"
                  placeholder="Select category"
                  data={categories.map(c => ({ value: c.categoryName, label: c.categoryName }))}
                  {...form.getInputProps('categoryName')}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Select
                  label="Tariff"
                  placeholder="Select tariff"
                  data={tariffs.map(t => ({ value: t.serviceName, label: t.serviceName }))}
                  {...form.getInputProps('tariffName')}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateInput
                  label="Effective From"
                  placeholder="Select date"
                  required
                  {...form.getInputProps('effectiveFrom')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateInput
                  label="Effective To"
                  placeholder="Select date (optional)"
                  {...form.getInputProps('effectiveTo')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Switch
                  label="Active"
                  {...form.getInputProps('isActive', { type: 'checkbox' })}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                {editingMapping ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>
      </Paper>
    </Container>
  );
};

export default CategoryTariffMapping;