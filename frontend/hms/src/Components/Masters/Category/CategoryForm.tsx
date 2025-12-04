import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { CategoryService } from '../../../Services/CategoryService';

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      categoryName: '',
      categoryCode: '',
      description: '',
      categoryType: '',
      isActive: true,
    },
    validate: {
      categoryName: v => (v.length < 2 ? 'Category name is required' : null),
      categoryType: v => (!v ? 'Category type is required' : null),
    },
  });

  const categoryTypes = [
    { value: 'MEDICAL', label: 'Medical' },
    { value: 'ADMINISTRATIVE', label: 'Administrative' },
    { value: 'BILLING', label: 'Billing' },
    { value: 'DIAGNOSTIC', label: 'Diagnostic' },
    { value: 'TREATMENT', label: 'Treatment' },
    { value: 'PHARMACY', label: 'Pharmacy' },
    { value: 'LABORATORY', label: 'Laboratory' },
    { value: 'RADIOLOGY', label: 'Radiology' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadCategoryData();
    }
  }, [id]);

  const loadCategoryData = async () => {
    try {
      const data = await CategoryService.getCategoryById(Number(id));
      form.setValues(data);
    } catch {
      errorNotification('Category not found');
    }
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        await CategoryService.updateCategory(Number(id), values);
        successNotification('Category updated successfully');
      } else {
        await CategoryService.createCategory(values);
        successNotification('Category created successfully');
      }
      navigate('/admin/mastersettings/categories');
    } catch (error: any) {
      errorNotification(error.response?.data || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Category Name" withAsterisk {...form.getInputProps('categoryName')} />
          <TextInput label="Category Code" {...form.getInputProps('categoryCode')} />
          
          <Select
            label="Category Type"
            placeholder="Select category type"
            data={categoryTypes}
            withAsterisk
            {...form.getInputProps('categoryType')}
          />

          <Textarea label="Description" {...form.getInputProps('description')} className="xl:col-span-2" />
          
          <div className="flex items-center xl:justify-end">
            <Switch
              label="Active"
              className="px-2 py-1 rounded"
              color="#202A44"
              labelPosition="left"
              {...form.getInputProps('isActive', { type: 'checkbox' })}
            />
          </div>

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/categories')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}