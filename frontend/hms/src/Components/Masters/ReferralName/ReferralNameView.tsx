import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Grid, Paper, Text, Title } from '@mantine/core';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { ReferralNameService } from '../../../Services/ReferralNameService';

interface ReferralName {
  referralNameId: number;
  referralTypeId: number;
  referralName: string;
  referralAddress: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReferralNameView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [referralName, setReferralName] = useState<ReferralName | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock referral types - replace with actual API call
  const referralTypes: { [key: number]: string } = {
    1: 'Doctor',
    2: 'Hospital',
    3: 'Clinic',
    4: 'Laboratory',
    5: 'Pharmacy',
  };

  useEffect(() => {
    if (id) {
      loadReferralName();
    }
  }, [id]);

  const loadReferralName = async () => {
    try {
      setLoading(true);
      const response = await ReferralNameService.getReferralNameById(Number(id));
      setReferralName(response.referralName);
    } catch {
      errorNotification('Failed to load referral name');
      navigate('/admin/mastersettings/referral-names');
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

  if (!referralName) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Referral name not found</Text>
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
          Referral Name Details
        </h2>

        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Referral Name ID</Text>
            <Text>{referralName.referralNameId}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Referral Type</Text>
            <Text>{referralTypes[referralName.referralTypeId] || `ID: ${referralName.referralTypeId}`}</Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mb="xs">Referral Name</Text>
            <Text>{referralName.referralName}</Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mb="xs">Referral Address</Text>
            <Text>{referralName.referralAddress || 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Created At</Text>
            <Text>{referralName.createdAt ? new Date(referralName.createdAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Updated At</Text>
            <Text>{referralName.updatedAt ? new Date(referralName.updatedAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>
        </Grid>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/referral-names/edit/${referralName.referralNameId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/referral-names')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}