import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Title, Card, Text, Group, Badge, Button, Grid } from '@mantine/core';
import { PatientCategory } from '../../Types/PatientCategory';
import { getPatientCategoryById } from '../../../Services/PatientCategoryServices';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function PatientCategoryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<PatientCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getPatientCategoryById(Number(id));
          setCategory(data);
        } catch {
          errorNotification('Category not found');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Loading...</div>
        </div>
      </motion.div>
    );
  }
  
  if (!category) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Category not found</div>
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Patient Category Details</h2>
          <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/admin/mastersettings/patient-categories/edit/${id}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/patient-categories')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
          </div>
        </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid>
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Category Name</Text>
            <Text fw={500}>{category.categoryName}</Text>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Category Code</Text>
            <Text fw={500}>{category.categoryCode}</Text>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Discount Percentage</Text>
            <Text fw={500}>{category.discountPercentage}%</Text>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Status</Text>
            <Badge color={category.isActive ? 'green' : 'red'} variant="light">
              {category.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </Grid.Col>
          
          <Grid.Col span={12}>
            <Text size="sm" c="dimmed">Description</Text>
            <Text fw={500}>{category.description || 'N/A'}</Text>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text fw={500}>
              {category.createdAt ? new Date(category.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text fw={500}>
              {category.updatedAt ? new Date(category.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
      </div>
    </motion.div>
  );
}