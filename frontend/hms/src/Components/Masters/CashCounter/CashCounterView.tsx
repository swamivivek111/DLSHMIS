import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Grid, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { CashCounterService } from '../../../Services/CashCounterService';

interface CashCounter {
  cashCounterId: number;
  counterName: string;
  description?: string;
  systemName?: string;
  tokenRequired: boolean;
  counterType: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CashCounterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState<CashCounter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCashCounter();
    }
  }, [id]);

  const loadCashCounter = async () => {
    try {
      setLoading(true);
      const response = await CashCounterService.getCashCounterById(Number(id));
      setCounter(response.cashCounter);
    } catch {
      errorNotification('Failed to load cash counter');
      navigate('/admin/mastersettings/cash-counters');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Loading...</Text>
        </div>
      </motion.div>
    );
  }

  if (!counter) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Cash counter not found</Text>
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
          {counter.counterName} Cash Counter
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Counter Name:</strong> {counter.counterName}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Counter Type:</strong>{' '}
              <Badge variant="light" color="blue">
                {counter.counterType?.replace('_', ' ')}
              </Badge>
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>System Name:</strong> {counter.systemName || 'N/A'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Token Required:</strong>{' '}
              <Badge color={counter.tokenRequired ? 'green' : 'gray'}>
                {counter.tokenRequired ? 'Yes' : 'No'}
              </Badge>
            </Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text>
              <strong>Description:</strong> {counter.description || 'N/A'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {counter.createdAt ? new Date(counter.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {counter.updatedAt ? new Date(counter.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/cash-counters/edit/${counter.cashCounterId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/cash-counters')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}