import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { CategoryService } from '../../../Services/CategoryService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const navigate = useNavigate();

  const columns = [
    { key: 'categoryCode', label: 'Category Code' },
    { key: 'categoryName', label: 'Category Name' },
    { 
      key: 'isActive', 
      label: 'Status',
      render: (row: Category) => (
        <Badge color={row.isActive ? 'green' : 'red'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories(currentPage, 10, searchValue);
      setCategories(response.data || response);
      setTotalPages(response.totalPages || Math.ceil((response.length || 0) / 10));
    } catch (error) {
      console.error('Error fetching categories:', error);
      errorNotification('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchValue]);

  const handleAdd = () => {
    navigate('/admin/mastersettings/categories/add');
  };

  const handleEdit = (category: Category) => {
    navigate(`/admin/mastersettings/categories/edit/${category.categoryId}`);
  };

  const handleView = (category: Category) => {
    navigate(`/admin/mastersettings/categories/view/${category.categoryId}`);
  };

  const handleDelete = async (category: Category) => {
    try {
      await CategoryService.deleteCategory(category.categoryId);
      successNotification(`${category.categoryName} deleted successfully!`);
      fetchCategories();
    } catch (error) {
      errorNotification('Failed to delete category');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Category Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
          >
            Add Category
          </Button>
        </div>

        <DataTable
          data={categories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(c) => {
            setCategoryToDelete(c);
            setDeleteConfirmOpen(true);
          }}
          onView={handleView}

          pagination={{
            page: currentPage,
            total: totalPages,
            onPageChange: setCurrentPage,
          }}
          search={{
            value: searchValue,
            onChange: setSearchValue,
          }}
          loading={loading}
          canExport
        />
      </div>
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (categoryToDelete) {
            await handleDelete(categoryToDelete);
          }
        }}
        title="Delete Category"
        message={`Are you sure you want to delete ${categoryToDelete?.categoryName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
};

export default CategoryGrid;