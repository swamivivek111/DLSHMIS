import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Container,
  Radio,
  TextInput,
  Textarea,
  Grid,
} from '@mantine/core';


import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getDoctor } from '../../../Services/DoctorServices';

interface TimeSlot {
  value: string;
  label: string;
  session: string;
}

const AppointmentForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm({
    initialValues: {
      departmentId: '',
      doctorId: '',
      patientId: '',
      patientName: '',
      appointmentDate: null,
      timeSlot: '',
      notes: '',
    },
    validate: {
      departmentId: (value) => (!value ? 'Department is required' : null),
      doctorId: (value) => (!value ? 'Doctor is required' : null),
      appointmentDate: (value) => (!value ? 'Appointment date is required' : null),
      timeSlot: (value) => (!value ? 'Time slot is required' : null),
    },
  });

  useEffect(() => {
    loadDepartments();
    loadPatients();
    if (isEdit && id) {
      loadAppointment();
    }
  }, [id, isEdit]);

  const loadAppointment = async () => {
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      const appointment = await AppointmentServices.getAppointmentById(parseInt(id!));
      
      form.setValues({
        departmentId: appointment.departmentId?.toString() || '',
        doctorId: appointment.doctorId?.toString() || '',
        patientId: appointment.patientId?.toString() || '',
        patientName: appointment.patientName || '',
        appointmentDate: appointment.appointmentDate ? new Date(appointment.appointmentDate) : null,
        timeSlot: appointment.timeSlot || '',
        notes: appointment.notes || '',
      });
      
      // Load dependent data
      if (appointment.departmentId) {
        await loadDoctors(appointment.departmentId.toString());
      }
      if (appointment.doctorId && appointment.appointmentDate) {
        await loadTimeSlots(appointment.doctorId.toString(), new Date(appointment.appointmentDate));
      }
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to load appointment',
        color: 'red',
      });
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartment(1, 100, '');
      setDepartments(res.data.map((dept: any) => ({
        value: dept.id.toString(),
        label: dept.name,
      })));
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to load departments',
        color: 'red',
      });
    }
  };

  const loadDoctors = async (departmentId: string) => {
    try {
      const res = await getDoctor(1, 100, '');
      const filteredDoctors = res.data.filter((doc: any) => 
        doc.departmentId?.toString() === departmentId
      );
      setDoctors(filteredDoctors.map((doc: any) => ({
        value: doc.doctorId.toString(),
        label: `Dr. ${doc.name} - ${doc.specialization}`,
      })));
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to load doctors',
        color: 'red',
      });
    }
  };

  const loadPatients = async () => {
    // Mock patients - replace with actual API
    const mockPatients = [
      { value: '1', label: 'John Doe' },
      { value: '2', label: 'Jane Smith' },
      { value: '3', label: 'Bob Johnson' },
    ];
    setPatients(mockPatients);
  };

  const loadTimeSlots = async (doctorId: string, date: Date) => {
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      const dateStr = date.toISOString().split('T')[0];
      
      // Get doctor schedule and booked slots
      const [schedule, bookedSlots] = await Promise.all([
        AppointmentServices.getDoctorSchedule(parseInt(doctorId), dateStr),
        AppointmentServices.getBookedTimeSlots(parseInt(doctorId), dateStr)
      ]);
      
      console.log('Booked slots:', bookedSlots);
      
      const slots: TimeSlot[] = [];
      
      // Generate slots based on actual schedule
      if (schedule.morning) {
        const morningSlots = generateTimeSlots(
          schedule.morning.startTime,
          schedule.morning.endTime,
          schedule.morning.slotDuration || 15,
          'MORNING'
        );
        slots.push(...morningSlots);
      }

      if (schedule.afternoon) {
        const afternoonSlots = generateTimeSlots(
          schedule.afternoon.startTime,
          schedule.afternoon.endTime,
          schedule.afternoon.slotDuration || 15,
          'AFTERNOON'
        );
        slots.push(...afternoonSlots);
      }

      if (schedule.evening) {
        const eveningSlots = generateTimeSlots(
          schedule.evening.startTime,
          schedule.evening.endTime,
          schedule.evening.slotDuration || 15,
          'EVENING'
        );
        slots.push(...eveningSlots);
      }

      // Remove duplicates from booked slots and filter out booked slots
      const uniqueBookedSlots = [...new Set(bookedSlots)];
      console.log('Unique booked slots:', uniqueBookedSlots);
      console.log('All generated slots:', slots.map(s => s.value));
      
      const availableSlots = slots.filter(slot => !uniqueBookedSlots.includes(slot.value));
      console.log('Available slots after filtering:', availableSlots.map(s => s.value));
      
      setTimeSlots(availableSlots);
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to load available time slots',
        color: 'red',
      });
    }
  };

  const generateTimeSlots = (startTime: string, endTime: string, duration: number, session: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    
    let current = new Date(start);
    while (current < end) {
      const slotStart = current.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      current.setMinutes(current.getMinutes() + duration);
      
      const slotEnd = current.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      slots.push({
        value: `${slotStart} - ${slotEnd}`,
        label: `${slotStart} - ${slotEnd}`,
        session
      });
    }
    
    return slots;
  };

  const handleDepartmentChange = (value: string | null) => {
    form.setFieldValue('departmentId', value || '');
    form.setFieldValue('doctorId', '');
    setDoctors([]);
    setTimeSlots([]);
    if (value) {
      loadDoctors(value);
    }
  };

  const handleDoctorChange = (value: string | null) => {
    form.setFieldValue('doctorId', value || '');
    form.setFieldValue('timeSlot', '');
    setTimeSlots([]);
    if (value && form.values.appointmentDate) {
      loadTimeSlots(value, form.values.appointmentDate);
    }
  };

  const handleDateChange = (date: Date | null) => {
    form.setFieldValue('appointmentDate', date);
    form.setFieldValue('timeSlot', '');
    setTimeSlots([]);
    if (date && form.values.doctorId) {
      loadTimeSlots(form.values.doctorId, date);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      
      const appointmentData = {
        patientId: values.patientId ? parseInt(values.patientId) : undefined,
        patientName: values.patientName || patients.find(p => p.value === values.patientId)?.label || '',
        doctorId: parseInt(values.doctorId),
        doctorName: doctors.find(d => d.value === values.doctorId)?.label || '',
        departmentId: parseInt(values.departmentId),
        departmentName: departments.find(d => d.value === values.departmentId)?.label || '',
        appointmentDate: values.appointmentDate.toISOString(),
        timeSlot: values.timeSlot,
        sessionType: timeSlots.find(slot => slot.value === values.timeSlot)?.session || '',
        notes: values.notes,
        bookedBy: 'Admin' // Get from user context
      };

      if (isEdit) {
        await AppointmentServices.updateAppointment(parseInt(id!), appointmentData);
        notifications.show({
          title: 'Success',
          message: 'Appointment updated successfully!',
          color: 'green',
        });
      } else {
        await AppointmentServices.createAppointment(appointmentData);
        notifications.show({
          title: 'Success',
          message: 'Appointment booked successfully!',
          color: 'green',
        });
      }
      
      navigate('/admin/appointments/bookappointment');
    } catch (error: any) {
      let errorMessage = isEdit ? 'Failed to update appointment' : 'Failed to book appointment';
      
      if (error?.response?.data?.error) {
        const serverError = error.response.data.error;
        if (serverError.includes('Patient already has a scheduled appointment')) {
          errorMessage = `${values.patientName || 'This patient'} already has a scheduled appointment with ${doctors.find(d => d.value === values.doctorId)?.label || 'this doctor'}. Please check existing appointments or choose a different doctor.`;
        } else if (serverError.includes('Time slot is already booked')) {
          errorMessage = 'This time slot is already booked. Please select a different time slot.';
        } else {
          errorMessage = serverError;
        }
      }
      
      notifications.show({
        title: 'Booking Failed',
        message: errorMessage,
        color: 'red',
        autoClose: 8000,
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.session]) acc[slot.session] = [];
    acc[slot.session].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <Container size="lg" py="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>
            {isEdit ? 'Edit Appointment' : 'Book New Appointment'}
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Department"
                    placeholder="Select department"
                    data={departments}
                    value={form.values.departmentId}
                    onChange={handleDepartmentChange}
                    withAsterisk
                    searchable
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Doctor"
                    placeholder="Select doctor"
                    data={doctors}
                    value={form.values.doctorId}
                    onChange={handleDoctorChange}
                    withAsterisk
                    searchable
                    disabled={!form.values.departmentId}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Patient"
                    placeholder="Select patient"
                    data={patients}
                    {...form.getInputProps('patientId')}
                    searchable
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Or Enter Patient Name"
                    placeholder="Enter patient name"
                    {...form.getInputProps('patientName')}
                  />
                </Grid.Col>
              </Grid>

              <DateInput
                label="Appointment Date"
                placeholder="Select date"
                value={form.values.appointmentDate}
                onChange={handleDateChange}
                minDate={new Date()}
                withAsterisk
              />

              {timeSlots.length > 0 && (
                <div>
                  <Title order={5} mb="sm">Available Time Slots</Title>
                  <div>
                    {Object.entries(groupedSlots).map(([session, slots]) => (
                      <div key={session}>
                        <Title order={6} mt="md" mb="xs" c="dimmed">
                          {session} Session
                        </Title>
                        <Grid>
                          {slots.map((slot) => (
                            <Grid.Col key={slot.value} span={{ base: 12, sm: 6, md: 4 }}>
                              <div
                                onClick={() => form.setFieldValue('timeSlot', slot.value)}
                                style={{
                                  padding: '12px 16px',
                                  border: `2px solid ${form.values.timeSlot === slot.value ? 'rgb(249, 115, 22)' : 'rgb(32, 42, 68)'}`,
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  backgroundColor: form.values.timeSlot === slot.value ? 'rgb(249, 115, 22)' : '#f8f9fa',
                                  color: form.values.timeSlot === slot.value ? 'white' : 'rgb(32, 42, 68)',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  transition: 'all 0.2s ease',
                                  boxShadow: form.values.timeSlot === slot.value ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                  if (form.values.timeSlot !== slot.value) {
                                    e.target.style.backgroundColor = 'rgba(32, 42, 68, 0.1)';
                                    e.target.style.borderColor = 'rgb(32, 42, 68)';
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 2px 8px rgba(32, 42, 68, 0.15)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (form.values.timeSlot !== slot.value) {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                    e.target.style.borderColor = 'rgb(32, 42, 68)';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                  }
                                }}
                              >
                                {slot.label}
                              </div>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Textarea
                label="Notes"
                placeholder="Additional notes"
                {...form.getInputProps('notes')}
                minRows={3}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/appointments/bookappointment')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  loading={loading}
                  variant="outline"
                >
                  {isEdit ? 'Update' : 'Book'} Appointment
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default AppointmentForm;