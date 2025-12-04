import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceClassService } from '../../../Services/ServiceClassService';

interface ServiceClassFormData {
  serviceClassName: string;
  isActive: boolean;
}

export default function ServiceClassForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<ServiceClassFormData>({
    initialValues: {
      serviceClassName: '',
      isActive: true,
    },
    validate: {
      serviceClassName: (value) => (!value ? 'Service class name is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadServiceClass();
    }
  }, [id, isEdit]);

  const loadServiceClass = async () => {
    try {
      setLoading(true);
      const serviceClass = await ServiceClassService.getServiceClassById(Number(id));
      form.setValues({
        serviceClassName: serviceClass.serviceClassName || '',
        isActive: serviceClass.isActive ?? true,
      });
    } catch {
      errorNotification('Failed to load service class');
      navigate('/admin/mastersettings/service-classes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ServiceClassFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await ServiceClassService.updateServiceClass(Number(id), values);
        successNotification('Service class updated successfully!');
      } else {
        await ServiceClassService.createServiceClass(values);
        successNotification('Service class created successfully!');
      }
      navigate('/admin/mastersettings/service-classes');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} service class`);
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Service Class' : 'Add Service Class'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Service Class Name" 
            withAsterisk 
            {...form.getInputProps('serviceClassName')} 
          />
          
          <Select
            label="Status"
            data={[{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }]}
            {...form.getInputProps('isActive')}
            onChange={(value) => form.setFieldValue('isActive', value === 'true')}
            value={form.values.isActive ? 'true' : 'false'}
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-classes')}
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