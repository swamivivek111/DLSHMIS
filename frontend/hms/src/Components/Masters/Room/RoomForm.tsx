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
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomServices } from '../../../Services/RoomServices';
import { WardServices } from '../../../Services/WardServices';
import { RoomFormData } from '../../Types/Room';

const RoomForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [wards, setWards] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const form = useForm<RoomFormData>({
    initialValues: {
      wardId: '',
      roomNumber: '',
      roomType: '',
      floorNo: '',
      blockWing: '',
      maxBedsAllowed: 1,
      roomStatus: 'ACTIVE',
      roomChargesPerDay: 0,
      nursingCharges: 0,
      utilityCharges: 0,
      hasOxygenPoint: 'NO',
      hasVentilatorSupport: 'NO',
      hasMonitor: 'NO',
      isAC: 'NO',
      hasAttachedWashroom: 'NO',
    },
    validate: {
      wardId: (value) => (!value ? 'Ward is required' : null),
      roomNumber: (value) => (!value ? 'Room number is required' : null),
      roomType: (value) => (!value ? 'Room type is required' : null),
      floorNo: (value) => (!value ? 'Floor number is required' : null),
      blockWing: (value) => (!value ? 'Block/Wing is required' : null),
      maxBedsAllowed: (value) => (value < 1 ? 'Must be at least 1 bed' : null),
      roomStatus: (value) => (!value ? 'Room status is required' : null),
    },
  });

  useEffect(() => {
    loadWards();
    if (isEdit && id) {
      fetchRoom(parseInt(id));
    }
  }, [id, isEdit]);

  const loadWards = async () => {
    try {
      const response = await WardServices.getWard(1, 1000, '');
      const wardsData = response.data || [];
      setWards(wardsData.map((w: any) => ({
        value: w.id.toString(),
        label: `${w.wardName} - ${w.blockBuildingName}`
      })));
    } catch (error) {
      console.error('Failed to load wards:', error);
    }
  };

  const fetchRoom = async (roomId: number) => {
    setLoading(true);
    try {
      const room = await RoomServices.getRoomById(roomId);
      form.setValues({
        wardId: room.wardId?.toString() || '',
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        floorNo: room.floorNo,
        blockWing: room.blockWing,
        maxBedsAllowed: room.maxBedsAllowed,
        roomStatus: room.roomStatus,
        roomChargesPerDay: room.roomChargesPerDay || 0,
        nursingCharges: room.nursingCharges || 0,
        utilityCharges: room.utilityCharges || 0,
        hasOxygenPoint: room.hasOxygenPoint ? 'YES' : 'NO',
        hasVentilatorSupport: room.hasVentilatorSupport ? 'YES' : 'NO',
        hasMonitor: room.hasMonitor ? 'YES' : 'NO',
        isAC: room.isAC ? 'YES' : 'NO',
        hasAttachedWashroom: room.hasAttachedWashroom ? 'YES' : 'NO',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch room details',
        color: 'red',
      });
      navigate('/admin/mastersettings/rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: RoomFormData) => {
    setLoading(true);
    try {
      const selectedWard = wards.find(w => w.value === values.wardId);
      const roomData = {
        ...values,
        wardId: parseInt(values.wardId),
        wardName: selectedWard?.label || '',
        hasOxygenPoint: values.hasOxygenPoint === 'YES',
        hasVentilatorSupport: values.hasVentilatorSupport === 'YES',
        hasMonitor: values.hasMonitor === 'YES',
        isAC: values.isAC === 'YES',
        hasAttachedWashroom: values.hasAttachedWashroom === 'YES',
      };

      if (isEdit && id) {
        await RoomServices.updateRoom(parseInt(id), roomData);
        notifications.show({
          title: 'Success',
          message: 'Room updated successfully',
          color: 'green',
        });
      } else {
        await RoomServices.addRoom(roomData);
        notifications.show({
          title: 'Success',
          message: 'Room created successfully',
          color: 'green',
        });
      }
      navigate('/admin/mastersettings/rooms');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEdit ? 'update' : 'create'} room`,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Room' : 'Add Room'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Room Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Ward"
                    placeholder="Select ward"
                    data={wards}
                    {...form.getInputProps('wardId')}
                    searchable
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Room Number / Name"
                    placeholder="Enter room number or name"
                    {...form.getInputProps('roomNumber')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Room Type"
                    placeholder="Select room type"
                    data={[
                      { value: 'SINGLE', label: 'Single' },
                      { value: 'TWIN_SHARING', label: 'Twin-sharing' },
                      { value: 'GENERAL', label: 'General' },
                      { value: 'DELUXE', label: 'Deluxe' },
                      { value: 'ICU_CUBICLE', label: 'ICU cubicle' },
                    ]}
                    {...form.getInputProps('roomType')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput
                    label="Max Beds Allowed"
                    placeholder="Enter maximum beds"
                    {...form.getInputProps('maxBedsAllowed')}
                    min={1}
                    max={20}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Location Details</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Floor No"
                    placeholder="Enter floor number"
                    {...form.getInputProps('floorNo')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Block / Wing"
                    placeholder="Enter block or wing"
                    {...form.getInputProps('blockWing')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Financial Details</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <NumberInput
                    label="Room Charges Per Day"
                    placeholder="Enter daily charges"
                    {...form.getInputProps('roomChargesPerDay')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <NumberInput
                    label="Nursing Charges"
                    placeholder="Enter nursing charges"
                    {...form.getInputProps('nursingCharges')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <NumberInput
                    label="Utility Charges"
                    placeholder="Enter utility charges"
                    {...form.getInputProps('utilityCharges')}
                    min={0}
                    decimalScale={2}
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Infrastructure Details</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Has Oxygen Point"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('hasOxygenPoint')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Has Ventilator Support"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('hasVentilatorSupport')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Has Monitor"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('hasMonitor')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="AC / Non-AC"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'AC' },
                      { value: 'NO', label: 'Non-AC' },
                    ]}
                    {...form.getInputProps('isAC')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Attached Washroom"
                    placeholder="Select option"
                    data={[
                      { value: 'YES', label: 'Yes' },
                      { value: 'NO', label: 'No' },
                    ]}
                    {...form.getInputProps('hasAttachedWashroom')}
                  />
                </Grid.Col>
              </Grid>
            </Card>

            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title order={4} mb="md">Status</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Room Status"
                    placeholder="Select room status"
                    data={[
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'UNDER_MAINTENANCE', label: 'Under Maintenance' },
                    ]}
                    {...form.getInputProps('roomStatus')}
                    required
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
              {isEdit ? 'Update Room' : 'Create Room'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin/mastersettings/rooms')}
              size="md"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </div>
    </motion.div>
  );
};

export default RoomForm;