import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { City } from '../../Types/City';
import { getCityById } from '../../../Services/CityServices';
import { getTalukaById } from '../../../Services/TalukaServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function CityView() {
  const { id } = useParams();
  const [city, setCity] = useState<City | null>(null);
  const [talukaName, setTalukaName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getCityById(Number(id))
      .then((cty) => {
        setCity(cty);
        if (cty.talukaId) {
          getTalukaById(cty.talukaId)
            .then((taluka) => setTalukaName(taluka.talukaName || 'Unknown Taluka'))
            .catch(() => setTalukaName('Unknown Taluka'));
        }
      })
      .catch(() => errorNotification('City not found'));
  }, [id]);

  if (!city) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {city.cityName} City
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>City Name:</strong> {city.cityName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Pin Code:</strong> {city.pinCode}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Taluka:</strong> {talukaName || 'Loading...'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created By:</strong> {city.createdBy || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={city.active ? 'green' : 'red'}>
                {city.active ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/citys')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}