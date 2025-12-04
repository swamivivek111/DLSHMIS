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
  Textarea,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { Role, RoleServices } from '../../../Services/RoleServices';

const RoleForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm<Role>({
    initialValues: {
      roleName: '',
      description: '',
      category: '',
      active: true,
    },
    validate: {
      roleName: (value) => (!value ? 'Role name is required' : null),
      category: (value) => (!value ? 'Category is required' : null),
    },
  });

  const categories = [
    { value: 'Administrative', label: 'Administrative' },
    { value: 'Clinical', label: 'Clinical' },
    { value: 'Nursing', label: 'Nursing & Patient Care' },
    { value: 'Laboratory', label: 'Laboratory & Diagnostic' },
    { value: 'Pharmacy', label: 'Pharmacy & Medication' },
    { value: 'Support', label: 'Support & Facility' },
    { value: 'Emergency', label: 'Emergency / ICU' },
    { value: 'Billing', label: 'Billing / Insurance' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadRole();
    }
  }, [id, isEdit]);

  const loadRole = async () => {
    try {
      const role = await RoleServices.getRoleById(Number(id));
      form.setValues(role);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load role',
        color: 'red',
      });
    }
  };

  const handleSubmit = async (values: Role) => {
    setLoading(true);
    try {
      if (isEdit) {
        await RoleServices.updateRole(Number(id), values);
        notifications.show({
          title: 'Success',
          message: 'Role updated successfully!',
          color: 'green',
        });
      } else {
        await RoleServices.createRole(values);
        notifications.show({
          title: 'Success',
          message: 'Role created successfully!',
          color: 'green',
        });
      }
      navigate('/admin/applicationsettings/roles');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save role',
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
            {isEdit ? 'Edit Role' : 'Create New Role'}
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Role Name"
                placeholder="Enter role name"
                {...form.getInputProps('roleName')}
                required
              />

              <Select
                label="Category"
                placeholder="Select category"
                data={categories}
                {...form.getInputProps('category')}
                required
              />

              <Textarea
                label="Description"
                placeholder="Enter role description"
                {...form.getInputProps('description')}
                minRows={3}
              />

              <Switch
                label="Active"
                {...form.getInputProps('active', { type: 'checkbox' })}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/applicationsettings/roles')}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} variant="outline">
                  {isEdit ? 'Update' : 'Create'} Role
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default RoleForm;