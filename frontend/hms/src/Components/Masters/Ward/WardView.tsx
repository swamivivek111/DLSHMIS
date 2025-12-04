import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Text, Grid, Badge } from '@mantine/core';
import { WardServices } from '../../../Services/WardServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function WardView() {
  const { id } = useParams();
  const [ward, setWard] = useState<any>(null);
  const navigate = useNavigate();

  const getWardTypeColor = (type: string) => {
    switch (type) {
      case 'ICU': return 'red';
      case 'SPECIAL': return 'blue';
      case 'SEMI_SPECIAL': return 'cyan';
      case 'ISOLATION': return 'orange';
      default: return 'gray';
    }
  };

  const formatWardType = (type: string) => {
    switch (type) {
      case 'SEMI_SPECIAL': return 'Semi-special';
      default: return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  useEffect(() => {
    WardServices.getWardById(Number(id))
      .then((data) => {
        setWard(data);
      })
      .catch(() => errorNotification('Ward not found'));
  }, [id]);

  if (!ward) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {ward.wardName} Ward
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Ward Name:</strong> {ward.wardName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Ward Type:</strong>{' '}
              <Badge color={getWardTypeColor(ward.wardType)}>
                {formatWardType(ward.wardType)}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Floor No:</strong> {ward.floorNo || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Block/Building:</strong> {ward.blockBuildingName || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Department:</strong> {ward.departmentName || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={ward.status === 'ACTIVE' ? 'green' : 'red'}>
                {ward.status}
              </Badge>
            </Text>
          </Grid.Col>
          {ward.description && (
            <Grid.Col span={12}>
              <Text>
                <strong>Description:</strong> {ward.description}
              </Text>
            </Grid.Col>
          )}
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/wards')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}