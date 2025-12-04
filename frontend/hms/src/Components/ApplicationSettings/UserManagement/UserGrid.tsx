import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  TextInput,
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
import { UserManagement, UserManagementServices } from '../../../Services/UserManagementServices';

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  const exportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Role,Status\n" +
      users.map(user => 
        `"${user.name}","${user.email}","${user.userRole?.roleName || user.role || 'No Role'}","${user.active ? 'Active' : 'Inactive'}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await UserManagementServices.getAllUsers(page, 10, search);
      setUsers(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load users',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await UserManagementServices.deleteUser(id);
        notifications.show({
          title: 'Success',
          message: 'User deleted successfully',
          color: 'green',
        });
        loadUsers();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete user',
          color: 'red',
        });
      }
    }
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Badge color="blue" variant="light">
          {user.userRole?.roleName || user.role || 'No Role'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={user.active ? 'green' : 'red'} variant="light">
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="light"
            color="orange"
            onClick={() => navigate(`/admin/applicationsettings/users/edit/${user.id}`)}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="red"
            onClick={() => handleDelete(user.id!)}
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
            <Title order={3}>User Management</Title>
            <Group>
              <Button
                variant="outline"
                leftSection={<IconDownload size={16} />}
                onClick={exportUsers}
                disabled={users.length === 0}
              >
                Export
              </Button>
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={() => navigate('/admin/applicationsettings/users/add')}
              >
                Add User
              </Button>
            </Group>
          </Group>

          <TextInput
            placeholder="Search users..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
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
                      <Text ta="center">No users found</Text>
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

          <Text size="sm" c="dimmed">
            Total: {totalElements} users
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default UserGrid;