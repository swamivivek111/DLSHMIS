import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { District } from '../../Types/District';
import { getDistrictById } from '../../../Services/DistrictServices';
import { getStateById } from '../../../Services/StateServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function DistrictView() {
  const { id } = useParams();
  const [district, setDistrict] = useState<District | null>(null);
  const [stateName, setStateName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getDistrictById(Number(id))
      .then((dist) => {
        setDistrict(dist);
        if (dist.stateId) {
          getStateById(dist.stateId)
            .then((state) => setStateName(state.stateName || 'Unknown State'))
            .catch(() => setStateName('Unknown State'));
        }
      })
      .catch(() => errorNotification('District not found'));
  }, [id]);

  if (!district) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {district.districtName} District
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>District Name:</strong> {district.districtName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>District Code:</strong> {district.districtCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>State:</strong> {stateName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Created By:</strong> {district.createdBy || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={district.active ? 'green' : 'red'}>
                  {district.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/districts')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
