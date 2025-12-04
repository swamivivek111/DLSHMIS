import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { CategoryService } from '../../../Services/CategoryService';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  description: string;
  categoryType: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const PAGE_SIZE = 10;

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await CategoryService.getCategories(page, PAGE_SIZE, search);
      setCategories(res.data || res);
      setTotalPages(res.totalPages || Math.ceil((res.length || 0) / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Category Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/categories/add')}
          >
            Add Category
          </Button>
        </div>

        <DataTable<Category>
          data={categories}
          columns={[
            { key: 'categoryName', label: 'Category Name' },
            { key: 'categoryCode', label: 'Code' },
            { 
              key: 'categoryType', 
              label: 'Type',
              render: (category: Category) => (
                <Badge variant="light" color="blue">
                  {category.categoryType}
                </Badge>
              )
            },
            { key: 'description', label: 'Description' },
            { 
              key: 'isActive', 
              label: 'Status',
              render: (category: Category) => (
                <Badge color={category.isActive ? 'green' : 'red'}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </Badge>
              )
            },
          ]}
          onView={(c) => navigate(`/admin/mastersettings/categories/view/${c.categoryId}`)}
          onEdit={(c) => navigate(`/admin/mastersettings/categories/edit/${c.categoryId}`)}
          onDelete={async (c) => {
            if (confirm('Delete '+c.categoryName+' category?')) {
              await CategoryService.deleteCategory(c.categoryId);
              successNotification(c.categoryName+' category deleted successfully!');
              fetchData();
            }
          }}
          onAdd={() => navigate('/admin/mastersettings/categories/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
    </motion.div>
  );
}