import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {bloodGroup.bloodGroup} Blood Group
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Blood Group:</strong> {bloodGroup.bloodGroup}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created By:</strong> {bloodGroup.createdBy || 'N/A'}
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

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/bloodGroups')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}