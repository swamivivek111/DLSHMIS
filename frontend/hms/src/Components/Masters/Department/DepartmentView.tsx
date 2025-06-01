import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Department } from '../../Types/Department';
import { getDepartmentById } from '../../../Services/DepartmentServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function DepartmentView() {
  const { id } = useParams();
  const [department, setDepartment] = useState<Department | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(id))
      .then(setDepartment)
      .catch(() => errorNotification('Department not found'));
  }, [id]);

  if (!department) return null;

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
            {department.name} Department
          </Title>

          <Divider mb="md" />

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
                <strong>Head:</strong> {department.headOfDepartment}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Contact:</strong> {department.contactNumber}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Description:</strong> {department.description}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={department.active ? 'green' : 'red'}>
                  {department.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/mastersettings/departments')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}
