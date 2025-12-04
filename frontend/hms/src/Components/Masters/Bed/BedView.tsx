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
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { BedServices } from '../../../Services/BedServices';
import { Bed } from '../../Types/Bed';

const BedView: React.FC = () => {
  const [bed, setBed] = useState<Bed | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBed(parseInt(id));
    }
  }, [id]);

  const fetchBed = async (bedId: number) => {
    setLoading(true);
    try {
      const bedData = await BedServices.getBedById(bedId);
      setBed(bedData);
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

  const getBedTypeColor = (type: string) => {
    switch (type) {
      case 'ICU_BED': return 'red';
      case 'EMERGENCY_BED': return 'orange';
      case 'VENTILATOR_BED': return 'purple';
      case 'DELUXE_BED': return 'blue';
      case 'PEDIATRIC_BED': return 'pink';
      case 'MATERNITY_BED': return 'teal';
      default: return 'gray';
    }
  };

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'green';
      case 'OCCUPIED': return 'red';
      case 'RESERVED': return 'yellow';
      case 'CLEANING': return 'blue';
      case 'UNDER_MAINTENANCE': return 'orange';
      default: return 'gray';
    }
  };

  const formatBedType = (type: string) => {
    switch (type) {
      case 'ICU_BED': return 'ICU Bed';
      case 'EMERGENCY_BED': return 'Emergency Bed';
      case 'PEDIATRIC_BED': return 'Pediatric Bed';
      case 'MATERNITY_BED': return 'Maternity Bed';
      case 'DELUXE_BED': return 'Deluxe Bed';
      case 'VENTILATOR_BED': return 'Ventilator Bed';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  const formatBedStatus = (status: string) => {
    switch (status) {
      case 'UNDER_MAINTENANCE': return 'Under Maintenance';
      default: return status.charAt(0) + status.slice(1).toLowerCase();
    }
  };

  if (!bed) {
    return null;
  }

  return (
    <Container size="lg" className="py-4">
      <Paper shadow="sm" radius="md" p="xl" pos="relative">
        <LoadingOverlay visible={loading} />
        
        <Title order={2} ta="center" mb="xl" className="text-gray-800">
          Bed Details
        </Title>

        <Stack gap="lg">
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Bed Information</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Bed ID:</Text>
                  <Badge color="blue">{bed.id}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Ward:</Text>
                  <Badge color="cyan">{bed.wardName || 'N/A'}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Room:</Text>
                  <Badge color="teal">{bed.roomNumber || 'N/A'}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Bed Number:</Text>
                  <Text>{bed.bedNumber}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Bed Type:</Text>
                  <Badge color={getBedTypeColor(bed.bedType)}>
                    {formatBedType(bed.bedType)}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Status:</Text>
                  <Badge color={getBedStatusColor(bed.bedStatus)}>
                    {formatBedStatus(bed.bedStatus)}
                  </Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Availability Details</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Current Patient ID:</Text>
                  <Text>{bed.currentPatientId || 'N/A'}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Last Cleaned Date:</Text>
                  <Text>{bed.lastCleanedDate ? new Date(bed.lastCleanedDate).toLocaleDateString() : 'N/A'}</Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Billing Details</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Bed Charges/Day:</Text>
                  <Badge color="green">₹{bed.bedChargesPerDay || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Ventilator Charge:</Text>
                  <Badge color="red">₹{bed.ventilatorCharge || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Monitor Charge:</Text>
                  <Badge color="blue">₹{bed.monitorCharge || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Nursing Charge:</Text>
                  <Badge color="teal">₹{bed.nursingCharge || 0}</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group>
                  <Text fw={500}>Special Equipment:</Text>
                  <Badge color="purple">₹{bed.specialEquipmentCharge || 0}</Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>

          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Title order={4} mb="md">Infrastructure</Title>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Oxygen Point:</Text>
                  <Badge color={bed.oxygenPointAvailable ? 'green' : 'red'}>
                    {bed.oxygenPointAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Monitor:</Text>
                  <Badge color={bed.monitorAvailable ? 'green' : 'red'}>
                    {bed.monitorAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 4 }}>
                <Group>
                  <Text fw={500}>Suction Point:</Text>
                  <Badge color={bed.suctionPointAvailable ? 'green' : 'red'}>
                    {bed.suctionPointAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        </Stack>

        <Group justify="center" mt="xl">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/mastersettings/beds/edit/${bed.id}`)}
            size="md"
          >
            Edit Bed
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/mastersettings/beds')}
            size="md"
          >
            Back to List
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default BedView;