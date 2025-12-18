import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Grid, Text } from '@mantine/core';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { TariffService } from '../../../Services/TariffService';

interface Tariff {
  tariffId: number;
  tariffName: string;
  tariffCode: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function TariffView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tariff, setTariff] = useState<Tariff | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadTariff();
    }
  }, [id]);

  const loadTariff = async () => {
    try {
      setLoading(true);
      const response = await TariffService.getTariffById(Number(id));
      setTariff(response.tariff);
    } catch {
      errorNotification('Failed to load tariff');
      navigate('/admin/mastersettings/tariffs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Loading...</Text>
        </div>
      </motion.div>
    );
  }

  if (!tariff) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Tariff not found</Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Tariff Details
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Tariff Name:</strong> {tariff.tariffName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Tariff Code:</strong> {tariff.tariffCode || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Description:</strong> {tariff.description || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {tariff.createdAt ? new Date(tariff.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {tariff.updatedAt ? new Date(tariff.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/tariffs')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}