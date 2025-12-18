import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { CategoryService } from '../../../Services/CategoryService';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function CategoryView() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      CategoryService.getCategoryById(Number(id))
        .then(setCategory)
        .catch(() => errorNotification('Category not found'));
    }
  }, [id]);

  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {category.categoryName} Category
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Category Name:</strong> {category.categoryName}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Category Code:</strong> {category.categoryCode || 'N/A'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={category.isActive ? 'green' : 'red'}>
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              <strong>Description:</strong> {category.description || 'No description available'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {category.createdAt ? new Date(category.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {category.updatedAt ? new Date(category.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/categories')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}