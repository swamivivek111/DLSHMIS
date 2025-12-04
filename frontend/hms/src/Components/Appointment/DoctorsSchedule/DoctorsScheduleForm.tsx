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
  Textarea,
  Container,
  Paper,
  Switch,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconClock, IconUser, IconStethoscope } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { DoctorSchedule, DoctorScheduleServices } from '../../../Services/DoctorScheduleServices';
import { getDoctorsForDropdown } from '../../../Services/DoctorServices';

const DoctorsScheduleForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm({
    initialValues: {
      doctorId: 0,
      doctorName: '',
      scheduleDate: '',
      scheduleStartDate: '',
      scheduleEndDate: '',
      dayOfWeek: 'MONDAY',
      scheduleType: 'DAILY',
      slotDuration: 15,
      maxPatients: 20,
      isAvailable: true,
      isHoliday: false,
      isLeave: false,
      leaveReason: '',
      holidayReason: '',
      notes: '',
      active: true,
      // Morning session
      morningEnabled: false,
      morningStartTime: '09:00',
      morningEndTime: '12:00',
      morningMaxPatients: 10,
      // Afternoon session
      afternoonEnabled: false,
      afternoonStartTime: '14:00',
      afternoonEndTime: '17:00',
      afternoonMaxPatients: 10,
      // Evening session
      eveningEnabled: false,
      eveningStartTime: '18:00',
      eveningEndTime: '21:00',
      eveningMaxPatients: 10,
    },
    validate: {
      doctorId: (value) => (value === 0 ? 'Please select a doctor' : null),
      scheduleDate: (value, values) => {
        if (values.scheduleType === 'DAILY' && !value) {
          return 'Please select a date';
        }
        return null;
      },
      scheduleStartDate: (value, values) => {
        if ((values.scheduleType === 'WEEKLY' || values.scheduleType === 'MONTHLY') && !value) {
          return 'Please select start date';
        }
        return null;
      },
      scheduleEndDate: (value, values) => {
        if (values.scheduleType === 'WEEKLY' || values.scheduleType === 'MONTHLY') {
          if (!value) return 'Please select end date';
          if (values.scheduleStartDate && new Date(value) < new Date(values.scheduleStartDate)) {
            return 'End date must be after start date';
          }
        }
        return null;
      },
      maxPatients: (value) => (value < 1 ? 'Must be at least 1 patient' : null),
    },
  });

  useEffect(() => {
    loadDoctors();
    if (isEdit) {
      loadSchedule();
    }
  }, [id]);

  const loadDoctors = async () => {
    try {
      const doctors = await getDoctorsForDropdown();
      setDoctors(doctors || []);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load doctors',
        color: 'red',
      });
    }
  };

  const loadSchedule = async () => {
    try {
      const schedule = await DoctorScheduleServices.getScheduleById(Number(id));
      console.log('Loaded schedule:', schedule);
      
      // Try to load all sessions for this doctor and date
      let allSessions = [schedule];
      try {
        const doctorSchedules = await DoctorScheduleServices.getSchedulesByDate(schedule.scheduleDate);
        allSessions = doctorSchedules.filter(s => s.doctorId === schedule.doctorId) || [schedule];
      } catch (e) {
        console.log('Could not load all sessions, using single schedule');
      }
      
      // Initialize session data
      const sessionData = {
        morningEnabled: false,
        afternoonEnabled: false,
        eveningEnabled: false,
        morningStartTime: '09:00',
        morningEndTime: '12:00',
        morningMaxPatients: 10,
        afternoonStartTime: '14:00',
        afternoonEndTime: '17:00',
        afternoonMaxPatients: 10,
        eveningStartTime: '18:00',
        eveningEndTime: '21:00',
        eveningMaxPatients: 10
      };
      
      // Set data for each session found
      allSessions.forEach(s => {
        if (s.sessionType === 'MORNING') {
          sessionData.morningEnabled = true;
          sessionData.morningStartTime = s.startTime;
          sessionData.morningEndTime = s.endTime;
          sessionData.morningMaxPatients = s.maxPatients;
        } else if (s.sessionType === 'AFTERNOON') {
          sessionData.afternoonEnabled = true;
          sessionData.afternoonStartTime = s.startTime;
          sessionData.afternoonEndTime = s.endTime;
          sessionData.afternoonMaxPatients = s.maxPatients;
        } else if (s.sessionType === 'EVENING') {
          sessionData.eveningEnabled = true;
          sessionData.eveningStartTime = s.startTime;
          sessionData.eveningEndTime = s.endTime;
          sessionData.eveningMaxPatients = s.maxPatients;
        }
      });
      
      form.setValues({
        ...schedule,
        ...sessionData
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load schedule',
        color: 'red',
      });
    }
  };

  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find(d => (d.doctorId || d.id)?.toString() === doctorId);
    if (doctor) {
      form.setFieldValue('doctorId', doctor.doctorId || doctor.id);
      form.setFieldValue('doctorName', doctor.name);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Create schedules for each enabled session
      const schedules = [];
      
      if (values.morningEnabled) {
        schedules.push({
          ...values,
          sessionType: 'MORNING',
          startTime: values.morningStartTime,
          endTime: values.morningEndTime,
          maxPatients: values.morningMaxPatients,
        });
      }
      
      if (values.afternoonEnabled) {
        schedules.push({
          ...values,
          sessionType: 'AFTERNOON',
          startTime: values.afternoonStartTime,
          endTime: values.afternoonEndTime,
          maxPatients: values.afternoonMaxPatients,
        });
      }
      
      if (values.eveningEnabled) {
        schedules.push({
          ...values,
          sessionType: 'EVENING',
          startTime: values.eveningStartTime,
          endTime: values.eveningEndTime,
          maxPatients: values.eveningMaxPatients,
        });
      }
      
      if (schedules.length === 0) {
        notifications.show({
          title: 'Error',
          message: 'Please enable at least one session',
          color: 'red',
        });
        return;
      }
      
      // Save each schedule
      const results = [];
      for (const schedule of schedules) {
        if (isEdit) {
          const result = await DoctorScheduleServices.updateSchedule(Number(id), schedule);
          results.push(result);
        } else {
          const result = await DoctorScheduleServices.createSchedule(schedule);
          results.push(result);
        }
      }
      
      notifications.show({
        title: 'Success',
        message: `Schedule${schedules.length > 1 ? 's' : ''} ${isEdit ? 'updated' : 'created'} successfully!`,
        color: 'green',
      });
      navigate('/admin/appointments/schedule');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save schedule',
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
          {isEdit ? 'Edit Doctor Schedule' : 'Create Doctor Schedule'}
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            {/* Doctor Selection */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Doctor Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Select Doctor"
                    placeholder="Choose a doctor"
                    data={doctors.map(d => ({
                      value: d.doctorId?.toString() || d.id?.toString() || '',
                      label: `Dr. ${d.name} - ${d.specialization || ''}`,
                    }))}
                    value={form.values.doctorId.toString()}
                    onChange={handleDoctorChange}
                    leftSection={<IconStethoscope size={16} />}
                    required
                    searchable
                  />
                </Grid.Col>

              </Grid>
            </Card>

            {/* Date and Basic Details */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Schedule Details</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Schedule Type"
                    data={[
                      { value: 'DAILY', label: 'Daily' },
                      { value: 'WEEKLY', label: 'Weekly' },
                      { value: 'MONTHLY', label: 'Monthly' },
                    ]}
                    {...form.getInputProps('scheduleType')}
                    onChange={(value) => {
                      form.setFieldValue('scheduleType', value);
                      // Reset dates when type changes
                      form.setFieldValue('scheduleDate', '');
                      form.setFieldValue('scheduleStartDate', '');
                      form.setFieldValue('scheduleEndDate', '');
                    }}
                  />
                </Grid.Col>
                {form.values.scheduleType === 'WEEKLY' && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Day of Week"
                      data={[
                        { value: 'MONDAY', label: 'Monday' },
                        { value: 'TUESDAY', label: 'Tuesday' },
                        { value: 'WEDNESDAY', label: 'Wednesday' },
                        { value: 'THURSDAY', label: 'Thursday' },
                        { value: 'FRIDAY', label: 'Friday' },
                        { value: 'SATURDAY', label: 'Saturday' },
                        { value: 'SUNDAY', label: 'Sunday' },
                      ]}
                      {...form.getInputProps('dayOfWeek')}
                      required
                    />
                  </Grid.Col>
                )}
              </Grid>
              
              <Grid mt="md">
                {form.values.scheduleType === 'DAILY' && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <DateInput
                      label="Schedule Date"
                      placeholder="Select specific date"
                      leftSection={<IconCalendar size={16} />}
                      value={form.values.scheduleDate ? new Date(form.values.scheduleDate) : null}
                      onChange={(date) => form.setFieldValue('scheduleDate', date?.toISOString().split('T')[0] || '')}
                      minDate={new Date()}
                      required
                    />
                  </Grid.Col>
                )}
                
                {(form.values.scheduleType === 'WEEKLY' || form.values.scheduleType === 'MONTHLY') && (
                  <>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <DateInput
                        label="Start Date"
                        placeholder="Select start date"
                        leftSection={<IconCalendar size={16} />}
                        value={form.values.scheduleStartDate ? new Date(form.values.scheduleStartDate) : null}
                        onChange={(date) => form.setFieldValue('scheduleStartDate', date?.toISOString().split('T')[0] || '')}
                        minDate={new Date()}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <DateInput
                        label="End Date"
                        placeholder="Select end date"
                        leftSection={<IconCalendar size={16} />}
                        value={form.values.scheduleEndDate ? new Date(form.values.scheduleEndDate) : null}
                        onChange={(date) => form.setFieldValue('scheduleEndDate', date?.toISOString().split('T')[0] || '')}
                        minDate={form.values.scheduleStartDate ? new Date(form.values.scheduleStartDate) : undefined}
                        required
                      />
                    </Grid.Col>
                  </>
                )}
              </Grid>
              
              <Grid mt="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Slot Duration (minutes)"
                    min={5}
                    max={60}
                    step={5}
                    {...form.getInputProps('slotDuration')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Default Max Patients"
                    min={1}
                    max={100}
                    {...form.getInputProps('maxPatients')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Morning Session */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Morning Session</Title>
                <Switch
                  label="Enable Morning"
                  {...form.getInputProps('morningEnabled', { type: 'checkbox' })}
                />
              </Group>
              
              {form.values.morningEnabled && (
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="Start Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('morningStartTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="End Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('morningEndTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <NumberInput
                      label="Max Patients"
                      min={1}
                      max={50}
                      {...form.getInputProps('morningMaxPatients')}
                    />
                  </Grid.Col>
                </Grid>
              )}
            </Card>

            {/* Afternoon Session */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Afternoon Session</Title>
                <Switch
                  label="Enable Afternoon"
                  {...form.getInputProps('afternoonEnabled', { type: 'checkbox' })}
                />
              </Group>
              
              {form.values.afternoonEnabled && (
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="Start Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('afternoonStartTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="End Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('afternoonEndTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <NumberInput
                      label="Max Patients"
                      min={1}
                      max={50}
                      {...form.getInputProps('afternoonMaxPatients')}
                    />
                  </Grid.Col>
                </Grid>
              )}
            </Card>

            {/* Evening Session */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Evening Session</Title>
                <Switch
                  label="Enable Evening"
                  {...form.getInputProps('eveningEnabled', { type: 'checkbox' })}
                />
              </Group>
              
              {form.values.eveningEnabled && (
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="Start Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('eveningStartTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TimeInput
                      label="End Time"
                      leftSection={<IconClock size={16} />}
                      {...form.getInputProps('eveningEndTime')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <NumberInput
                      label="Max Patients"
                      min={1}
                      max={50}
                      {...form.getInputProps('eveningMaxPatients')}
                    />
                  </Grid.Col>
                </Grid>
              )}
            </Card>

            {/* Settings */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Settings</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Switch
                    label="Available"
                    {...form.getInputProps('isAvailable', { type: 'checkbox' })}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Switch
                    label="Holiday"
                    {...form.getInputProps('isHoliday', { type: 'checkbox' })}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Switch
                    label="On Leave"
                    {...form.getInputProps('isLeave', { type: 'checkbox' })}
                  />
                </Grid.Col>
              </Grid>
            </Card>

            {/* Additional Information */}
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Additional Information</Title>
              <Grid>
                {form.values.isLeave && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Leave Reason"
                      placeholder="Enter leave reason"
                      {...form.getInputProps('leaveReason')}
                    />
                  </Grid.Col>
                )}
                {form.values.isHoliday && (
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Holiday Reason"
                      placeholder="Enter holiday reason"
                      {...form.getInputProps('holidayReason')}
                    />
                  </Grid.Col>
                )}
                <Grid.Col span={12}>
                  <Textarea
                    label="Notes"
                    placeholder="Additional notes"
                    {...form.getInputProps('notes')}
                    minRows={2}
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Stack>

          <Group justify="center" mt="xl">
            <Button 
              type="submit" 
              loading={loading} 
              size="md"
              variant="outline"
              disabled={(() => {
                const hasEnabledSession = form.values.morningEnabled || form.values.afternoonEnabled || form.values.eveningEnabled;
                const hasDoctorSelected = form.values.doctorId !== 0;
                const hasValidDate = form.values.scheduleType === 'DAILY' 
                  ? !!form.values.scheduleDate 
                  : !!(form.values.scheduleStartDate && form.values.scheduleEndDate);
                const hasValidWeekDay = form.values.scheduleType !== 'WEEKLY' || !!form.values.dayOfWeek;
                
                return !(hasEnabledSession && hasDoctorSelected && hasValidDate && hasValidWeekDay);
              })()}
            >
              {isEdit ? 'Update Schedule' : 'Save Schedule'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/appointments/schedule')} size="md">
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default DoctorsScheduleForm;