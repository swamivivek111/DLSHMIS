import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { TitleMaster } from '../../Types/Title';
import { getTitleById } from '../../../Services/TitleServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function TitleView() {
  const { id } = useParams();
  const [title, setTitle] = useState<TitleMaster | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTitleById(Number(id))
      .then(setTitle)
      .catch(() => errorNotification('Title not found'));
  }, [id]);

  if (!title) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {title.titleName} Title
        </h2>



          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Title Name:</strong> {title.titleName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Gender:</strong> {title.gender}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={title.active ? 'green' : 'red'}>
                  {title.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
          </Grid>



        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors"
          onClick={() => navigate('/admin/mastersettings/titles')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
