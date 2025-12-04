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
  NumberInput,
  Modal,
  Stack,
} from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconPlus, IconAlertTriangle } from '@tabler/icons-react';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  manufacturer: string;
  batchNo: string;
  expiryDate: string;
  quantity: number;
  unitPrice: number;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired';
  minStockLevel: number;
}

const PharmacyInventory: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const mockMedicines: Medicine[] = [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        genericName: 'Acetaminophen',
        manufacturer: 'ABC Pharma',
        batchNo: 'PAR001',
        expiryDate: '2025-12-31',
        quantity: 500,
        unitPrice: 2.50,
        category: 'Analgesic',
        status: 'In Stock',
        minStockLevel: 100,
      },
      {
        id: 2,
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        manufacturer: 'XYZ Labs',
        batchNo: 'AMX002',
        expiryDate: '2024-06-30',
        quantity: 25,
        unitPrice: 5.00,
        category: 'Antibiotic',
        status: 'Low Stock',
        minStockLevel: 50,
      },
    ];
    setMedicines(mockMedicines);
  }, []);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(search.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || medicine.category === categoryFilter;
    const matchesStatus = !statusFilter || medicine.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'green';
      case 'Low Stock': return 'orange';
      case 'Out of Stock': return 'red';
      case 'Expired': return 'gray';
      default: return 'blue';
    }
  };

  return (
    <div className="p-6">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Pharmacy Inventory</Title>
          <Button leftSection={<IconPlus size={16} />} variant="outline">
            Add Medicine
          </Button>
        </Group>

        <Group mb="md">
          <TextInput
            placeholder="Search medicines..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Category"
            data={[
              { value: '', label: 'All Categories' },
              { value: 'Analgesic', label: 'Analgesic' },
              { value: 'Antibiotic', label: 'Antibiotic' },
              { value: 'Antacid', label: 'Antacid' },
              { value: 'Vitamin', label: 'Vitamin' },
            ]}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value || '')}
          />
          <Select
            placeholder="Status"
            data={[
              { value: '', label: 'All Status' },
              { value: 'In Stock', label: 'In Stock' },
              { value: 'Low Stock', label: 'Low Stock' },
              { value: 'Out of Stock', label: 'Out of Stock' },
              { value: 'Expired', label: 'Expired' },
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value || '')}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Medicine Name</Table.Th>
              <Table.Th>Generic Name</Table.Th>
              <Table.Th>Batch No</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Expiry Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredMedicines.map((medicine) => (
              <Table.Tr key={medicine.id}>
                <Table.Td>
                  <div>
                    <Text fw={500}>{medicine.name}</Text>
                    <Text size="sm" c="dimmed">{medicine.manufacturer}</Text>
                  </div>
                </Table.Td>
                <Table.Td>{medicine.genericName}</Table.Td>
                <Table.Td>{medicine.batchNo}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Text>{medicine.quantity}</Text>
                    {medicine.quantity <= medicine.minStockLevel && (
                      <IconAlertTriangle size={16} color="orange" />
                    )}
                  </Group>
                </Table.Td>
                <Table.Td>₹{medicine.unitPrice}</Table.Td>
                <Table.Td>{medicine.expiryDate}</Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(medicine.status)} size="sm">
                    {medicine.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => {
                        setSelectedMedicine(medicine);
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
        title="Medicine Details"
        size="lg"
      >
        {selectedMedicine && (
          <Stack gap="md">
            <Group>
              <Text fw={500}>Medicine:</Text>
              <Text>{selectedMedicine.name}</Text>
            </Group>
            <Group>
              <Text fw={500}>Generic Name:</Text>
              <Text>{selectedMedicine.genericName}</Text>
            </Group>
            <Group>
              <Text fw={500}>Manufacturer:</Text>
              <Text>{selectedMedicine.manufacturer}</Text>
            </Group>
            <Group>
              <Text fw={500}>Category:</Text>
              <Text>{selectedMedicine.category}</Text>
            </Group>
            <Group>
              <Text fw={500}>Batch Number:</Text>
              <Text>{selectedMedicine.batchNo}</Text>
            </Group>
            <Group>
              <Text fw={500}>Current Stock:</Text>
              <Text>{selectedMedicine.quantity} units</Text>
            </Group>
            <Group>
              <Text fw={500}>Minimum Stock Level:</Text>
              <Text>{selectedMedicine.minStockLevel} units</Text>
            </Group>
            <Group>
              <Text fw={500}>Unit Price:</Text>
              <Text>₹{selectedMedicine.unitPrice}</Text>
            </Group>
            <Group>
              <Text fw={500}>Expiry Date:</Text>
              <Text>{selectedMedicine.expiryDate}</Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default PharmacyInventory;