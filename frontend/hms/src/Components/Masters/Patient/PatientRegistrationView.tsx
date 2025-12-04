import { Container, Title } from '@mantine/core';
import PatientGrid from './PatientGrid';

export default function PatientRegistrationView() {
  return (
    <Container size="xl" className="py-4">
      <PatientGrid />
    </Container>
  );
}