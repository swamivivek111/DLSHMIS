import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  TextInput,
  Select,
  Group,
  Badge,
  ActionIcon,
  Card,
  Title,
  Pagination,
  Container,
  Stack,
  Text,
} from '@mantine/core';
import { IconSearch, IconPlus, IconEdit, IconTrash, IconDownload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { Role, RoleServices } from '../../../Services/RoleServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

const RoleGrid: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const exportRoles = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Role Name,Description,Category,Status\n" +
      roles.map(role => 
        `"${role.roleName}","${role.description || ''}","${role.category || ''}","${role.active ? 'Active' : 'Inactive'}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "roles.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    loadRoles();
  }, [page, search]);

  const loadRoles = async () => {
    setLoading(true);
    try {
      console.log('Loading roles from API...');
      const response = await RoleServices.getAllRoles(page, 10, search);
      console.log('Roles loaded:', response);
      setRoles(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error: any) {
      console.error('Failed to load roles:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load roles',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setRoleToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (roleToDelete) {
      try {
        await RoleServices.deleteRole(roleToDelete);
        notifications.show({
          title: 'Success',
          message: 'Role deleted successfully',
          color: 'green',
        });
        loadRoles();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete role',
          color: 'red',
        });
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Administrative': 'blue',
      'Clinical': 'green',
      'Nursing': 'orange',
      'Laboratory': 'red',
      'Pharmacy': 'purple',
    };
    return colors[category] || 'gray';
  };

  const rows = roles.map((role) => (
    <Table.Tr key={role.roleId}>
      <Table.Td>{role.roleName}</Table.Td>
      <Table.Td>{role.description}</Table.Td>
      <Table.Td>
        <Badge color={getCategoryColor(role.category || '')} variant="light">
          {role.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={role.active ? 'green' : 'red'} variant="light">
          {role.active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="outline"
            color="orange"
            onClick={() => navigate(`/admin/applicationsettings/roles/edit/${role.roleId}`)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => handleDeleteClick(role.roleId!)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" py="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Role Management</Title>
            <Group>
              <Button
                variant="outline"
                leftSection={<IconDownload size={16} />}
                onClick={exportRoles}
                disabled={roles.length === 0}
              >
                Export
              </Button>
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={() => navigate('/admin/applicationsettings/roles/add')}
              >
                Add Role
              </Button>
            </Group>
          </Group>

          <TextInput
            placeholder="Search roles..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Role Name</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {loading ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Text ta="center">Loading...</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Text ta="center">No roles found</Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Group justify="center">
              <Pagination
                total={totalPages}
                value={page + 1}
                onChange={(value) => setPage(value - 1)}
              />
            </Group>
          )}
        </Stack>
      </Card>
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Container>
  );
};

export default RoleGrid;