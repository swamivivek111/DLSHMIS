import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button } from '@mantine/core';
import { Department } from '../../Types/Department';
import { getDepartmentById } from '../../../Services/DepartmentServices';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function DepartmentViewPage() {
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
    <Container>
      <Title order={2}>Department Details</Title>
      <Text mt="md"><strong>Name:</strong> {department.name}</Text>
      <Text><strong>Code:</strong> {department.code}</Text>
      <Text><strong>Head:</strong> {department.headOfDepartment}</Text>
      <Text><strong>Contact:</strong> {department.contactNumber}</Text>
      <Text><strong>Description:</strong> {department.description}</Text>
      <Button mt="md" onClick={() => navigate('/departments')}>
        Back
      </Button>
    </Container>
  );
}
