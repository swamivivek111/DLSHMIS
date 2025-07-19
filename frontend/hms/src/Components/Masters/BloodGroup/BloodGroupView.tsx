import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { BloodGroup } from '../../Types/BloodGroup';
import { getBloodGroupById } from '../../../Services/BloodGroupServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function BloodGroupView() {
  const { id } = useParams();
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBloodGroupById(Number(id))
      .then(setBloodGroup)
      .catch(() => errorNotification('BloodGroup not found'));
  }, [id]);

  if (!bloodGroup) return null;

  return (
    <Container size="md" className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          shadow="md"
          radius="md"
          p="lg"
          withBorder
          className="bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <Title order={2} className="text-[#202A44] mb-4">
            {bloodGroup.bloodGroup} BloodGroup
          </Title>

          <Divider mb="md" />

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>BloodGroup:</strong> {bloodGroup.bloodGroup}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={bloodGroup.active ? 'green' : 'red'}>
                  {bloodGroup.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/mastersettings/bloodGroups')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}
