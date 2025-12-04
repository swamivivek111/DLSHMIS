import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group, Text, Container, Title } from '@mantine/core';
import { IconUser, IconPhone } from '@tabler/icons-react';
import { PatientProfileService } from '../../../Services/PatientProfileService';
import { notifications } from '@mantine/notifications';
import DataTable from '../../DataTable/DataTable';
import { Patient } from '../../Types/Patient';

const PAGE_SIZE = 10;

export default function PatientGrid() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await PatientProfileService.getAllPatients();
      const filteredData = search 
        ? res.filter((p: Patient) => 
            p.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName?.toLowerCase().includes(search.toLowerCase()) ||
            p.prnNo?.toLowerCase().includes(search.toLowerCase()) ||
            p.mobileNumber?.includes(search)
          )
        : res;
      
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setPatients(filteredData.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load patients',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (patient: Patient) => {
    if (confirm(`Delete patient ${patient.firstName} ${patient.lastName}?`)) {
      try {
        await PatientProfileService.deletePatient(patient.id!);
        notifications.show({
          title: 'Success',
          message: 'Patient deleted successfully',
          color: 'green',
        });
        fetchData();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete patient',
          color: 'red',
        });
      }
    }
  };

  const getGenderBadge = (gender: string) => {
    const colors = { Male: 'blue', Female: 'pink', Other: 'gray' };
    return <Badge color={colors[gender as keyof typeof colors] || 'gray'}>{gender}</Badge>;
  };

  return (
    <Container size="xl" className="py-4">
      <Title order={2} className="text-gray-800 mb-6">
        Patient Registration Management
      </Title>
      <DataTable<Patient>
        data={patients}
        columns={[
          { 
            key: 'prnNo', 
            label: 'PRN No',
            render: (patient) => (
              <Text fw={500}>{patient.prnNo || `PRN${String(patient.id).padStart(6, '0')}`}</Text>
            )
          },
          { 
            key: 'firstName', 
            label: 'Patient Name',
            render: (patient) => (
              <div>
                <Group gap="xs">
                  <IconUser size={14} />
                  <Text fw={500}>{patient.prefix} {patient.firstName} {patient.middleName} {patient.lastName}</Text>
                </Group>
              </div>
            )
          },
          { 
            key: 'gender', 
            label: 'Gender',
            render: (patient) => getGenderBadge(patient.gender)
          },
          { 
            key: 'age', 
            label: 'Age',
            render: (patient) => <Text size="sm">{patient.age} years</Text>
          },
          { 
            key: 'mobileNumber', 
            label: 'Contact',
            render: (patient) => (
              <Group gap="xs">
                <IconPhone size={14} />
                <Text size="sm">{patient.mobileNumber}</Text>
              </Group>
            )
          },
          { 
            key: 'address', 
            label: 'Address',
            render: (patient) => (
              <Text size="sm" truncate style={{ maxWidth: 150 }}>
                {patient.address}
              </Text>
            )
          }
        ]}
        onView={(patient) => navigate(`/admin/dashboard/registration/view/${patient.id}`)}
        onEdit={(patient) => navigate(`/admin/dashboard/registration/edit/${patient.id}`)}
        onDelete={handleDelete}
        onAdd={() => navigate('/admin/dashboard/registration/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        exportData={patients}
        exportFilename="patients-data"
      />
    </Container>
  );
}