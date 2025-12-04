import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Grid, Paper, Select, Switch, TextInput, Textarea, Title, NumberInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { TariffService } from '../../../Services/TariffService';

interface TariffFormData {
  serviceName: string;
  serviceCode: string;
  description: string;
  basePrice: number;
  discountPrice?: number;
  serviceCategory: string;
  department: string;
  unit: string;
  taxPercentage?: number;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
}

export default function TariffForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<TariffFormData>({
    initialValues: {
      serviceName: '',
      serviceCode: '',
      description: '',
      basePrice: 0,
      discountPrice: 0,
      serviceCategory: '',
      department: '',
      unit: '',
      taxPercentage: 0,
      isActive: true,
      effectiveFrom: new Date(),
    },
    validate: {
      serviceName: (value) => (!value ? 'Service name is required' : null),
      basePrice: (value) => (value <= 0 ? 'Base price must be greater than 0' : null),
      serviceCategory: (value) => (!value ? 'Service category is required' : null),
      department: (value) => (!value ? 'Department is required' : null),
      unit: (value) => (!value ? 'Unit is required' : null),
    },
  });

  const serviceCategories = [
    { value: 'CONSULTATION', label: 'Consultation' },
    { value: 'DIAGNOSTIC', label: 'Diagnostic' },
    { value: 'TREATMENT', label: 'Treatment' },
    { value: 'SURGERY', label: 'Surgery' },
    { value: 'LABORATORY', label: 'Laboratory' },
    { value: 'RADIOLOGY', label: 'Radiology' },
    { value: 'PHARMACY', label: 'Pharmacy' },
    { value: 'EMERGENCY', label: 'Emergency' },
    { value: 'ADMISSION', label: 'Admission' },
    { value: 'DISCHARGE', label: 'Discharge' },
  ];

  const departments = [
    { value: 'CARDIOLOGY', label: 'Cardiology' },
    { value: 'NEUROLOGY', label: 'Neurology' },
    { value: 'ORTHOPEDICS', label: 'Orthopedics' },
    { value: 'PEDIATRICS', label: 'Pediatrics' },
    { value: 'GYNECOLOGY', label: 'Gynecology' },
    { value: 'GENERAL_MEDICINE', label: 'General Medicine' },
    { value: 'SURGERY', label: 'Surgery' },
    { value: 'EMERGENCY', label: 'Emergency' },
    { value: 'RADIOLOGY', label: 'Radiology' },
    { value: 'LABORATORY', label: 'Laboratory' },
  ];

  const units = [
    { value: 'PER_VISIT', label: 'Per Visit' },
    { value: 'PER_HOUR', label: 'Per Hour' },
    { value: 'PER_DAY', label: 'Per Day' },
    { value: 'PER_TEST', label: 'Per Test' },
    { value: 'PER_PROCEDURE', label: 'Per Procedure' },
    { value: 'PER_ITEM', label: 'Per Item' },
    { value: 'LUMP_SUM', label: 'Lump Sum' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      loadTariff();
    }
  }, [id, isEdit]);

  const loadTariff = async () => {
    try {
      setLoading(true);
      const response = await TariffService.getTariffById(Number(id));
      const tariff = response.tariff;
      form.setValues({
        ...tariff,
        effectiveFrom: tariff.effectiveFrom ? new Date(tariff.effectiveFrom) : new Date(),
        effectiveTo: tariff.effectiveTo ? new Date(tariff.effectiveTo) : undefined,
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
          <TextInput label="Service Name" withAsterisk {...form.getInputProps('serviceName')} />
          <TextInput label="Service Code" {...form.getInputProps('serviceCode')} />
          
          <Select
            label="Service Category"
            placeholder="Select category"
            data={serviceCategories}
            withAsterisk
            {...form.getInputProps('serviceCategory')}
          />
          
          <Select
            label="Department"
            placeholder="Select department"
            data={departments}
            withAsterisk
            {...form.getInputProps('department')}
          />
          
          <NumberInput
            label="Base Price"
            placeholder="0.00"
            min={0}
            decimalScale={2}
            withAsterisk
            {...form.getInputProps('basePrice')}
          />
          
          <NumberInput
            label="Discount Price"
            placeholder="0.00"
            min={0}
            decimalScale={2}
            {...form.getInputProps('discountPrice')}
          />
          
          <NumberInput
            label="Tax %"
            placeholder="0.00"
            min={0}
            max={100}
            decimalScale={2}
            {...form.getInputProps('taxPercentage')}
          />
          
          <Select
            label="Unit"
            placeholder="Select unit"
            data={units}
            withAsterisk
            {...form.getInputProps('unit')}
          />
          
          <DateTimePicker
            label="Effective From"
            placeholder="Select date and time"
            {...form.getInputProps('effectiveFrom')}
          />
          
          <DateTimePicker
            label="Effective To"
            placeholder="Select date and time"
            {...form.getInputProps('effectiveTo')}
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
              onClick={() => navigate('/admin/mastersettings/tariffs')}
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