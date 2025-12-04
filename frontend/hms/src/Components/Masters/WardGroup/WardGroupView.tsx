import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Grid, Badge } from '@mantine/core';
import { WardGroupService } from '../../../Services/WardGroupService';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function WardGroupView() {
  const { id } = useParams();
  const [wardGroup, setWardGroup] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    WardGroupService.getWardGroupById(Number(id))
      .then((data) => {
        setWardGroup(data);
      })
      .catch(() => errorNotification('Ward group not found'));
  }, [id]);

  if (!wardGroup) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {wardGroup.wardGroupName} Ward Group
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Ward Group ID:</strong> {wardGroup.wardGroupId}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Ward Group Name:</strong> {wardGroup.wardGroupName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Ward Group Category:</strong> {wardGroup.wardGroupCategory || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={wardGroup.isActive ? 'green' : 'red'}>
                {wardGroup.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {wardGroup.createdAt ? new Date(wardGroup.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {wardGroup.updatedAt ? new Date(wardGroup.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/ward-groups')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}