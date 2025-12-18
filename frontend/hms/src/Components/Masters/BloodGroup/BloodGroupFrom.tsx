import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addBloodGroup, getBloodGroupById, updateBloodGroup } from '../../../Services/BloodGroupServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { getHospital } from '../../../Services/HospitalServices';

export default function BloodGroupForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      bloodGroupId: '',
      bloodGroup: '',
      hospitalId: '',
      createdBy: '',
      description: '',
      active: true,
    },
    validate: {
      bloodGroup: v => (v.length < 2 ? 'Blood Group is required' : null),
    },
  });
  
  const [hospitals, setHospitals] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const res = await getHospital(1, 100, '');
      const hospitals = res.hospitals || res.data || [];
      const hospitalOptions = hospitals.map((hospital: any) => ({
        value: (hospital.hospitalId || hospital.id).toString(),
        label: hospital.hospitalName || hospital.name,
      }));
      setHospitals(hospitalOptions);
    } catch (error) {
      console.error('Failed to load hospitals:', error);
      errorNotification('Failed to load hospitals');
    }
  };

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data: any = await getBloodGroupById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('BloodGroup Not found');
        }
      })();
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateBloodGroup(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/bloodGroups');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        addBloodGroup(values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/bloodGroups');
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
          {isEdit ? 'Edit Blood Group' : 'Add Blood Group'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Blood Group" withAsterisk {...form.getInputProps('bloodGroup')} />
          <TextInput label="Created By" {...form.getInputProps('createdBy')} />
          <Select
            label="Hospital"
            placeholder="Select hospital"
            data={hospitals}
            withAsterisk
            searchable
            {...form.getInputProps('hospitalId')}
          />
          
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
              onClick={() => navigate('/admin/mastersettings/bloodGroups')}
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