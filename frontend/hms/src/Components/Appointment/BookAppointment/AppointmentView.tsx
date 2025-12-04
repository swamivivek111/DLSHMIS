import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { AppointmentServices } from '../../../Services/AppointmentServices';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function AppointmentView() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      AppointmentServices.getAppointmentById(Number(id))
        .then((data) => {
          setAppointment(data);
        })
        .catch(() => {
          notifications.show({
            title: 'Error',
            message: 'Appointment not found',
            color: 'red',
          });
          navigate('/admin/appointments/bookappointment');
        });
    }
  }, [id]);

  if (!appointment) {
    return (
      <Container size="md" className="mt-8">
        <Card shadow="md" radius="md" p="lg" withBorder>
          <Text ta="center">Loading appointment details...</Text>
        </Card>
      </Container>
    );
  }

  const getStatusBadge = () => {
    const colors = { SCHEDULED: 'blue', COMPLETED: 'green', CANCELLED: 'red', RESCHEDULED: 'orange' };
    return <Badge color={colors[appointment.status as keyof typeof colors] || 'gray'}>{appointment.status}</Badge>;
  };

  const getSessionBadge = () => {
    const colors = { MORNING: 'blue', AFTERNOON: 'orange', EVENING: 'purple' };
    return <Badge color={colors[appointment.sessionType as keyof typeof colors] || 'gray'}>{appointment.sessionType}</Badge>;
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
            Appointment - {appointment.patientName}
          </Title>

          <Divider mb="md" />

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Patient:</strong> {appointment.patientName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Doctor:</strong> {appointment.doctorName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Department:</strong> {appointment.departmentName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Session:</strong> {getSessionBadge()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Time Slot:</strong> {appointment.timeSlot}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Status:</strong> {getStatusBadge()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Booked By:</strong> {appointment.bookedBy || 'N/A'}
              </Text>
            </Grid.Col>
            {appointment.notes && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Notes:</strong> {appointment.notes}
                </Text>
              </Grid.Col>
            )}
            <Grid.Col span={12}>
              <Text>
                <strong>Created At:</strong> {appointment.createdAt ? new Date(appointment.createdAt).toLocaleString() : 'N/A'}
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/appointments/bookappointment')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}