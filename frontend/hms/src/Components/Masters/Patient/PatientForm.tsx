import React, { useState, useEffect } from 'react';
import {
  Card,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Grid,
  NumberInput,
  Container,
  Paper,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconPhone, IconId, IconMapPin } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientProfileService } from '../../../Services/PatientProfileService';
import { PatientFormData } from '../../Types/Patient';
import { DepartmentServices } from '../../../Services/DepartmentServices';
import { DoctorServices } from '../../../Services/DoctorServices';

const PatientForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm<PatientFormData>({
    initialValues: {
      prnNo: '',
      prefix: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      age: undefined,
      mobileNumber: '',
      aadharNumber: '',
      address: '',
      departmentId: '',
      consultingDoctorId: '',
    },
    validate: {
      prnNo: (value) => (!value ? 'PRN No is required' : null),
      prefix: (value) => (!value ? 'Prefix is required' : null),
      firstName: (value) => (!value ? 'First name is required' : null),
      lastName: (value) => (!value ? 'Last name is required' : null),
      gender: (value) => (!value ? 'Gender is required' : null),
      age: (value) => (!value || value <= 0 || value > 120 ? 'Age must be between 1 and 120' : null),
      mobileNumber: (value) => {
        if (!value) return 'Mobile number is required';
        if (!/^[0-9]{10}$/.test(value)) return 'Mobile number must be 10 digits';
        return null;
      },
      aadharNumber: (value) => {
        if (!value) return 'Aadhar number is required';
        if (!/^[0-9]{12}$/.test(value)) return 'Aadhar number must be 12 digits';
        return null;
      },
      address: (value) => (!value ? 'Address is required' : null),
      departmentId: (value) => (!value ? 'Department is required' : null),
      consultingDoctorId: (value) => (!value ? 'Consulting doctor is required' : null),
    },
  });

  useEffect(() => {
    loadMasterData();
    if (isEdit && id) {
      fetchPatient(parseInt(id));
    }
  }, [id, isEdit]);

  const loadMasterData = async () => {
    try {
      // Load departments
      const departmentsData = await DepartmentServices.getAllDepartments();
      setDepartments(departmentsData
        .filter((d: any) => d && d.id && d.departmentName)
        .map((d: any) => ({ 
          value: d.id.toString(), 
          label: d.departmentName || 'Unknown' 
        })));
      
      // Load doctors
      const doctorsData = await DoctorServices.getAllDoctors();
      setDoctors(doctorsData
        .filter((doc: any) => doc && doc.id && doc.name)
        .map((doc: any) => ({ 
          value: doc.id.toString(), 
          label: `Dr. ${doc.name || 'Unknown'}${doc.specialization ? ' - ' + doc.specialization : ''}` 
        })));
    } catch (error) {
      console.error('Failed to load master data:', error);
    }
  };

  const fetchPatient = async (patientId: number) => {
    setLoading(true);
    try {
      const patient = await PatientProfileService.getPatientById(patientId);
      form.setValues(patient);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch patient details',
        color: 'red',
      });
      navigate('/admin/dashboard/registration');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: PatientFormData) => {
    setLoading(true);
    try {
      // Get department and doctor names from master data
      const selectedDepartment = departments.find(d => d.value === values.departmentId);
      const selectedDoctor = doctors.find(d => d.value === values.consultingDoctorId);
      
      const patientData = {
        ...values,
        departmentId: parseInt(values.departmentId),
        departmentName: selectedDepartment?.label || '',
        consultingDoctorId: parseInt(values.consultingDoctorId),
        consultingDoctorName: selectedDoctor?.label || '',
      };
      
      if (isEdit && id) {
        await PatientProfileService.updatePatient({ ...patientData, id: parseInt(id) });
        notifications.show({
          title: 'Success',
          message: 'Patient updated successfully',
          color: 'green',
        });
      } else {
        await PatientProfileService.addPatient(patientData);
        notifications.show({
          title: 'Success',
          message: 'Patient created successfully',
          color: 'green',
        });
      }
      navigate('/admin/dashboard/registration');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEdit ? 'update' : 'create'} patient`,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" className="py-4">
      <Paper shadow="sm" radius="md" p="xl">
        <Title order={2} ta="center" mb="xl" className="text-gray-800">
          {isEdit ? 'Edit Patient Registration' : 'New Patient Registration'}
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            {/* Patient Identification */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Patient Identification</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 12 }}>
                  <TextInput
                    label="PRN No"
                    placeholder="Enter PRN number"
                    leftSection={<IconId size={16} />}
                    {...form.getInputProps('prnNo')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Personal Information */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Personal Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <Select
                    label="Prefix"
                    placeholder="Select prefix"
                    data={[
                      { value: 'Mr.', label: 'Mr.' },
                      { value: 'Mrs.', label: 'Mrs.' },
                      { value: 'Ms.', label: 'Ms.' },
                      { value: 'Dr.', label: 'Dr.' },
                    ]}
                    {...form.getInputProps('prefix')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter first name"
                    leftSection={<IconUser size={16} />}
                    {...form.getInputProps('firstName')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <TextInput
                    label="Middle Name"
                    placeholder="Enter middle name"
                    {...form.getInputProps('middleName')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter last name"
                    {...form.getInputProps('lastName')}
                    required
                  />
                </Grid.Col>
              </Grid>
              
              <Grid mt="md">
                <Grid.Col span={12}>
                  <TextInput
                    label="Full Name"
                    placeholder="Full name will appear here"
                    value={(() => {
                      const parts = [form.values.prefix, form.values.firstName, form.values.middleName, form.values.lastName].filter(Boolean);
                      return parts.length > 0 ? parts.join(' ') : '';
                    })()}
                    readOnly
                    styles={{ input: { backgroundColor: '#f8f9fa', color: '#495057' } }}
                  />
                </Grid.Col>
              </Grid>
              
              <Grid mt="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Gender"
                    placeholder="Select gender"
                    data={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' },
                    ]}
                    {...form.getInputProps('gender')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Age"
                    placeholder="Enter age"
                    min={1}
                    max={120}
                    {...form.getInputProps('age')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Contact Information */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Contact Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    leftSection={<IconPhone size={16} />}
                    maxLength={10}
                    {...form.getInputProps('mobileNumber')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Aadhar Number"
                    placeholder="Enter Aadhar number"
                    leftSection={<IconId size={16} />}
                    maxLength={12}
                    {...form.getInputProps('aadharNumber')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Department & Doctor */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Department & Doctor</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Department"
                    placeholder="Select department"
                    data={departments}
                    {...form.getInputProps('departmentId')}
                    searchable
                    clearable
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Consulting Doctor"
                    placeholder="Select consulting doctor"
                    data={doctors}
                    {...form.getInputProps('consultingDoctorId')}
                    searchable
                    clearable
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Address Information */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Address Information</Title>
              <Textarea
                label="Address"
                placeholder="Enter complete address"
                leftSection={<IconMapPin size={16} />}
                {...form.getInputProps('address')}
                minRows={3}
                required
              />
            </Card>
          </Stack>

          <Group justify="center" mt="xl">
            <Button 
              type="submit" 
              loading={loading} 
              size="md"
              variant="outline"
              disabled={!form.isValid()}
            >
              {isEdit ? 'Update Patient' : 'Register Patient'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/dashboard/registration')} 
              size="md"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default PatientForm;