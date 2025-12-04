import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Button, Select, Switch, TextInput, Textarea } from '@mantine/core';
import { motion } from 'framer-motion';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { CashCounterService } from '../../../Services/CashCounterService';

interface CashCounterFormData {
  counterName: string;
  description: string;
  systemName: string;
  tokenRequired: boolean;
  counterType: string;
}

export default function CashCounterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<CashCounterFormData>({
    initialValues: {
      counterName: '',
      description: '',
      systemName: '',
      tokenRequired: false,
      counterType: '',
    },
    validate: {
      counterName: (value) => (!value ? 'Counter name is required' : null),
      counterType: (value) => (!value ? 'Counter type is required' : null),
    },
  });

  const counterTypes = [
    { value: 'OPD_BILLING', label: 'OPD Billing' },
    { value: 'IPD_BILLING', label: 'IPD Billing' },
    { value: 'RECEPTION', label: 'Reception' },
    { value: 'OPD_PHARMACY', label: 'OPD Pharmacy' },
    { value: 'PATHOLOGY', label: 'Pathology' },
    { value: 'RADIOLOGY', label: 'Radiology' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadCashCounter();
    }
  }, [id, isEdit]);

  const loadCashCounter = async () => {
    try {
      setLoading(true);
      const response = await CashCounterService.getCashCounterById(Number(id));
      const counter = response.cashCounter;
      form.setValues({
        counterName: counter.counterName || '',
        description: counter.description || '',
        systemName: counter.systemName || '',
        tokenRequired: counter.tokenRequired || false,
        counterType: counter.counterType || '',
      });
    } catch {
      errorNotification('Failed to load cash counter');
      navigate('/admin/mastersettings/cash-counters');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CashCounterFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await CashCounterService.updateCashCounter(Number(id), values);
        successNotification('Cash counter updated successfully!');
      } else {
        await CashCounterService.createCashCounter(values);
        successNotification('Cash counter created successfully!');
      }
      navigate('/admin/mastersettings/cash-counters');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} cash counter`);
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
          {isEdit ? 'Edit Cash Counter' : 'Add Cash Counter'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput
            label="Counter Name"
            placeholder="Enter counter name"
            withAsterisk
            {...form.getInputProps('counterName')}
          />

          <Select
            label="Counter Type"
            placeholder="Select counter type"
            data={counterTypes}
            withAsterisk
            {...form.getInputProps('counterType')}
          />

          <TextInput
            label="System Name"
            placeholder="Enter system name"
            {...form.getInputProps('systemName')}
          />

          <Textarea
            label="Description"
            placeholder="Enter description"
            {...form.getInputProps('description')}
            className="xl:col-span-2"
          />

          <div className="flex items-center xl:justify-end">
            <Switch
              label="Token Required"
              className="px-2 py-1 rounded"
              color="#202A44"
              labelPosition="left"
              {...form.getInputProps('tokenRequired', { type: 'checkbox' })}
            />
          </div>

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/cash-counters')}
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