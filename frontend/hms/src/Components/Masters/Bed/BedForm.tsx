import React, { useState, useEffect } from 'react';
import {
  Card,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Grid,
  Container,
  Paper,
  NumberInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { BedServices } from '../../../Services/BedServices';
import { WardServices } from '../../../Services/WardServices';
import { RoomServices } from '../../../Services/RoomServices';
import { BedFormData } from '../../Types/Bed';

const BedForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [wards, setWards] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm<BedFormData>({
    initialValues: {
      wardId: '',
      roomId: '',
      bedNumber: '',
      bedType: '',
      bedStatus: 'AVAILABLE',
      currentPatientId: '',
      lastCleanedDate: null,
      bedChargesPerDay: 0,
      ventilatorCharge: 0,
      monitorCharge: 0,
      nursingCharge: 0,
      specialEquipmentCharge: 0,
      oxygenPointAvailable: 'NO',
      monitorAvailable: 'NO',
      suctionPointAvailable: 'NO',
    },
    validate: {
      wardId: (value) => (!value ? 'Ward is required' : null),
      roomId: (value) => (!value ? 'Room is required' : null),
      bedNumber: (value) => (!value ? 'Bed number is required' : null),
      bedType: (value) => (!value ? 'Bed type is required' : null),
      bedStatus: (value) => (!value ? 'Bed status is required' : null),
    },
  });

  useEffect(() => {
    loadWards();
    if (isEdit && id) {
      fetchBed(parseInt(id));
    }
  }, [id, isEdit]);

  const loadWards = async () => {
    try {
      const response = await WardServices.getWard(1, 1000, '');
      const wardsData = response.data || [];
      setWards(wardsData.map((w: any) => ({
        value: w.id.toString(),
        label: w.wardName
      })));
    } catch (error) {
      console.error('Failed to load wards:', error);
    }
  };

  const loadRooms = async (wardId: string) => {
    try {
      const response = await RoomServices.getRoom(1, 1000, '');
      const roomsData = response.data || [];
      const filteredRooms = roomsData.filter((r: any) => r.wardId.toString() === wardId);
      setRooms(filteredRooms.map((r: any) => ({
        value: r.id.toString(),
        label: r.roomNumber
      })));
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const fetchBed = async (bedId: number) => {
    setLoading(true);
    try {
      const bed = await BedServices.getBedById(bedId);
      form.setValues({
        wardId: bed.wardId?.toString() || '',
        roomId: bed.roomId?.toString() || '',
        bedNumber: bed.bedNumber,
        bedType: bed.bedType,
        bedStatus: bed.bedStatus,
        currentPatientId: bed.currentPatientId?.toString() || '',
        lastCleanedDate: bed.lastCleanedDate ? new Date(bed.lastCleanedDate) : null,
        bedChargesPerDay: bed.bedChargesPerDay || 0,
        ventilatorCharge: bed.ventilatorCharge || 0,
        monitorCharge: bed.monitorCharge || 0,
        nursingCharge: bed.nursingCharge || 0,
        specialEquipmentCharge: bed.specialEquipmentCharge || 0,
        oxygenPointAvailable: bed.oxygenPointAvailable ? 'YES' : 'NO',
        monitorAvailable: bed.monitorAvailable ? 'YES' : 'NO',
        suctionPointAvailable: bed.suctionPointAvailable ? 'YES' : 'NO',
      });
      if (bed.wardId) {
        loadRooms(bed.wardId.toString());
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch bed details',
        color: 'red',
      });
      navigate('/admin/mastersettings/beds');
    } finally {
      setLoading(false);
    }
  };

  const handleWardChange = (wardId: string | null) => {
    form.setFieldValue('wardId', wardId);
    form.setFieldValue('roomId', '');
    setRooms([]);
    if (wardId) {
      loadRooms(wardId);
    }
  };

  const handleSubmit = async (values: BedFormData) => {
    setLoading(true);
    try {
      const selectedWard = wards.find(w => w.value === values.wardId);
      const selectedRoom = rooms.find(r => r.value === values.roomId);
      
      const bedData = {
        ...values,
        wardId: parseInt(values.wardId),
        wardName: selectedWard?.label || '',
        roomId: parseInt(values.roomId),
        roomNumber: selectedRoom?.label || '',
        currentPatientId: values.currentPatientId ? parseInt(values.currentPatientId) : null,
        lastCleanedDate: values.lastCleanedDate?.toISOString().split('T')[0] || null,
        oxygenPointAvailable: values.oxygenPointAvailable === 'YES',
        monitorAvailable: values.monitorAvailable === 'YES',
        suctionPointAvailable: values.suctionPointAvailable === 'YES',
      };

      if (isEdit && id) {
        await BedServices.updateBed(parseInt(id), bedData);
        notifications.show({
          title: 'Success',
          message: 'Bed updated successfully',
          color: 'green',
        });
      } else {
        await BedServices.addBed(bedData);
        notifications.show({
          title: 'Success',
          message: 'Bed created successfully',
          color: 'green',
        });
      }
      navigate('/admin/mastersettings/beds');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEdit ? 'update' : 'create'} bed`,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" className="py-4">
      <Paper shadow="sm" radius="md" p="xl">
        <Title order={2} ta="center" mb="xl" className="text-gray-800">
          {isEdit ? 'Edit Bed' : 'Add New Bed'}
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Bed Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Ward"
                    placeholder="Select ward"
                    data={wards}
                    {...form.getInputProps('wardId')}
                    onChange={handleWardChange}
                    searchable
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Room"
                    placeholder="Select room"
                    data={rooms}
                    {...form.getInputProps('roomId')}
                    searchable
                    required
                    disabled={!form.values.wardId}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Bed Number / Label"
                    placeholder="Enter bed number or label"
                    {...form.getInputProps('bedNumber')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Bed Type"
                    placeholder="Select bed type"
                    data={[
                      { value: 'GENERAL', label: 'General' },
                      { value: 'ICU_BED', label: 'ICU Bed' },
                      { value: 'EMERGENCY_BED', label: 'Emergency Bed' },
                      { value: 'PEDIATRIC_BED', label: 'Pediatric Bed' },
                      { value: 'MATERNITY_BED', label: 'Maternity Bed' },
                      { value: 'DELUXE_BED', label: 'Deluxe Bed' },
                      { value: 'VENTILATOR_BED', label: 'Ventilator Bed' },
                    ]}
                    {...form.getInputProps('bedType')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Bed Availability</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Bed Status"
                    placeholder="Select bed status"
                    data={[
                      { value: 'AVAILABLE', label: 'Available' },
                      { value: 'OCCUPIED', label: 'Occupied' },
                      { value: 'RESERVED', label: 'Reserved' },
                      { value: 'CLEANING', label: 'Cleaning' },
                      { value: 'UNDER_MAINTENANCE', label: 'Under Maintenance' },
                    ]}
                    {...form.getInputProps('bedStatus')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Current Patient ID"
                    placeholder="Auto-assigned when admitted"
                    {...form.getInputProps('currentPatientId')}
                    disabled={form.values.bedStatus !== 'OCCUPIED'}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DateInput
                    label="Last Cleaned Date"
                    placeholder="Select last cleaned date"
                    {...form.getInputProps('lastCleanedDate')}
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Billing Details</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Bed Charges Per Day"
                    placeholder="Enter daily bed charges"
                    {...form.getInputProps('bedChargesPerDay')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Ventilator Charge"
                    placeholder="Enter ventilator charges"
                    {...form.getInputProps('ventilatorCharge')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Monitor Charge"
                    placeholder="Enter monitor charges"
                    {...form.getInputProps('monitorCharge')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Nursing Charge"
                    placeholder="Enter nursing charges"
                    {...form.getInputProps('nursingCharge')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Special Equipment Charge"
                    placeholder="Enter special equipment charges"
                    {...form.getInputProps('specialEquipmentCharge')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Infrastructure</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="Oxygen Point Available"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('oxygenPointAvailable')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="Monitor Available"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('monitorAvailable')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="Suction Point Available"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('suctionPointAvailable')}
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Stack>

          <Group justify="center" mt="xl">
            <Button
              type="submit"
              loading={loading}
              size="md"
              variant="outline"
            >
              {isEdit ? 'Update Bed' : 'Create Bed'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin/mastersettings/beds')}
              size="md"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default BedForm;