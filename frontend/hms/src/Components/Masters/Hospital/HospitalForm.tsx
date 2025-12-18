import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch, Select, NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addHospital, getHospitalById, updateHospital } from '../../../Services/HospitalServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function HospitalForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateHospitalCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `HOS${timestamp}`;
  };

  const form = useForm({
    initialValues: {
      hospitalCode: '',
      hospitalName: '',
      hospitalType: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNumber: '',
      emailId: '',
      website: '',
      licenseNumber: '',
      registrationNumber: '',
      totalBeds: 0,
      icuBeds: 0,
      emergencyBeds: 0,
      establishedYear: '',
      accreditation: '',
      specialties: '',
      description: '',
      logoUrl: '',
      active: true,
    },
    validate: {
      hospitalName: v => (v.length < 2 ? 'Hospital Name is required' : null),
      emailId: v => (v && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? 'Invalid email' : null),
      phoneNumber: v => (v && !/^\d{10}$/.test(v) ? 'Invalid phone number' : null),
    },
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data: any = await getHospitalById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('Hospital not found');
        }
      })();
    } else {
      // Auto-generate hospital code for new hospitals
      form.setFieldValue('hospitalCode', generateHospitalCode());
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        const response = await updateHospital(id, values);
        successNotification(response.message);
      } else {
        const response = await addHospital(values);
        successNotification(response.message);
      }
      navigate('/admin/mastersettings/hospitals');
    } catch (error: any) {
      errorNotification(error.response?.data?.error || 'Operation failed');
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
          {isEdit ? 'Edit Hospital' : 'Add Hospital'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Hospital Code" readOnly {...form.getInputProps('hospitalCode')} />
        <TextInput label="Hospital Name" withAsterisk {...form.getInputProps('hospitalName')} />
        
        <Select
          label="Hospital Type"
          placeholder="Select type"
          data={[
            { value: 'Government', label: 'Government' },
            { value: 'Private', label: 'Private' },
            { value: 'Trust', label: 'Trust' },
            { value: 'Corporate', label: 'Corporate' },
          ]}
          {...form.getInputProps('hospitalType')}
        />
        
        <TextInput label="Phone Number" {...form.getInputProps('phoneNumber')} />
        <TextInput label="Email ID" {...form.getInputProps('emailId')} />
        <TextInput label="Website" {...form.getInputProps('website')} />
        
        <TextInput label="City" {...form.getInputProps('city')} />
        <TextInput label="State" {...form.getInputProps('state')} />
        <TextInput label="Country" {...form.getInputProps('country')} />
        <TextInput label="Pincode" {...form.getInputProps('pincode')} />
        
        <TextInput label="License Number" {...form.getInputProps('licenseNumber')} />
        <TextInput label="Registration Number" {...form.getInputProps('registrationNumber')} />
        
        <NumberInput label="Total Beds" {...form.getInputProps('totalBeds')} />
        <NumberInput label="ICU Beds" {...form.getInputProps('icuBeds')} />
        <NumberInput label="Emergency Beds" {...form.getInputProps('emergencyBeds')} />
        
        <TextInput label="Established Year" {...form.getInputProps('establishedYear')} />
        
        <Select
          label="Accreditation"
          placeholder="Select accreditation"
          data={[
            { value: 'NABH', label: 'NABH' },
            { value: 'JCI', label: 'JCI' },
            { value: 'ISO', label: 'ISO' },
            { value: 'NABL', label: 'NABL' },
          ]}
          {...form.getInputProps('accreditation')}
        />
        
        <Textarea label="Address" {...form.getInputProps('address')} className="xl:col-span-2" />
        <Textarea label="Specialties" {...form.getInputProps('specialties')} className="xl:col-span-2" />
        <Textarea label="Description" {...form.getInputProps('description')} className="xl:col-span-2" />
        
        <div className="flex items-center xl:justify-end">
          <Switch
            label="Active"
            className="px-2 py-1 rounded"
            color="#202A44"
            labelPosition="left"
            {...form.getInputProps('active', { type: 'checkbox' })}
          />
        </div>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button type="submit" loading={loading} variant="outline">
            {isEdit ? 'Update' : 'Save'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/mastersettings/hospitals')}
          >
            Cancel
          </Button>
        </div>
      </form>
      </div>
    </motion.div>
  );
}