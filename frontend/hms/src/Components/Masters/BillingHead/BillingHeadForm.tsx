import { useForm } from '@mantine/form';
import { Button, TextInput, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BillingHeadService } from '../../../Services/BillingHeadService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function BillingHeadForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      billingHeadName: '',
      isActive: true,
    },
    validate: {
      billingHeadName: v => (v.length < 2 ? 'Billing head name is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      BillingHeadService.getBillingHeadById(Number(id))
        .then((data: any) => {
          if (data) {
            form.setValues({
              billingHeadName: data.billingHeadName || '',
              isActive: data.isActive !== undefined ? data.isActive : true
            });
          }
        })
        .catch(() => {
          errorNotification('Billing head not found');
        });
    }
  }, [id, isEdit]);

  const handleSubmit = form.onSubmit(async (values: BillingHeadFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await BillingHeadService.updateBillingHead(Number(id), values);
        successNotification('Billing head updated successfully!');
      } else {
        await BillingHeadService.createBillingHead(values);
        successNotification('Billing head created successfully!');
      }
      navigate('/admin/mastersettings/billing-heads');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} billing head`);
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
          {isEdit ? 'Edit Billing Head' : 'Add Billing Head'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Billing Head Name" 
            withAsterisk 
            {...form.getInputProps('billingHeadName')} 
          />
          
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
              onClick={() => navigate('/admin/mastersettings/billing-heads')}
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