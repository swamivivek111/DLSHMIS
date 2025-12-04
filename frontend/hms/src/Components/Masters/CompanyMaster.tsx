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
  IconBuilding,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

interface Company {
  companyId?: number;
  companyCode: string;
  companyName: string;
  companyType: string;
  address: string;
  email: string;
  phone: string;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  orgPercentage: string;
  empPercentage: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const CompanyMaster: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<Company>({
    initialValues: {
      companyCode: '',
      companyName: '',
      companyType: '',
      address: '',
      email: '',
      phone: '',
      orgPercentage: '',
      empPercentage: '',
      isActive: true,
    },
    validate: {
      companyName: (value) => (!value ? 'Company name is required' : null),
      companyType: (value) => (!value ? 'Company type is required' : null),
      email: (value) => (value && !/^\S+@\S+$/.test(value) ? 'Invalid email' : null),
    },
  });

  const companyTypes = [
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'TPA', label: 'TPA' },
  ];

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9000/master/companies');
      setCompanies(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch companies',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Company) => {
    setLoading(true);
    try {
      if (editingCompany) {
        await axios.put(`http://localhost:9000/master/companies/${editingCompany.companyId}`, values);
        notifications.show({
          title: 'Success',
          message: 'Company updated successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      } else {
        await axios.post('http://localhost:9000/master/companies', values);
        notifications.show({
          title: 'Success',
          message: 'Company created successfully',
          color: 'green',
          icon: <IconCheck />,
        });
      }
      
      setModalOpened(false);
      form.reset();
      setEditingCompany(null);
      fetchCompanies();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data || 'Failed to save company',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    form.setValues({
      ...company,
      effectiveFrom: company.effectiveFrom ? new Date(company.effectiveFrom) : undefined,
      effectiveTo: company.effectiveTo ? new Date(company.effectiveTo) : undefined,
    });
    setModalOpened(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:9000/master/companies/${id}`);
        notifications.show({
          title: 'Success',
          message: 'Company deleted successfully',
          color: 'green',
          icon: <IconCheck />,
        });
        fetchCompanies();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete company',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = () => {
    setEditingCompany(null);
    form.reset();
    setModalOpened(true);
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.companyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.companyType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="md">
      <Paper shadow="sm" p="md" withBorder>
        <LoadingOverlay visible={loading} />
        
        <Group justify="space-between" mb="md">
          <Group>
            <IconBuilding size={24} className="text-orange-500" />
            <Title order={2}>Company Master</Title>
          </Group>
          <Button leftSection={<IconPlus size={16} />} onClick={openModal}>
            Add Company
          </Button>
        </Group>

        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              placeholder="Search companies..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="dimmed">
              Total Companies: {filteredCompanies.length}
            </Text>
          </Grid.Col>
        </Grid>

        <Card withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Company Name</Table.Th>
                <Table.Th>Code</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredCompanies.map((company) => (
                <Table.Tr key={company.companyId}>
                  <Table.Td>{company.companyName}</Table.Td>
                  <Table.Td>{company.companyCode}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color="blue">
                      {company.companyType}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{company.email}</Table.Td>
                  <Table.Td>{company.phone}</Table.Td>
                  <Table.Td>
                    <Badge color={company.isActive ? 'green' : 'red'}>
                      {company.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleEdit(company)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => handleDelete(company.companyId!)}
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
          title={editingCompany ? 'Edit Company' : 'Add Company'}
          size="lg"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                  {...form.getInputProps('companyName')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Company Code"
                  placeholder="Enter company code"
                  {...form.getInputProps('companyCode')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Select
                  label="Company Type"
                  placeholder="Select type"
                  data={companyTypes}
                  required
                  {...form.getInputProps('companyType')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Email"
                  placeholder="Enter email"
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Phone"
                  placeholder="Enter phone"
                  {...form.getInputProps('phone')}
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
                  label="Address"
                  placeholder="Enter address"
                  rows={3}
                  {...form.getInputProps('address')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Organization %"
                  placeholder="Enter org percentage"
                  {...form.getInputProps('orgPercentage')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Employee %"
                  placeholder="Enter emp percentage"
                  {...form.getInputProps('empPercentage')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateInput
                  label="Effective From"
                  placeholder="Select date"
                  {...form.getInputProps('effectiveFrom')}
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <DateInput
                  label="Effective To"
                  placeholder="Select date"
                  {...form.getInputProps('effectiveTo')}
                />
              </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                {editingCompany ? 'Update' : 'Create'}
              </Button>
            </Group>
          </form>
        </Modal>
      </Paper>
    </Container>
  );
};

export default CompanyMaster;