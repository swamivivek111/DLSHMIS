import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  TextInput,
  Select,
  Badge,
  Group,
  ActionIcon,
  Title,
  Text,
  Modal,
  Stack,
} from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconPlus, IconClock } from '@tabler/icons-react';

interface Surgery {
  id: number;
  patientName: string;
  patientId: string;
  surgeonName: string;
  procedure: string;
  surgeryType: string;
  otRoom: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  priority: 'Elective' | 'Urgent' | 'Emergency';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  anesthesiaType: string;
  assistantSurgeon?: string;
}

const OTSchedule: React.FC = () => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [roomFilter, setRoomFilter] = useState<string>('');
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const mockSurgeries: Surgery[] = [
      {
        id: 1,
        patientName: 'John Doe',
        patientId: 'P001',
        surgeonName: 'Dr. Smith',
        procedure: 'Appendectomy',
        surgeryType: 'General Surgery',
        otRoom: 'OT-1',
        scheduledDate: '2024-11-16',
        scheduledTime: '09:00',
        duration: 120,
        priority: 'Urgent',
        status: 'Scheduled',
        anesthesiaType: 'General',
        assistantSurgeon: 'Dr. Johnson',
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        patientId: 'P002',
        surgeonName: 'Dr. Wilson',
        procedure: 'Knee Replacement',
        surgeryType: 'Orthopedic',
        otRoom: 'OT-2',
        scheduledDate: '2024-11-16',
        scheduledTime: '14:00',
        duration: 180,
        priority: 'Elective',
        status: 'Scheduled',
        anesthesiaType: 'Spinal',
      },
    ];
    setSurgeries(mockSurgeries);
  }, []);

  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesSearch = surgery.patientName.toLowerCase().includes(search.toLowerCase()) ||
                         surgery.procedure.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || surgery.status === statusFilter;
    const matchesRoom = !roomFilter || surgery.otRoom === roomFilter;
    return matchesSearch && matchesStatus && matchesRoom;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Emergency': return 'red';
      case 'Urgent': return 'orange';
      default: return 'blue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'In Progress': return 'yellow';
      case 'Scheduled': return 'blue';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>OT Surgery Schedule</Title>
          <Button leftSection={<IconPlus size={16} />} variant="outline">
            Schedule Surgery
          </Button>
        </Group>

        <Group mb="md">
          <TextInput
            placeholder="Search by patient or procedure..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="OT Room"
            data={[
              { value: '', label: 'All Rooms' },
              { value: 'OT-1', label: 'OT-1' },
              { value: 'OT-2', label: 'OT-2' },
              { value: 'OT-3', label: 'OT-3' },
              { value: 'OT-4', label: 'OT-4' },
            ]}
            value={roomFilter}
            onChange={(value) => setRoomFilter(value || '')}
          />
          <Select
            placeholder="Status"
            data={[
              { value: '', label: 'All Status' },
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || '')}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Procedure</Table.Th>
              <Table.Th>Surgeon</Table.Th>
              <Table.Th>OT Room</Table.Th>
              <Table.Th>Date & Time</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredSurgeries.map((surgery) => (
              <Table.Tr key={surgery.id}>
                <Table.Td>
                  <div>
                    <Text fw={500}>{surgery.patientName}</Text>
                    <Text size="sm" c="dimmed">{surgery.patientId}</Text>
                  </div>
                </Table.Td>
                <Table.Td>
                  <div>
                    <Text>{surgery.procedure}</Text>
                    <Text size="sm" c="dimmed">{surgery.surgeryType}</Text>
                  </div>
                </Table.Td>
                <Table.Td>{surgery.surgeonName}</Table.Td>
                <Table.Td>{surgery.otRoom}</Table.Td>
                <Table.Td>
                  <div>
                    <Text>{surgery.scheduledDate}</Text>
                    <Text size="sm" c="dimmed">{surgery.scheduledTime}</Text>
                  </div>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconClock size={14} />
                    <Text size="sm">{surgery.duration} min</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge color={getPriorityColor(surgery.priority)} size="sm">
                    {surgery.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(surgery.status)} size="sm">
                    {surgery.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => {
                        setSelectedSurgery(surgery);
                        setModalOpened(true);
                      }}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="orange">
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Surgery Details"
        size="lg"
      >
        {selectedSurgery && (
          <Stack gap="md">
            <Group>
              <Text fw={500}>Patient:</Text>
              <Text>{selectedSurgery.patientName} ({selectedSurgery.patientId})</Text>
            </Group>
            <Group>
              <Text fw={500}>Procedure:</Text>
              <Text>{selectedSurgery.procedure}</Text>
            </Group>
            <Group>
              <Text fw={500}>Surgery Type:</Text>
              <Text>{selectedSurgery.surgeryType}</Text>
            </Group>
            <Group>
              <Text fw={500}>Surgeon:</Text>
              <Text>{selectedSurgery.surgeonName}</Text>
            </Group>
            {selectedSurgery.assistantSurgeon && (
              <Group>
                <Text fw={500}>Assistant Surgeon:</Text>
                <Text>{selectedSurgery.assistantSurgeon}</Text>
              </Group>
            )}
            <Group>
              <Text fw={500}>OT Room:</Text>
              <Text>{selectedSurgery.otRoom}</Text>
            </Group>
            <Group>
              <Text fw={500}>Scheduled:</Text>
              <Text>{selectedSurgery.scheduledDate} at {selectedSurgery.scheduledTime}</Text>
            </Group>
            <Group>
              <Text fw={500}>Duration:</Text>
              <Text>{selectedSurgery.duration} minutes</Text>
            </Group>
            <Group>
              <Text fw={500}>Anesthesia Type:</Text>
              <Text>{selectedSurgery.anesthesiaType}</Text>
            </Group>
            <Group>
              <Text fw={500}>Priority:</Text>
              <Badge color={getPriorityColor(selectedSurgery.priority)}>
                {selectedSurgery.priority}
              </Badge>
            </Group>
            <Group>
              <Text fw={500}>Status:</Text>
              <Badge color={getStatusColor(selectedSurgery.status)}>
                {selectedSurgery.status}
              </Badge>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default OTSchedule;