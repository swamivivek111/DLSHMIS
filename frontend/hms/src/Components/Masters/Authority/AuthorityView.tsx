import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Grid, Badge } from '@mantine/core';
import { Authority } from '../../Types/Authority';
import { getAuthorityById } from '../../../Services/AuthorityServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function AuthorityView() {
  const { id } = useParams();
  const [authority, setAuthority] = useState<Authority | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthorityById(Number(id))
      .then((data) => {
        setAuthority(data);
      })
      .catch(() => errorNotification('Authority not found'));
  }, [id]);

  if (!authority) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {authority.authorityName} Authority
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Authority Name:</strong> {authority.authorityName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Authority Code:</strong> {authority.authorityCode}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Approval Limit:</strong> {authority.approvalLimit || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={authority.isActive ? 'green' : 'red'}>
                {authority.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {authority.createdAt ? new Date(authority.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {authority.updatedAt ? new Date(authority.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/authorities')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}