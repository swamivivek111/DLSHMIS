import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { UserProfileRole } from '../../Types/UserProfileRole';
import { getUserProfileRoleById } from '../../../Services/UserProfileRoleServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function UserProfileRoleView() {
  const { id } = useParams();
  const [userProfileRole, setUserProfileRole] = useState<UserProfileRole | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfileRoleById(Number(id))
      .then(setUserProfileRole)
      .catch(() => errorNotification('UserProfileRole not found'));
  }, [id]);

  if (!userProfileRole) return null;

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
            {userProfileRole.roleName} UserProfileRole
          </Title>

          <Divider mb="md" />

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Role Id:</strong> {userProfileRole.roleId}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Role Name:</strong> {userProfileRole.roleName}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={userProfileRole.active ? 'green' : 'red'}>
                  {userProfileRole.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

          <Divider my="md" />

          <Button
            variant="filled"
            className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
            onClick={() => navigate('/admin/mastersettings/userProfileRoles')}
          >
            Back
          </Button>
        </Card>
      </motion.div>
    </Container>
  );
}
