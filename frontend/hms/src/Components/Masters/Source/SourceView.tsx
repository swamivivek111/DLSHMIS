import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Grid, Paper, Text, Title } from '@mantine/core';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { SourceService } from '../../../Services/SourceService';

interface Source {
  sourceId: number;
  sourceName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function SourceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [source, setSource] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadSource();
    }
  }, [id]);

  const loadSource = async () => {
    try {
      setLoading(true);
      const response = await SourceService.getSourceById(Number(id));
      setSource(response.source);
    } catch {
      errorNotification('Failed to load source');
      navigate('/admin/mastersettings/sources');
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

  if (!source) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Source not found</Text>
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
          Source Details
        </h2>

        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Source ID</Text>
            <Text>{source.sourceId}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Source Name</Text>
            <Text>{source.sourceName}</Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mb="xs">Description</Text>
            <Text>{source.description || 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Created At</Text>
            <Text>{source.createdAt ? new Date(source.createdAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Updated At</Text>
            <Text>{source.updatedAt ? new Date(source.updatedAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>
        </Grid>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/sources/edit/${source.sourceId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/sources')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}