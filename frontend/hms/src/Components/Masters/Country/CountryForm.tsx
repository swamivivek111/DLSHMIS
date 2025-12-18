import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addCountry, getCountryById, updateCountry } from '../../../Services/CountryServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function CountryForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      countryName: '',
      countryCode: '',
      createdBy: '',
      description: '',
      active: true,
    },
    validate: {
      countryName: v => (v.length < 2 ? 'Name is required' : null),
      countryCode: v => (v.length < 1 ? 'Code is required' : null),
    },
  });

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isEdit && id) {
      loadCountryData();
    }
  }, [id]);

  const loadCountryData = async () => {
    try {
      const data: any = await getCountryById(Number(id));
      form.setValues(data);
    } catch {
      errorNotification('Country Not found');
    }
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateCountry(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/countrys');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        const payload = { ...values };
        delete payload.countryId;
        addCountry(payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/countrys');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      }
    } catch {
      errorNotification('Failed');
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
          {isEdit ? 'Edit Country' : 'Add Country'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Country Name" withAsterisk {...form.getInputProps('countryName')} />
          <TextInput label="Country Code" withAsterisk {...form.getInputProps('countryCode')} />
          <TextInput label="Created By" {...form.getInputProps('createdBy')} />

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
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/countrys')}
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