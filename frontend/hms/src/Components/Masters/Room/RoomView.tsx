import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Title,
  Grid,
  Container,
  Paper,
  Badge,
  LoadingOverlay,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { RoomServices } from '../../../Services/RoomServices';
import { Room } from '../../Types/Room';

const RoomView: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRoom(parseInt(id));
    }
  }, [id]);

  const fetchRoom = async (roomId: number) => {
    setLoading(true);
    try {
      const roomData = await RoomServices.getRoomById(roomId);
      setRoom(roomData);
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

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'ICU_CUBICLE': return 'red';
      case 'DELUXE': return 'blue';
      case 'SINGLE': return 'cyan';
      case 'TWIN_SHARING': return 'teal';
      default: return 'gray';
    }
  };

  const formatRoomType = (type: string) => {
    switch (type) {
      case 'TWIN_SHARING': return 'Twin-sharing';
      case 'ICU_CUBICLE': return 'ICU cubicle';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  if (!room) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <LoadingOverlay visible={loading} />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Room Details
        </h2>

        <Stack gap="lg">
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Room Information</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Room ID:</Text>
                  <Badge color="blue">{room.id}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Ward:</Text>
                  <Badge color="cyan">{room.wardName || 'N/A'}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Room Number:</Text>
                  <Text>{room.roomNumber}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Room Type:</Text>
                  <Badge color={getRoomTypeColor(room.roomType)}>
                    {formatRoomType(room.roomType)}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Max Beds:</Text>
                  <Badge color="gray">{room.maxBedsAllowed}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Status:</Text>
                  <Badge color={room.roomStatus === 'ACTIVE' ? 'green' : 'orange'}>
                    {room.roomStatus === 'UNDER_MAINTENANCE' ? 'Under Maintenance' : room.roomStatus}
                  </Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Location Details</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Floor No:</Text>
                  <Text>{room.floorNo}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Block/Wing:</Text>
                  <Text>{room.blockWing}</Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Financial Details</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Room Charges/Day:</Text>
                  <Badge color="green">₹{room.roomChargesPerDay || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Nursing Charges:</Text>
                  <Badge color="blue">₹{room.nursingCharges || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Utility Charges:</Text>
                  <Badge color="orange">₹{room.utilityCharges || 0}</Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Infrastructure Details</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Oxygen Point:</Text>
                  <Badge color={room.hasOxygenPoint ? 'green' : 'red'}>
                    {room.hasOxygenPoint ? 'Yes' : 'No'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Ventilator Support:</Text>
                  <Badge color={room.hasVentilatorSupport ? 'green' : 'red'}>
                    {room.hasVentilatorSupport ? 'Yes' : 'No'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Monitor:</Text>
                  <Badge color={room.hasMonitor ? 'green' : 'red'}>
                    {room.hasMonitor ? 'Yes' : 'No'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>AC/Non-AC:</Text>
                  <Badge color={room.isAC ? 'blue' : 'gray'}>
                    {room.isAC ? 'AC' : 'Non-AC'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Attached Washroom:</Text>
                  <Badge color={room.hasAttachedWashroom ? 'green' : 'red'}>
                    {room.hasAttachedWashroom ? 'Yes' : 'No'}
                  </Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        </Stack>

        <Group justify="center" mt="xl">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/mastersettings/rooms/edit/${room.id}`)}
            size="md"
          >
            Edit Room
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/mastersettings/rooms')}
            size="md"
          >
            Back to List
          </Button>
        </Group>
      </div>
    </motion.div>
  );
};

export default RoomView;