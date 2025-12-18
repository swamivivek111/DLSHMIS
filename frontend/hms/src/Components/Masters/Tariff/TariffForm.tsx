import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, TextInput, Textarea } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { TariffService } from '../../../Services/TariffService';

interface TariffFormData {
  tariffName: string;
  tariffCode: string;
  description: string;
}

export default function TariffForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<TariffFormData>({
    initialValues: {
      tariffName: '',
      tariffCode: '',
      description: '',
    },
    validate: {
      tariffName: (value) => (!value ? 'Tariff name is required' : null),
    },
  });



  useEffect(() => {
    if (isEdit && id) {
      loadTariff();
    } else {
      loadNextTariffCode();
    }
  }, [id, isEdit]);

  const loadNextTariffCode = async () => {
    try {
      const nextCode = await TariffService.getNextTariffCode();
      form.setFieldValue('tariffCode', nextCode);
    } catch {
      // Ignore error, code will be generated on server
    }
  };

  const loadTariff = async () => {
    try {
      setLoading(true);
      const response = await TariffService.getTariffById(Number(id));
      const tariff = response.tariff;
      form.setValues({
        tariffName: tariff.tariffName || '',
        tariffCode: tariff.tariffCode || '',
        description: tariff.description || '',
      });
    } catch {
      errorNotification('Failed to load tariff');
      navigate('/admin/mastersettings/tariffs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: TariffFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await TariffService.updateTariff(Number(id), values);
        successNotification('Tariff updated successfully!');
      } else {
        await TariffService.createTariff(values);
        successNotification('Tariff created successfully!');
      }
      navigate('/admin/mastersettings/tariffs');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} tariff`);
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
          {isEdit ? 'Edit Tariff' : 'Add Tariff'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Tariff Name" withAsterisk {...form.getInputProps('tariffName')} />
          <TextInput label="Tariff Code" placeholder="Auto-generated" readOnly value={form.values.tariffCode || 'Loading...'} />
          <Textarea label="Description" {...form.getInputProps('description')} className="xl:col-span-2" />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/tariffs')}
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