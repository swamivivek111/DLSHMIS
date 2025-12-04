import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button, Container, Grid, Paper, Text, Title } from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { TariffService } from '../../../Services/TariffService';

interface Tariff {
  tariffId: number;
  serviceName: string;
  serviceCode: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  serviceCategory: string;
  department: string;
  unit: string;
  taxPercentage?: number;
  isActive: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
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

        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Service Name</Text>
            <Text>{tariff.serviceName}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Service Code</Text>
            <Text>{tariff.serviceCode || 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Service Category</Text>
            <Badge variant="light" color="blue">
              {tariff.serviceCategory?.replace('_', ' ')}
            </Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Department</Text>
            <Badge variant="light" color="grape">
              {tariff.department?.replace('_', ' ')}
            </Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Base Price</Text>
            <div className="flex items-center gap-1">
              <IconCurrencyRupee size={16} />
              <Text>{tariff.basePrice?.toFixed(2)}</Text>
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Discount Price</Text>
            <div className="flex items-center gap-1">
              <IconCurrencyRupee size={16} />
              <Text>{tariff.discountPrice?.toFixed(2) || '0.00'}</Text>
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Tax Percentage</Text>
            <Text>{tariff.taxPercentage?.toFixed(2) || '0.00'}%</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Unit</Text>
            <Badge variant="light" color="teal">
              {tariff.unit?.replace('_', ' ')}
            </Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Status</Text>
            <Badge color={tariff.isActive ? 'green' : 'red'}>
              {tariff.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Effective From</Text>
            <Text>{tariff.effectiveFrom ? new Date(tariff.effectiveFrom).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Effective To</Text>
            <Text>{tariff.effectiveTo ? new Date(tariff.effectiveTo).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mb="xs">Description</Text>
            <Text>{tariff.description || 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Created At</Text>
            <Text>{tariff.createdAt ? new Date(tariff.createdAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Updated At</Text>
            <Text>{tariff.updatedAt ? new Date(tariff.updatedAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>
        </Grid>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/tariffs/edit/${tariff.tariffId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/tariffs')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}