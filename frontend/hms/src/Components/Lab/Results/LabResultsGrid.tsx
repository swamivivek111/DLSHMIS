import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group, Text, Container, Title } from '@mantine/core';
import { IconReportMedical, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import DataTable from '../../DataTable/DataTable';

interface LabResult {
  id: number;
  patientName: string;
  testName: string;
  sampleType: string;
  technicianName: string;
  validatorName: string;
  validated: boolean;
  completedAt: string;
  status: string;
}

const PAGE_SIZE = 10;

export default function LabResultsGrid() {
  const [results, setResults] = useState<LabResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Mock data for now
      const mockResults: LabResult[] = [
        {
          id: 1,
          patientName: 'John Doe',
          testName: 'Complete Blood Count',
          sampleType: 'Blood',
          technicianName: 'Tech Alice',
          validatorName: 'Dr. Pathologist',
          validated: true,
          completedAt: '2024-01-15T14:30:00',
          status: 'COMPLETED'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          testName: 'Lipid Profile',
          sampleType: 'Blood',
          technicianName: 'Tech Bob',
          validatorName: '',
          validated: false,
          completedAt: '',
          status: 'PROCESSING'
        }
      ];
      
      const filteredData = search 
        ? mockResults.filter(result => 
            result.patientName.toLowerCase().includes(search.toLowerCase()) ||
            result.testName.toLowerCase().includes(search.toLowerCase())
          )
        : mockResults;
      
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setResults(filteredData.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load test results',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const getStatusBadge = (status: string) => {
    const colors = { 
      PROCESSING: 'yellow', 
      COMPLETED: 'green', 
      VALIDATED: 'blue',
      REPORTED: 'purple'
    };
    return <Badge color={colors[status as keyof typeof colors] || 'gray'}>{status}</Badge>;
  };

  return (
    <Container size="xl" className="py-4">
      <Title order={2} className="text-gray-800 mb-6">
        Lab Test Results Management
      </Title>
      <DataTable<LabResult>
        data={results}
        columns={[
          { 
            key: 'patientName', 
            label: 'Patient',
            render: (result) => <Text fw={500}>{result.patientName}</Text>
          },
          { 
            key: 'testName', 
            label: 'Test',
            render: (result) => (
              <Group gap="xs">
                <IconReportMedical size={14} />
                <Text size="sm">{result.testName}</Text>
              </Group>
            )
          },
          { 
            key: 'sampleType', 
            label: 'Sample',
            render: (result) => <Text size="sm">{result.sampleType}</Text>
          },
          { 
            key: 'technicianName', 
            label: 'Technician',
            render: (result) => <Text size="sm">{result.technicianName}</Text>
          },
          { 
            key: 'validated', 
            label: 'Validated',
            render: (result) => (
              <Group gap="xs">
                {result.validated && <IconCheck size={14} color="green" />}
                <Badge color={result.validated ? 'green' : 'orange'}>
                  {result.validated ? 'Yes' : 'Pending'}
                </Badge>
              </Group>
            )
          },
          { 
            key: 'validatorName', 
            label: 'Validator',
            render: (result) => (
              <Text size="sm">{result.validatorName || 'Not assigned'}</Text>
            )
          },
          { 
            key: 'status', 
            label: 'Status',
            render: (result) => getStatusBadge(result.status)
          },
          { 
            key: 'completedAt', 
            label: 'Completed',
            render: (result) => (
              <Text size="sm">
                {result.completedAt ? new Date(result.completedAt).toLocaleString() : 'In Progress'}
              </Text>
            )
          }
        ]}
        onView={(result) => navigate(`/admin/lab/results/view/${result.id}`)}
        onEdit={(result) => navigate(`/admin/lab/results/edit/${result.id}`)}
        onAdd={() => navigate('/admin/lab/results/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        exportData={results}
        exportFilename="lab-results"
      />
    </Container>
  );
}