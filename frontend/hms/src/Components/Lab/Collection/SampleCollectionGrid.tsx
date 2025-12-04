import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group, Text, Container, Title } from '@mantine/core';
import { IconTestPipe, IconBarcode } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import DataTable from '../../DataTable/DataTable';

interface LabSample {
  id: number;
  barcode: string;
  patientName: string;
  sampleType: string;
  container: string;
  collectedBy: string;
  collectionDatetime: string;
  status: string;
}

const PAGE_SIZE = 10;

export default function SampleCollectionGrid() {
  const [samples, setSamples] = useState<LabSample[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Mock data for now
      const mockSamples: LabSample[] = [
        {
          id: 1,
          barcode: 'BC001234',
          patientName: 'John Doe',
          sampleType: 'Blood',
          container: 'EDTA Tube',
          collectedBy: 'Nurse Mary',
          collectionDatetime: '2024-01-15T10:45:00',
          status: 'COLLECTED'
        },
        {
          id: 2,
          barcode: 'BC001235',
          patientName: 'Jane Smith',
          sampleType: 'Urine',
          container: 'Sterile Container',
          collectedBy: 'Tech John',
          collectionDatetime: '2024-01-15T11:15:00',
          status: 'PENDING'
        }
      ];
      
      const filteredData = search 
        ? mockSamples.filter(sample => 
            sample.patientName.toLowerCase().includes(search.toLowerCase()) ||
            sample.barcode.toLowerCase().includes(search.toLowerCase())
          )
        : mockSamples;
      
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      setSamples(filteredData.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load samples',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const getStatusBadge = (status: string) => {
    const colors = { PENDING: 'orange', COLLECTED: 'green', REJECTED: 'red' };
    return <Badge color={colors[status as keyof typeof colors] || 'gray'}>{status}</Badge>;
  };

  return (
    <Container size="xl" className="py-4">
      <Title order={2} className="text-gray-800 mb-6">
        Sample Collection Management
      </Title>
      <DataTable<LabSample>
        data={samples}
        columns={[
          { 
            key: 'barcode', 
            label: 'Barcode',
            render: (sample) => (
              <Group gap="xs">
                <IconBarcode size={14} />
                <Text fw={500}>{sample.barcode}</Text>
              </Group>
            )
          },
          { 
            key: 'patientName', 
            label: 'Patient',
            render: (sample) => <Text fw={500}>{sample.patientName}</Text>
          },
          { 
            key: 'sampleType', 
            label: 'Sample Type',
            render: (sample) => (
              <Group gap="xs">
                <IconTestPipe size={14} />
                <Text size="sm">{sample.sampleType}</Text>
              </Group>
            )
          },
          { 
            key: 'container', 
            label: 'Container',
            render: (sample) => <Text size="sm">{sample.container}</Text>
          },
          { 
            key: 'collectedBy', 
            label: 'Collected By',
            render: (sample) => <Text size="sm">{sample.collectedBy}</Text>
          },
          { 
            key: 'collectionDatetime', 
            label: 'Collection Time',
            render: (sample) => (
              <Text size="sm">
                {new Date(sample.collectionDatetime).toLocaleString()}
              </Text>
            )
          },
          { 
            key: 'status', 
            label: 'Status',
            render: (sample) => getStatusBadge(sample.status)
          }
        ]}
        onView={(sample) => navigate(`/admin/lab/collection/view/${sample.id}`)}
        onEdit={(sample) => navigate(`/admin/lab/collection/edit/${sample.id}`)}
        onAdd={() => navigate('/admin/lab/collection/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        exportData={samples}
        exportFilename="lab-samples"
      />
    </Container>
  );
}