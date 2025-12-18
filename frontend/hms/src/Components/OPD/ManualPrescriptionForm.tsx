import { useState } from 'react';
import {
  Paper, Stack, Group, Text, TextInput, Select, Button, 
  ActionIcon, Table, Checkbox
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  duration: string;
  beforeFood: boolean;
  afterFood: boolean;
  isSingleItem: boolean;
}

interface ManualPrescriptionFormProps {
  onPrescriptionGenerated: (prescription: string) => void;
}

export default function ManualPrescriptionForm({ onPrescriptionGenerated }: ManualPrescriptionFormProps) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({
    id: '',
    name: '',
    dosage: '',
    morning: false,
    afternoon: false,
    evening: false,
    duration: '',
    beforeFood: false,
    afterFood: false,
    isSingleItem: false
  });

  const addMedicine = () => {
    const newMedicine = {
      ...currentMedicine,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setMedicines([...medicines, newMedicine]);
    
    // Force reset form with timeout to ensure Select clears
    setTimeout(() => {
      setCurrentMedicine({
        id: '',
        name: '',
        dosage: '',
        morning: false,
        afternoon: false,
        evening: false,
        duration: '',
        beforeFood: false,
        afterFood: false,
        isSingleItem: false
      });
    }, 0);
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const generatePrescription = () => {
    let prescriptionText = '';
    
    medicines.forEach((med, index) => {
      const timings = [];
      if (med.morning) timings.push('Morning');
      if (med.afternoon) timings.push('Afternoon');
      if (med.evening) timings.push('Evening');
      
      const foodTiming = med.beforeFood ? ' (Before Food)' : med.afterFood ? ' (After Food)' : '';
      
      // Calculate total tablets
      const dailyDoses = timings.length;
      const totalTablets = med.isSingleItem ? 1 : (med.duration ? dailyDoses * (parseInt(med.duration.split(' ')[0]) || 1) : 1);
      
      const durationDays = med.duration ? parseInt(med.duration.split(' ')[0]) || 1 : 1;
      prescriptionText += `${index + 1}. ${med.name} ${med.dosage} - ${timings.join(', ')}${foodTiming} - ${med.duration || 'As needed'} (${dailyDoses} x ${durationDays} = ${totalTablets})\n`;
    });
    
    if (prescriptionText) {
      prescriptionText += '\nAdvice: Take medicines as prescribed. Follow up if symptoms persist.';
      onPrescriptionGenerated(prescriptionText);
    }
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="sm">
        <Text fw={500}>Manual Prescription Entry</Text>
        
        {/* Medicine Entry Form */}
        <Group>
          <TextInput
            placeholder="Medicine Name"
            value={currentMedicine.name}
            onChange={(e) => setCurrentMedicine({...currentMedicine, name: e.target.value})}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="Dosage (e.g., 500mg)"
            value={currentMedicine.dosage}
            onChange={(e) => setCurrentMedicine({...currentMedicine, dosage: e.target.value})}
            w={120}
          />
        </Group>

        {/* Timing Selection */}
        <Group>
          <Text size="sm" fw={500}>Timing:</Text>
          <Checkbox
            label="Morning"
            checked={currentMedicine.morning}
            onChange={(e) => setCurrentMedicine({...currentMedicine, morning: e.target.checked})}
          />
          <Checkbox
            label="Afternoon"
            checked={currentMedicine.afternoon}
            onChange={(e) => setCurrentMedicine({...currentMedicine, afternoon: e.target.checked})}
          />
          <Checkbox
            label="Evening"
            checked={currentMedicine.evening}
            onChange={(e) => setCurrentMedicine({...currentMedicine, evening: e.target.checked})}
          />
        </Group>

        {/* Food Timing */}
        <Group>
          <Text size="sm" fw={500}>Food:</Text>
          <Checkbox
            label="Before Food"
            checked={currentMedicine.beforeFood}
            onChange={(e) => setCurrentMedicine({...currentMedicine, beforeFood: e.target.checked, afterFood: e.target.checked ? false : currentMedicine.afterFood})}
          />
          <Checkbox
            label="After Food"
            checked={currentMedicine.afterFood}
            onChange={(e) => setCurrentMedicine({...currentMedicine, afterFood: e.target.checked, beforeFood: e.target.checked ? false : currentMedicine.beforeFood})}
          />
          <Checkbox
            label="Is Single Item"
            checked={currentMedicine.isSingleItem}
            onChange={(e) => setCurrentMedicine({...currentMedicine, isSingleItem: e.target.checked})}
          />
        </Group>

        <Group>
          <Select
            placeholder="Duration"
            value={currentMedicine.duration || null}
            onChange={(value) => setCurrentMedicine({...currentMedicine, duration: value || ''})}
            data={[
              '1 day', '2 days', '3 days', '5 days', '7 days', '10 days', '15 days', '1 month'
            ]}
            w={120}
            clearable
            key={currentMedicine.id || 'new'}
          />
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={addMedicine}
            size="sm"
            style={{ opacity: 1, visibility: 'visible', backgroundColor: '#007bff', color: 'white' }}
          >
            Add Medicine
          </Button>
        </Group>

        {/* Medicine List */}
        {medicines.length > 0 && (
          <>
            <Text fw={500} size="sm">Added Medicines ({medicines.length}):</Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Medicine</Table.Th>
                  <Table.Th>Dosage</Table.Th>
                  <Table.Th>Timing</Table.Th>
                  <Table.Th>Food</Table.Th>
                  <Table.Th>Duration</Table.Th>
                  <Table.Th>Total Count</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {medicines.map((med) => {
                  const timings = [];
                  if (med.morning) timings.push('M');
                  if (med.afternoon) timings.push('A');
                  if (med.evening) timings.push('E');
                  
                  const foodTiming = med.beforeFood ? 'Before' : med.afterFood ? 'After' : 'N/A';
                  
                  // Calculate total count
                  const dailyDoses = timings.length;
                  const totalCount = med.isSingleItem ? 1 : (med.duration ? dailyDoses * (parseInt(med.duration.split(' ')[0]) || 1) : 1);
                  
                  return (
                    <Table.Tr key={med.id}>
                      <Table.Td>{med.name}</Table.Td>
                      <Table.Td>{med.dosage}</Table.Td>
                      <Table.Td>{timings.join('-')}</Table.Td>
                      <Table.Td>{foodTiming}</Table.Td>
                      <Table.Td>{med.duration || 'N/A'}</Table.Td>
                      <Table.Td>{med.isSingleItem ? '1' : (med.duration ? `${dailyDoses} × ${parseInt(med.duration.split(' ')[0]) || 1} = ${totalCount}` : '1')}</Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          variant="filled"
                          onClick={() => removeMedicine(med.id)}
                          style={{ 
                            opacity: 1, 
                            visibility: 'visible',
                            backgroundColor: '#dc3545',
                            border: 'none'
                          }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
            
            <Button
              onClick={generatePrescription}
              color="blue"
              fullWidth
              style={{ opacity: 1, visibility: 'visible', backgroundColor: '#007bff' }}
              disabled={medicines.length === 0}
            >
              Generate Prescription from Manual Entry ({medicines.length} medicines)
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
}