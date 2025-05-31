import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartmentById, updateDepartment } from '../../../Services/DepartmentServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function DepartmentFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      code: '',
      headOfDepartment: '',
      contactNumber: '',
      description: '',
      hospitalId: 1,
    },
    validate: {
      name: v => (v.length < 2 ? 'Required' : null),
      code: v => (v.length < 1 ? 'Code is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit) {
      getDepartmentById(Number(id)).then(form.setValues).catch(() => errorNotification('Not found'));
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (isEdit) {
        await updateDepartment(Number(id), values);
        successNotification('Updated');
      } else {
        await createDepartment(values);
        successNotification('Created');
      }
      navigate('/admin/mastersettings/departments');
    } catch {
        errorNotification('Failed');
    }
  });

  return (
    <Container>
      <Title order={2} mb="md">
        {isEdit ? 'Edit Department' : 'Add Department'}
      </Title>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Code" withAsterisk {...form.getInputProps('code')} />
        <TextInput label="Head of Department" {...form.getInputProps('headOfDepartment')} />
        <TextInput label="Contact Number" {...form.getInputProps('contactNumber')} />
        <Textarea label="Description" {...form.getInputProps('description')} />
        <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
        <Button variant="subtle" onClick={() => navigate('/admin/mastersettings/departments')} ml="sm">
          Back
        </Button>
      </form>
    </Container>
  );
}
