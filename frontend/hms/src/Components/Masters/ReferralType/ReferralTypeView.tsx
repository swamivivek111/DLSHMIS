import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Grid, Paper, Text, Title } from '@mantine/core';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { ReferralTypeService } from '../../../Services/ReferralTypeService';

interface ReferralType {
  referralTypeId: number;
  referralTypeName: string;
  createdAt: string;
  updatedAt: string;
}

export default function ReferralTypeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [referralType, setReferralType] = useState<ReferralType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadReferralType();
    }
  }, [id]);

  const loadReferralType = async () => {
    try {
      setLoading(true);
      const response = await ReferralTypeService.getReferralTypeById(Number(id));
      setReferralType(response.referralType);
    } catch {
      errorNotification('Failed to load referral type');
      navigate('/admin/mastersettings/referral-types');
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

  if (!referralType) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Referral type not found</Text>
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
          Referral Type Details
        </h2>

        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Referral Type ID</Text>
            <Text>{referralType.referralTypeId}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Referral Type Name</Text>
            <Text>{referralType.referralTypeName}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Created At</Text>
            <Text>{referralType.createdAt ? new Date(referralType.createdAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Updated At</Text>
            <Text>{referralType.updatedAt ? new Date(referralType.updatedAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>
        </Grid>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/referral-types/edit/${referralType.referralTypeId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/referral-types')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}