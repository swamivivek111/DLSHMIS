import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { Department } from '../../Types/Department';
import { getDepartmentById } from '../../../Services/DepartmentServices';
import { getHospitalById } from '../../../Services/HospitalServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function DepartmentView() {
  const { id } = useParams();
  const [department, setDepartment] = useState<Department | null>(null);
  const [hospitalName, setHospitalName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(id))
      .then((dept) => {
        setDepartment(dept);
        if (dept.hospitalId) {
          getHospitalById(dept.hospitalId)
            .then((hospital) => setHospitalName(hospital.name || hospital.hospitalName || 'Unknown Hospital'))
            .catch(() => setHospitalName('Unknown Hospital'));
        }
      })
      .catch(() => errorNotification('Department not found'));
  }, [id]);

  if (!department) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {department.name} Department
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Name:</strong> {department.name}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Code:</strong> {department.code}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Hospital:</strong> {hospitalName || 'Loading...'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Head of Department:</strong> {department.headOfDepartment || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Contact Number:</strong> {department.contactNumber}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Email:</strong> {department.email}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Type:</strong> {department.type || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={department.active ? 'green' : 'red'}>
                {department.active ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Description:</strong> {department.description || 'No description available'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/departments')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}