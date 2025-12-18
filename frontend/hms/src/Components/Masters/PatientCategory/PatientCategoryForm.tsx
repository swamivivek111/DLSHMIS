import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch, NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addPatientCategory, getPatientCategoryById, updatePatientCategory } from '../../../Services/PatientCategoryServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function PatientCategoryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateCategoryCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `CAT${timestamp}`;
  };

  const form = useForm({
    initialValues: {
      categoryId: '',
      categoryCode: '',
      categoryName: '',
      description: '',
      discountPercentage: 0,
      isActive: true,
    },
    validate: {
      categoryName: v => (v.length < 2 ? 'Category name is required' : null),
      discountPercentage: v => (v < 0 || v > 100 ? 'Discount must be between 0-100%' : null),
    },
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data: any = await getPatientCategoryById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('Category not found');
        }
      })();
    } else {
      // Auto-generate category code for new categories
      form.setFieldValue('categoryCode', generateCategoryCode());
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updatePatientCategory(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/patient-categories');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        addPatientCategory(values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/patient-categories');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      }
    } catch {
      errorNotification('Failed to save category');
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
          {isEdit ? 'Edit Patient Category' : 'Add Patient Category'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Category Name" withAsterisk {...form.getInputProps('categoryName')} />
        <TextInput label="Category Code" readOnly {...form.getInputProps('categoryCode')} />
        
        <NumberInput 
          label="Discount Percentage (%)" 
          min={0} 
          max={100} 
          {...form.getInputProps('discountPercentage')} 
        />
        
        <div className="flex items-center">
          <Switch
            label="Active"
            color="#202A44"
            labelPosition="left"
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />
        </div>

        <Textarea 
          label="Description" 
          {...form.getInputProps('description')} 
          className="xl:col-span-2" 
        />

        <div className="xl:col-span-2 flex justify-end gap-2 mt-4">
          <Button 
            type="submit" 
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            loading={loading}
          >
            {isEdit ? 'Update' : 'Save'}
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/patient-categories')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Cancel
          </Button>
        </div>
      </form>
      </div>
    </motion.div>
  );
}