import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Taluka } from '../../Types/Taluka';
import { getTalukaById } from '../../../Services/TalukaServices';
import { getDistrictById } from '../../../Services/DistrictServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function TalukaView() {
  const { id } = useParams();
  const [taluka, setTaluka] = useState<Taluka | null>(null);
  const [districtName, setDistrictName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getTalukaById(Number(id))
      .then((tal) => {
        setTaluka(tal);
        if (tal.districtId) {
          getDistrictById(tal.districtId)
            .then((district) => setDistrictName(district.districtName || 'Unknown District'))
            .catch(() => setDistrictName('Unknown District'));
        }
      })
      .catch(() => errorNotification('Taluka not found'));
  }, [id]);

  if (!taluka) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {taluka.talukaName} Taluka
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Taluka Name:</strong> {taluka.talukaName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Taluka Code:</strong> {taluka.talukaCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>District:</strong> {districtName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Created By:</strong> {taluka.createdBy || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={taluka.active ? 'green' : 'red'}>
                  {taluka.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/talukas')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
