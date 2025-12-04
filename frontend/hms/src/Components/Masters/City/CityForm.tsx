import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addCity, getCityById, updateCity } from '../../../Services/CityServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { getTaluka } from '../../../Services/TalukaServices';

export default function CityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      talukaId: '',
      cityName: '',
      pinCode: '',
      createdBy: '',
      description: '',
      active: true,
    },
    validate: {
      cityName: v => (v.length < 2 ? 'Name is required' : null),
      pinCode: v => (v.length < 1 ? 'Pin Code is required' : null),
      talukaId: v => (!v ? 'Taluka is required' : null),
    },
  });
  
  const [talukas, setTalukas] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load talukas
      const talukaRes = await getTaluka(1, 100, '');
      const talukaOptions = talukaRes.data.map((taluka: any) => ({
        value: (taluka.talukaId || taluka.id).toString(),
        label: taluka.talukaName || taluka.name,
      }));
      setTalukas(talukaOptions);

      // Load city data after dropdowns are populated
      if (isEdit && id) {
        setTimeout(() => loadCityData(), 100);
      }
    } catch {
      errorNotification('Failed to load data');
    }
  };

  const loadCityData = async () => {
    try {
      const data: any = await getCityById(Number(id));
      form.setValues({
        ...data,
        talukaId: data.talukaId?.toString() || ''
      });
    } catch {
      errorNotification('City Not found');
    }
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateCity(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/citys');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        const payload = {
          ...values,
          talukaId: parseInt(values.talukaId)
        };
        delete payload.cityId;
        addCity(payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/citys');
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
          {isEdit ? 'Edit City' : 'Add City'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Taluka"
            placeholder="Select taluka"
            data={talukas}
            withAsterisk
            searchable
            {...form.getInputProps('talukaId')}
          />
          <TextInput label="City Name" withAsterisk {...form.getInputProps('cityName')} />
          <TextInput label="Pin Code" withAsterisk {...form.getInputProps('pinCode')} />
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
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/citys')}
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