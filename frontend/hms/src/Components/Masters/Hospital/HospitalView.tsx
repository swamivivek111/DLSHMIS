import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Hospital } from '../../Types/Hospital';
import { getHospitalById } from '../../../Services/HospitalServices';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function HospitalView() {
  const { id } = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getHospitalById(Number(id))
        .then((data) => {
          setHospital(data);
        })
        .catch(() => {
          notifications.show({
            title: 'Error',
            message: 'Hospital not found',
            color: 'red',
          });
          navigate('/admin/mastersettings/hospitals');
        });
    }
  }, [id]);

  if (!hospital) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text ta="center">Loading hospital details...</Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {hospital.hospitalName}
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Hospital Code:</strong> {hospital.hospitalCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Hospital Name:</strong> {hospital.hospitalName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Type:</strong> {hospital.hospitalType}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={hospital.active ? 'green' : 'red'}>
                  {hospital.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Address:</strong> {hospital.address}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>City:</strong> {hospital.city}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>State:</strong> {hospital.state}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Country:</strong> {hospital.country}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Phone:</strong> {hospital.phoneNumber}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Email:</strong> {hospital.emailId}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Total Beds:</strong> {hospital.totalBeds}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>ICU Beds:</strong> {hospital.icuBeds}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Emergency Beds:</strong> {hospital.emergencyBeds}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>License Number:</strong> {hospital.licenseNumber}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Accreditation:</strong> {hospital.accreditation}
              </Text>
            </Grid.Col>
            {hospital.specialties && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Specialties:</strong> {hospital.specialties}
                </Text>
              </Grid.Col>
            )}
            {hospital.description && (
              <Grid.Col span={12}>
                <Text>
                  <strong>Description:</strong> {hospital.description}
                </Text>
              </Grid.Col>
            )}
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/hospitals')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}