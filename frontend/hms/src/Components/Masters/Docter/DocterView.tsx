import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Doctor } from '../../Types/Doctor';
import { getDoctorById } from '../../../Services/DoctorServices';
import { getDepartmentById } from '../../../Services/DepartmentServices';
import { getCityById } from '../../../Services/CityServices';
import { getDistrictById } from '../../../Services/DistrictServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function DoctorView() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [departmentName, setDepartmentName] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [districtName, setDistrictName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorById(Number(id))
      .then((doc) => {
        setDoctor(doc);
        if (doc.departmentId) {
          getDepartmentById(doc.departmentId)
            .then((dept) => setDepartmentName(dept.name || 'Unknown Department'))
            .catch(() => setDepartmentName('Unknown Department'));
        }
        if (doc.cityId) {
          getCityById(doc.cityId)
            .then((city) => setCityName(city.cityName || 'Unknown City'))
            .catch(() => setCityName('Unknown City'));
        }
        if (doc.districtId) {
          getDistrictById(doc.districtId)
            .then((district) => setDistrictName(district.districtName || 'Unknown District'))
            .catch(() => setDistrictName('Unknown District'));
        }
      })
      .catch(() => errorNotification('Doctor not found'));
  }, [id]);

  if (!doctor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {doctor.name} Doctor
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Name:</strong> {doctor.name}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Code:</strong> {doctor.code}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Type:</strong> {doctor.type || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Specialization:</strong> {doctor.specialization || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Department:</strong> {departmentName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Qualification:</strong> {doctor.qualification || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Email:</strong> {doctor.emailId || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Contact:</strong> {doctor.contactNumber || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Consultation Fees:</strong> ₹{doctor.firstConsultationFees || 0}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Follow-up Fees:</strong> ₹{doctor.followUpFees || 0}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Joining Date:</strong> {doctor.joiningDate || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>PAN No:</strong> {doctor.panno || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Address:</strong> {doctor.address || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>City:</strong> {cityName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>District:</strong> {districtName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Doctor Share:</strong> {doctor.doctorShare || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={doctor.active ? 'green' : 'red'}>
                  {doctor.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Created At:</strong> {doctor.createdAt ? new Date(doctor.createdAt).toLocaleString() : 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Updated At:</strong> {doctor.updatedAt ? new Date(doctor.updatedAt).toLocaleString() : 'N/A'}
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/doctors')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
