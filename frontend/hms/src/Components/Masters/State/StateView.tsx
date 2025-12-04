import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { State } from '../../Types/State';
import { getStateById } from '../../../Services/StateServices';
import { getCountryById } from '../../../Services/CountryServices';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function StateView() {
  const { id } = useParams();
  const [state, setState] = useState<State | null>(null);
  const [countryName, setCountryName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getStateById(Number(id))
      .then((stateData) => {
        setState(stateData);
        if (stateData.countryId) {
          getCountryById(stateData.countryId)
            .then((countryData) => {
              setCountryName(countryData.countryName || 'Unknown Country');
            })
            .catch(() => {
              setCountryName('Unknown Country');
            });
        }
      })
      .catch(() => {
        notifications.show({
          title: 'Error',
          message: 'State not found',
          color: 'red',
        });
        navigate('/admin/mastersettings/states');
      });
  }, [id]);

  if (!state) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {state.stateName} State
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>State Name:</strong> {state.stateName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>State Code:</strong> {state.stateCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Country:</strong> {countryName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={state.active ? 'green' : 'red'}>
                  {state.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/states')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
