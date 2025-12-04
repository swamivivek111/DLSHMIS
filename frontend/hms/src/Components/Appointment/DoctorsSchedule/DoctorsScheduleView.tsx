import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { DoctorScheduleServices } from '../../../Services/DoctorScheduleServices';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import DoctorsScheduleGrid from './DoctorsScheduleGrid';

export default function DoctorsScheduleView() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      DoctorScheduleServices.getScheduleById(Number(id))
        .then((data) => {
          console.log('Schedule data:', data);
          setSchedule(data);
        })
        .catch((error) => {
          console.error('Error fetching schedule:', error);
          notifications.show({
            title: 'Error',
            message: 'Schedule not found',
            color: 'red',
          });
        });
    }
  }, [id]);

  // If no ID, show the grid view
  if (!id) {
    return (
      <Container size="xl" className="py-4">
        <Title order={2} className="text-gray-800 mb-6">
          Doctor Schedules Management
        </Title>
        <DoctorsScheduleGrid />
      </Container>
    );
  }

  // If loading or no schedule data
  if (!schedule) {
    return (
      <Container size="md" className="mt-8">
        <Card shadow="md" radius="md" p="lg" withBorder>
          <Text ta="center">Loading schedule details...</Text>
        </Card>
      </Container>
    );
  }

  const getStatusBadge = () => {
    if (schedule.isLeave) return <Badge color="orange">Leave</Badge>;
    if (schedule.isHoliday) return <Badge color="red">Holiday</Badge>;
    if (!schedule.isAvailable) return <Badge color="gray">Unavailable</Badge>;
    return <Badge color="green">Available</Badge>;
  };

  const getSessionBadge = () => {
    const colors = { MORNING: 'blue', AFTERNOON: 'orange', EVENING: 'purple' };
    return <Badge color={colors[schedule.sessionType as keyof typeof colors] || 'gray'}>{schedule.sessionType}</Badge>;
  };

  return (
    <Container size="md" className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          shadow="md"
          radius="md"
          p="lg"
          withBorder
          className="bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <Title order={2} className="text-[#202A44] mb-4">
            Dr. {schedule.doctorName} - Schedule Details
          </Title>

          <Divider mb="md" />

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Doctor:</strong> Dr. {schedule.doctorName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Date:</strong> {new Date(schedule.scheduleDate).toLocaleDateString()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Session:</strong> {getSessionBadge()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Time:</strong> {schedule.startTime} - {schedule.endTime}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Max Patients:</strong> {schedule.maxPatients}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Status:</strong> {getStatusBadge()}
              </Text>
            </Grid.Col>
            {schedule.slotDuration && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Text>
                  <strong>Slot Duration:</strong> {schedule.slotDuration} minutes
                </Text>
              </Grid.Col>
            )}
            {schedule.leaveReason && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Leave Reason:</strong> {schedule.leaveReason}
                </Text>
              </Grid.Col>
            )}
            {schedule.holidayReason && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Holiday Reason:</strong> {schedule.holidayReason}
                </Text>
              </Grid.Col>
            )}
            {schedule.notes && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Notes:</strong> {schedule.notes}
                </Text>
              </Grid.Col>
            )}
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/appointments/schedule')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}
