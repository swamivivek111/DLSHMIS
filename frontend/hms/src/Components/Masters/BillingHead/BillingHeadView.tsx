import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Grid, Badge } from '@mantine/core';
import { BillingHeadService } from '../../../Services/BillingHeadService';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function BillingHeadView() {
  const { id } = useParams();
  const [billingHead, setBillingHead] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    BillingHeadService.getBillingHeadById(Number(id))
      .then((data) => {
        setBillingHead(data);
      })
      .catch(() => errorNotification('Billing head not found'));
  }, [id]);

  if (!billingHead) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {billingHead.billingHeadName} Billing Head
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Billing Head ID:</strong> {billingHead.billingHeadId}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Billing Head Name:</strong> {billingHead.billingHeadName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={billingHead.isActive ? 'green' : 'red'}>
                {billingHead.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {billingHead.createdAt ? new Date(billingHead.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {billingHead.updatedAt ? new Date(billingHead.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/billing-heads')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}