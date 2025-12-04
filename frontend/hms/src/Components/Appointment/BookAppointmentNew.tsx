import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Select,
  DateInput,
  Grid,
  Badge,
  Avatar,
  Container,
  Paper,
  Divider,
  Alert,
  TextInput,
  LoadingOverlay,
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconClock, IconUser, IconStethoscope, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { DoctorServices } from '../../Services/DoctorServices';
import { AppointmentServices } from '../../Services/AppointmentServices';
import { PatientProfileService } from '../../Services/PatientProfileService';

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  department: string;
  experience: number;
  consultationFee: number;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookAppointmentNew: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      patientId: '',
      doctorId: '',
      appointmentDate: null,
      timeSlot: '',
      reason: '',
      appointmentType: 'CONSULTATION',
    },
    validate: {
      patientId: (value) => (!value ? 'Please select a patient' : null),
      doctorId: (value) => (!value ? 'Please select a doctor' : null),
      appointmentDate: (value) => (!value ? 'Please select a date' : null),
      timeSlot: (value) => (!value ? 'Please select a time slot' : null),
      reason: (value) => (!value ? 'Please provide a reason for appointment' : null),
    },
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API calls
      const mockDoctors: Doctor[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          specialization: 'Cardiology',
          department: 'Cardiology',
          experience: 10,
          consultationFee: 500,
        },
        {
          id: 2,
          firstName: 'Sarah',
          lastName: 'Johnson',
          specialization: 'Dermatology',
          department: 'Dermatology',
          experience: 8,
          consultationFee: 400,
        },
      ];

      const mockPatients: Patient[] = [
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Brown',
          email: 'alice@example.com',
          phoneNumber: '9876543210',
        },
        {
          id: 2,
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob@example.com',
          phoneNumber: '9876543211',
        },
      ];

      setDoctors(mockDoctors);
      setPatients(mockPatients);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load data',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = async (doctorId: string) => {
    const doctor = doctors.find(d => d.id.toString() === doctorId);
    setSelectedDoctor(doctor || null);
    form.setFieldValue('doctorId', doctorId);
    form.setFieldValue('timeSlot', '');
    
    if (form.values.appointmentDate && doctorId) {
      await loadAvailableSlots(doctorId, form.values.appointmentDate);
    }
  };

  const handleDateChange = async (date: Date | null) => {
    form.setFieldValue('appointmentDate', date);
    form.setFieldValue('timeSlot', '');
    
    if (date && form.values.doctorId) {
      await loadAvailableSlots(form.values.doctorId, date);
    }
  };

  const loadAvailableSlots = async (doctorId: string, date: Date) => {
    try {
      setSlotsLoading(true);
      // Mock time slots - replace with actual API call
      const mockSlots: TimeSlot[] = [
        { time: '09:00', available: Math.random() > 0.3 },
        { time: '09:30', available: Math.random() > 0.3 },
        { time: '10:00', available: Math.random() > 0.3 },
        { time: '10:30', available: Math.random() > 0.3 },
        { time: '11:00', available: Math.random() > 0.3 },
        { time: '11:30', available: Math.random() > 0.3 },
        { time: '14:00', available: Math.random() > 0.3 },
        { time: '14:30', available: Math.random() > 0.3 },
        { time: '15:00', available: Math.random() > 0.3 },
        { time: '15:30', available: Math.random() > 0.3 },
        { time: '16:00', available: Math.random() > 0.3 },
        { time: '16:30', available: Math.random() > 0.3 },
      ];
      setAvailableSlots(mockSlots);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load available slots',
        color: 'red',
      });
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const appointmentData = {
        ...values,
        appointmentDate: values.appointmentDate.toISOString().split('T')[0],
        status: 'SCHEDULED',
      };
      
      // Mock API call - replace with actual service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notifications.show({
        title: 'Success',
        message: 'Appointment booked successfully!',
        color: 'green',
        icon: <IconCheck />,
      });
      
      form.reset();
      setSelectedDoctor(null);
      setAvailableSlots([]);
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to book appointment',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl" className="py-4">
      <Paper shadow="sm" radius="md" p="xl" pos="relative">
        <LoadingOverlay visible={loading} />
        
        <Title order={2} ta="center" mb="xl" className="text-gray-800">
          Book Appointment
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="lg">
                {/* Patient and Doctor Selection */}
                <Card shadow="xs" padding="md" radius="md" withBorder>
                  <Title order={4} mb="md">Patient & Doctor Information</Title>
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="Select Patient"
                        placeholder="Choose a patient"
                        data={patients.map(p => ({
                          value: p.id.toString(),
                          label: `${p.firstName} ${p.lastName} - ${p.phoneNumber}`,
                        }))}
                        {...form.getInputProps('patientId')}
                        searchable
                        required
                        leftSection={<IconUser size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="Select Doctor"
                        placeholder="Choose a doctor"
                        data={doctors.map(d => ({
                          value: d.id.toString(),
                          label: `Dr. ${d.firstName} ${d.lastName} - ${d.specialization}`,
                        }))}
                        {...form.getInputProps('doctorId')}
                        onChange={handleDoctorChange}
                        searchable
                        required
                        leftSection={<IconStethoscope size={16} />}
                      />
                    </Grid.Col>
                  </Grid>
                </Card>

                {/* Date and Type Selection */}
                <Card shadow="xs" padding="md" radius="md" withBorder>
                  <Title order={4} mb="md">Appointment Details</Title>
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <DateInput
                        label="Appointment Date"
                        placeholder="Select date"
                        leftSection={<IconCalendar size={16} />}
                        {...form.getInputProps('appointmentDate')}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label="Appointment Type"
                        data={[
                          { value: 'CONSULTATION', label: 'Consultation' },
                          { value: 'FOLLOW_UP', label: 'Follow-up' },
                          { value: 'EMERGENCY', label: 'Emergency' },
                          { value: 'ROUTINE_CHECKUP', label: 'Routine Checkup' },
                        ]}
                        {...form.getInputProps('appointmentType')}
                      />
                    </Grid.Col>
                  </Grid>
                  
                  <TextInput
                    label="Reason for Appointment"
                    placeholder="Describe the reason for this appointment"
                    {...form.getInputProps('reason')}
                    required
                    mt="md"
                  />
                </Card>

                {/* Time Slots */}
                {availableSlots.length > 0 && (
                  <Card shadow="xs" padding="md" radius="md" withBorder pos="relative">
                    <LoadingOverlay visible={slotsLoading} />
                    <Title order={4} mb="md">
                      <Group>
                        <IconClock size={20} />
                        Available Time Slots
                      </Group>
                    </Title>
                    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={form.values.timeSlot === slot.time ? 'filled' : 'outline'}
                          color={form.values.timeSlot === slot.time ? 'blue' : slot.available ? 'gray' : 'red'}
                          disabled={!slot.available}
                          onClick={() => form.setFieldValue('timeSlot', slot.time)}
                          size="sm"
                          className="transition-all duration-200"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </SimpleGrid>
                    {form.errors.timeSlot && (
                      <Text size="sm" c="red" mt="xs">{form.errors.timeSlot}</Text>
                    )}
                  </Card>
                )}
              </Stack>
            </Grid.Col>

            {/* Doctor Info and Summary */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Stack gap="md">
                {selectedDoctor && (
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">Doctor Information</Title>
                    <Stack gap="sm">
                      <Group>
                        <Avatar size={60} radius="md" color="blue">
                          <IconStethoscope size={30} />
                        </Avatar>
                        <div>
                          <Text fw={500} size="lg">
                            Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {selectedDoctor.specialization}
                          </Text>
                        </div>
                      </Group>
                      
                      <Divider />
                      
                      <Group justify="space-between">
                        <Text size="sm">Department:</Text>
                        <Badge variant="light" color="blue">{selectedDoctor.department}</Badge>
                      </Group>
                      
                      <Group justify="space-between">
                        <Text size="sm">Experience:</Text>
                        <Text size="sm" fw={500}>{selectedDoctor.experience} years</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Text size="sm">Consultation Fee:</Text>
                        <Text size="sm" fw={500} c="green">
                          ₹{selectedDoctor.consultationFee}
                        </Text>
                      </Group>
                    </Stack>
                  </Card>
                )}

                {form.values.appointmentDate && form.values.timeSlot && selectedDoctor && (
                  <Alert icon={<IconAlertCircle size={16} />} title="Appointment Summary" color="blue">
                    <Stack gap="xs">
                      <Text size="sm">
                        <strong>Date:</strong> {form.values.appointmentDate.toDateString()}
                      </Text>
                      <Text size="sm">
                        <strong>Time:</strong> {form.values.timeSlot}
                      </Text>
                      <Text size="sm">
                        <strong>Doctor:</strong> Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                      </Text>
                      <Text size="sm">
                        <strong>Type:</strong> {form.values.appointmentType}
                      </Text>
                      <Text size="sm">
                        <strong>Fee:</strong> ₹{selectedDoctor.consultationFee}
                      </Text>
                    </Stack>
                  </Alert>
                )}
              </Stack>
            </Grid.Col>
          </Grid>

          <Group justify="center" mt="xl">
            <Button type="submit" loading={loading} size="md" leftSection={<IconCheck size={16} />}>
              Book Appointment
            </Button>
            <Button variant="outline" onClick={() => {
              form.reset();
              setSelectedDoctor(null);
              setAvailableSlots([]);
            }}>
              Reset Form
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default BookAppointmentNew;