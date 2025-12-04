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
  Notification,
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
  IconAward,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

interface Category {
  categoryId?: number;
  categoryName: string;
  categoryCode: string;
  description: string;
  categoryType: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const CategoryMaster: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<Category>({
    initialValues: {
      categoryName: '',
      categoryCode: '',
      description: '',
      categoryType: '',
      isActive: true,
    },
    validate: {
      categoryName: (value) => (!value ? 'Category name is required' : null),
      categoryType: (value) => (!value ? 'Category type is required' : null),
    },
  });

  const categoryTypes = [
    { value: 'MEDICAL', label: 'Medical' },
    { value: 'ADMINISTRATIVE', label: 'Administrative' },
    { value: 'BILLING', label: 'Billing' },
    { value: 'DIAGNOSTIC', label: 'Diagnostic' },
    { value: 'TREATMENT', label: 'Treatment' },
    { value: 'PHARMACY', label: 'Pharmacy' },
    { value: 'LABORATORY', label: 'Laboratory' },
    { value: 'RADIOLOGY', label: 'Radiology' },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9000/master/categories');
      setCategories(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch categories',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Category) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:9000/master/categories/${editingCategory.categoryId}`, values);
        notifications.show({
          title: 'Success',
          message: 'Category updated successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        await axios.post('http://localhost:9000/master/categories', values);
        notifications.show({
          title: 'Success',
          message: 'Category created successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      }
      
      setModalOpened(false);
      form.reset();
      setEditingCategory(null);
      fetchCategories();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data || 'Failed to save category',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setValues(category);
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:9000/master/categories/${id}`);
        notifications.show({
          title: 'Success',
          message: 'Category deleted successfully',
          color: 'green',
          icon: <IconCheck />,
        });
        fetchCategories();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete category',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = () => {
    setEditingCategory(null);
    form.reset();
    setModalOpened(true);
  };

  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.categoryCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.categoryType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="md">
      <Paper shadow="sm" p="md" withBorder>
        <LoadingOverlay visible={loading} />
        
        <Group justify="space-between" mb="md">
          <Group>
            <IconAward size={24} className="text-orange-500" />
            <Title order={2}>Category Master</Title>
          </Group>
          <Button leftSection={<IconPlus size={16} />} onClick={openModal}>
            Add Category
          </Button>
        </Group>

        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search categories..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="dimmed">
              Total Categories: {filteredCategories.length}
            </Text>
          </Grid.Col>
        </Grid>

        <Card withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category Name</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredCategories.map((category) => (
                <Table.Tr key={category.categoryId}>
                  <Table.Td>{category.categoryName}</Table.Td>
                  <Table.Td>{category.categoryCode}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {category.categoryType}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{category.description}</Table.Td>
                  <Table.Td>
                    <Badge color={category.isActive ? 'green' : 'red'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleEdit(category)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDelete(category.categoryId!)}
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
          title={editingCategory ? 'Edit Category' : 'Add Category'}
          size="md"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Category Name"
                  placeholder="Enter category name"
                  required
                  {...form.getInputProps('categoryName')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <TextInput
                  label="Category Code"
                  placeholder="Enter category code"
                  {...form.getInputProps('categoryCode')}
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Select
                  label="Category Type"
                  placeholder="Select category type"
                  data={categoryTypes}
                  required
                  {...form.getInputProps('categoryType')}
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
                {editingCategory ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>
      </Paper>
    </Container>
  );
};

export default CategoryMaster;