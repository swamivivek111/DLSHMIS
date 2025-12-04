import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { Country } from '../../Types/Country';
import { getCountryById } from '../../../Services/CountryServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function CountryView() {
  const { id } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCountryById(Number(id))
      .then(setCountry)
      .catch(() => errorNotification('Country not found'));
  }, [id]);

  if (!country) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {country.countryName} Country
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Name:</strong> {country.countryName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Code:</strong> {country.countryCode}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created By:</strong> {country.createdBy || 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={country.active ? 'green' : 'red'}>
                {country.active ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/countrys')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}