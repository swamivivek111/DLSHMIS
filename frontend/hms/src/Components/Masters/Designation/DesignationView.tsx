import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { Designation } from '../../Types/Designation';
import { getDesignationById } from '../../../Services/DesignationServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function DesignationView() {
  const { id } = useParams();
  const [designation, setDesignation] = useState<Designation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDesignationById(Number(id))
      .then(setDesignation)
      .catch(() => errorNotification('Designation not found'));
  }, [id]);

  if (!designation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {designation.designationName} Designation
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Designation Name:</strong> {designation.designationName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Designation Code:</strong> {designation.designationCode}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Description:</strong> {designation.description || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created By:</strong> {designation.createdBy || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={designation.active ? 'green' : 'red'}>
                {designation.active ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/designations')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}