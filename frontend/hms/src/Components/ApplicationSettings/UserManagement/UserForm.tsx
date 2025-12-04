import React, { useState, useEffect } from 'react';
import {
  Card,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Container,
  Switch,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { UserManagement, UserManagementServices } from '../../../Services/UserManagementServices';
import { RoleServices } from '../../../Services/RoleServices';

const UserForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm<UserManagement & { confirmPassword?: string }>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      active: true,
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
      email: (value) => (!value ? 'Email is required' : null),
      password: (value) => (!isEdit && !value ? 'Password is required' : null),
      confirmPassword: (value, values) => {
        if (isEdit && values.password && value !== values.password) {
          return 'Passwords do not match';
        }
        return null;
      },
    },
  });

  useEffect(() => {
    loadRoles();
    if (isEdit && id) {
      loadUser();
    }
  }, [id, isEdit]);

  const loadRoles = async () => {
    // Use enum values directly since backend expects these specific values
    const enumRoles = [
      { roleName: 'Admin', description: 'Administrator' },
      { roleName: 'Doctor', description: 'Doctor' },
      { roleName: 'Patient', description: 'Patient' }
    ];
    setRoles(enumRoles);
  };

  const loadUser = async () => {
    try {
      const user = await UserManagementServices.getUserById(Number(id));
      console.log('Loaded user:', user);
      form.setValues({
        name: user.name,
        email: user.email,
        role: user.userRole?.roleName || user.role || '',
        active: user.active ?? true,
      });
      console.log('Set role value:', user.userRole?.roleName || user.role || '');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load user',
        color: 'red',
      });
    }
  };

  const handleSubmit = async (values: UserManagement) => {
    setLoading(true);
    try {
      if (isEdit) {
        await UserManagementServices.updateUser(Number(id), values);
        notifications.show({
          title: 'Success',
          message: 'User updated successfully!',
          color: 'green',
        });
      } else {
        await UserManagementServices.createUser(values);
        notifications.show({
          title: 'Success',
          message: 'User created successfully!',
          color: 'green',
        });
      }
      navigate('/admin/applicationsettings/users');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save user',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" className="py-4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>
            {isEdit ? 'Edit User' : 'Create New User'}
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Full Name"
                placeholder="Enter full name"
                {...form.getInputProps('name')}
                required
              />

              <TextInput
                label="Email"
                placeholder="Enter email address"
                type="email"
                {...form.getInputProps('email')}
                required
              />

              {!isEdit && (
                <PasswordInput
                  label="Password"
                  placeholder="Enter password"
                  {...form.getInputProps('password')}
                  required
                />
              )}

              {isEdit && (
                <>
                  <PasswordInput
                    label="New Password (Leave blank to keep current)"
                    placeholder="Enter new password"
                    {...form.getInputProps('password')}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    {...form.getInputProps('confirmPassword')}
                  />
                </>
              )}

              <Select
                label="Role"
                placeholder="Select user role"
                data={roles.map(role => ({
                  value: role.roleName,
                  label: role.roleName,
                }))}
                {...form.getInputProps('role')}
                searchable
              />

              <Switch
                label="Active"
                {...form.getInputProps('active', { type: 'checkbox' })}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/applicationsettings/users')}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} variant="outline">
                  {isEdit ? 'Update' : 'Create'} User
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default UserForm;