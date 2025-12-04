import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceTypeService } from '../../../Services/ServiceTypeService';
import { ServiceClassService } from '../../../Services/ServiceClassService';

interface ServiceTypeFormData {
  serviceClassName: string;
  serviceClassTypeName: string;
}

export default function ServiceTypeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serviceClasses, setServiceClasses] = useState<any[]>([]);
  const isEdit = Boolean(id);

  const form = useForm<ServiceTypeFormData>({
    initialValues: {
      serviceClassName: '',
      serviceClassTypeName: '',
    },
    validate: {
      serviceClassName: (value) => (!value ? 'Service class is required' : null),
      serviceClassTypeName: (value) => (!value ? 'Service class type name is required' : null),
    },
  });



  useEffect(() => {
    loadServiceClasses();
    if (isEdit && id) {
      loadServiceType();
    }
  }, [id, isEdit]);

  const loadServiceClasses = async () => {
    try {
      const response = await ServiceClassService.getAllServiceClasses();
      const serviceClassOptions = response.map((serviceClass: any) => ({
        value: serviceClass.serviceClassId.toString(),
        label: serviceClass.serviceClassName
      }));
      setServiceClasses(serviceClassOptions);
    } catch {
      errorNotification('Failed to load service classes');
    }
  };

  const loadServiceType = async () => {
    try {
      setLoading(true);
      const serviceType = await ServiceTypeService.getServiceTypeById(Number(id));
      form.setValues({
        serviceClassName: serviceType.serviceClassName?.toString() || '',
        serviceClassTypeName: serviceType.serviceClassTypeName || '',
      });
    } catch {
      errorNotification('Failed to load service type');
      navigate('/admin/mastersettings/service-types');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ServiceTypeFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        serviceClassName: Number(values.serviceClassName),
      };
      
      if (isEdit) {
        await ServiceTypeService.updateServiceType(Number(id), submitData);
        successNotification('Service type updated successfully!');
      } else {
        await ServiceTypeService.createServiceType(submitData);
        successNotification('Service type created successfully!');
      }
      navigate('/admin/mastersettings/service-types');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} service type`);
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
          {isEdit ? 'Edit Service Type' : 'Add Service Type'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Service Class"
            placeholder="Select service class"
            data={serviceClasses}
            withAsterisk
            searchable
            {...form.getInputProps('serviceClassName')}
          />
          
          <TextInput 
            label="Service Class Type Name" 
            withAsterisk 
            {...form.getInputProps('serviceClassTypeName')} 
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-types')}
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