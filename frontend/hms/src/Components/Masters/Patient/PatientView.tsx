import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Patient } from '../../Types/Patient';
import { PatientProfileService } from '../../../Services/PatientProfileService';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function PatientView() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      PatientProfileService.getPatientById(Number(id))
        .then((data) => {
          setPatient(data);
        })
        .catch(() => {
          notifications.show({
            title: 'Error',
            message: 'Patient not found',
            color: 'red',
          });
          navigate('/admin/dashboard/registration');
        });
    }
  }, [id]);

  if (!patient) return null;

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
            {patient.prefix} {patient.firstName} {patient.middleName} {patient.lastName}
          </Title>

          <Divider mb="md" />

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>PRN No:</strong> {patient.prnNo}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Prefix:</strong> {patient.prefix}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>First Name:</strong> {patient.firstName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Middle Name:</strong> {patient.middleName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Last Name:</strong> {patient.lastName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Gender:</strong>{' '}
                <Badge color={patient.gender === 'Male' ? 'blue' : patient.gender === 'Female' ? 'pink' : 'gray'}>
                  {patient.gender}
                </Badge>
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Age:</strong> {patient.age} years
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Mobile Number:</strong> {patient.mobileNumber}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Aadhar Number:</strong> {patient.aadharNumber}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Address:</strong> {patient.address}
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/dashboard/registration')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}