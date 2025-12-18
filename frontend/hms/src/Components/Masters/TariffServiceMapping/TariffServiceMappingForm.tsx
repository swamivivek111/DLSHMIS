import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title, NumberInput, Radio, Group, Checkbox } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { TariffServiceMappingService } from '../../../Services/TariffServiceMappingService';
import { ServiceMasterService } from '../../../Services/ServiceMasterService';
import { TariffService } from '../../../Services/TariffService';

export default function TariffServiceMappingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [tariffs, setTariffs] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm({
    initialValues: {
      defaultTariffName: 'GENERAL / CASH',
      companyTariffCategoryId: '',
      getServices: 'GET',
      serviceId: '',
      serviceName: '',
      corporateServiceName: '',
      qty: '',
      baseRate: 0,
      companyTariffRate: 0,
      discountPerc: 0,
      discountAmount: 0,
      isActive: true,
    },
    validate: {
      serviceId: (value) => (!value ? 'Service is required' : null),
      corporateServiceName: (value) => (!value ? 'Corporate service name is required' : null),
    },
  });

  useEffect(() => {
    loadMasterData();
    if (isEdit && id) {
      loadMapping();
    }
  }, [id, isEdit]);

  const loadMasterData = async () => {
    try {
      const [servicesData, tariffsResponse] = await Promise.all([
        ServiceMasterService.getAllServices(),
        TariffService.getAllTariffs()
      ]);

      const tariffsData = tariffsResponse.tariffs || [];
      setServices(servicesData.map((s: any) => ({ value: s.tariffId.toString(), label: s.serviceName, data: s })));
      setTariffs(tariffsData.map((t: any) => ({ value: t.tariffId.toString(), label: t.tariffName })));
      
      // Set default tariff name to General if not editing
      if (!isEdit) {
        const generalTariff = tariffsData.find((t: any) => t.tariffName?.toLowerCase().includes('general'));
        if (generalTariff) {
          form.setFieldValue('defaultTariffName', generalTariff.tariffName);
        }
      }
    } catch {
      errorNotification('Failed to load master data');
    }
  };

  const loadMapping = async () => {
    try {
      setLoading(true);
      const mapping = await TariffServiceMappingService.getTariffServiceMappingById(Number(id));
      form.setValues({
        ...mapping,
        companyTariffCategoryId: mapping.companyTariffCategoryId?.toString() || '',
        serviceId: mapping.serviceId?.toString() || '',
      });
    } catch {
      errorNotification('Failed to load mapping');
      navigate('/admin/mastersettings/tariff-service-mappings');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    const service = services.find(s => s.value === serviceId);
    if (service) {
      setSelectedService(service.data);
      form.setFieldValue('serviceId', serviceId);
      form.setFieldValue('serviceName', service.data.serviceName);
      // Only set baseRate if it's currently 0 (not manually entered)
      if (form.values.baseRate === 0) {
        form.setFieldValue('baseRate', service.data.opdServicePrice || 0);
      }
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        serviceId: Number(values.serviceId),
        companyTariffCategoryId: values.companyTariffCategoryId ? Number(values.companyTariffCategoryId) : null,
        baseRate: Number(values.baseRate) || 0,
        companyTariffRate: Number(values.companyTariffRate) || 0,
        discountPerc: Number(values.discountPerc) || 0,
        discountAmount: Number(values.discountAmount) || 0,
      };
      
      if (isEdit) {
        await TariffServiceMappingService.updateTariffServiceMapping(Number(id), submitData);
        successNotification('Tariff service mapping updated successfully!');
      } else {
        await TariffServiceMappingService.createTariffServiceMapping(submitData);
        successNotification('Tariff service mapping created successfully!');
      }
      navigate('/admin/mastersettings/tariff-service-mappings');
    } catch (error: any) {
      console.error('Submit error:', error);
      const errorMsg = error.response?.data?.message || error.message || `Failed to ${isEdit ? 'update' : 'create'} tariff service mapping`;
      errorNotification(errorMsg);
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
          {isEdit ? 'Edit Tariff Service Mapping' : 'Add Tariff Service Mapping'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <TextInput 
            label="Default Tariff Name" 
            readOnly
            {...form.getInputProps('defaultTariffName')} 
          />
          
          <Select
            label="Company Tariff Category"
            placeholder="Select tariff category"
            data={tariffs}
            searchable
            {...form.getInputProps('companyTariffCategoryId')}
          />

          <div>
            <label className="text-sm font-medium mb-2 block">Get Services</label>
            <Group mt="xs">
              <Radio 
                value="GET" 
                label="GET" 
                checked={showSubOptions}
                onChange={() => setShowSubOptions(true)}
              />
              <Radio 
                value="PENDING" 
                label="PENDING" 
                disabled={!showSubOptions}
                checked={form.values.getServices === 'PENDING'}
                onChange={() => form.setFieldValue('getServices', 'PENDING')}
              />
              <Radio 
                value="MAPPED" 
                label="MAPPED" 
                disabled={!showSubOptions}
                checked={form.values.getServices === 'MAPPED'}
                onChange={() => form.setFieldValue('getServices', 'MAPPED')}
              />
            </Group>
          </div>

          <Select
            label="Service"
            placeholder="Select service"
            data={services}
            searchable
            withAsterisk
            {...form.getInputProps('serviceId')}
            onChange={handleServiceChange}
          />

          <TextInput 
            label="Service Name" 
            readOnly
            {...form.getInputProps('serviceName')} 
          />

          <TextInput 
            label="Corporate Service Name" 
            withAsterisk
            {...form.getInputProps('corporateServiceName')} 
          />

          <TextInput 
            label="Quantity" 
            {...form.getInputProps('qty')} 
          />

          <NumberInput 
            label="Base Rate (Original)" 
            {...form.getInputProps('baseRate')} 
          />

          <NumberInput 
            label="Company Tariff Rate" 
            {...form.getInputProps('companyTariffRate')} 
          />

          <NumberInput 
            label="Discount Percentage" 
            {...form.getInputProps('discountPerc')} 
          />

          <NumberInput 
            label="Discount Amount" 
            {...form.getInputProps('discountAmount')} 
          />

          <Checkbox 
            label="Is Active" 
            {...form.getInputProps('isActive', { type: 'checkbox' })} 
          />

          <div className="xl:col-span-3 flex justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/tariff-service-mappings')}
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