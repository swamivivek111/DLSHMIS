import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addDepartment, getDepartmentById, updateDepartment } from '../../../Services/DepartmentServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { getHospital } from '../../../Services/HospitalServices';

export default function DepartmentForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      code: '',
      description: '',
      headOfDepartment: '',
      contactNumber: '',
      email: '',
      hospitalId: '',
      active: true,
    },
    validate: {
      name: v => (v.length < 2 ? 'Name is required' : null),
      code: v => (v.length < 1 ? 'Code is required' : null),
      email: v => (!v ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? 'Invalid email' : null),
      contactNumber: v => (!v ? 'Contact Number is required' : !/^\d{10}$/.test(v) ? 'Invalid number' : null),
      hospitalId: v => (!v ? 'Hospital is required' : null),
    },
  });
  
  const [hospitals, setHospitals] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load hospitals
      const hospitalRes = await getHospital(1, 100, '');
      const hospitalOptions = hospitalRes.data.map((hospital: any) => ({
        value: (hospital.hospitalId || hospital.id).toString(),
        label: hospital.hospitalName || hospital.name,
      }));
      setHospitals(hospitalOptions);

      // Load department data after dropdowns are populated
      if (isEdit && id) {
        setTimeout(() => loadDepartmentData(), 100);
      }
    } catch {
      errorNotification('Failed to load data');
    }
  };

  const loadDepartmentData = async () => {
    try {
      const data: any = await getDepartmentById(Number(id));
      form.setValues({
        ...data,
        hospitalId: data.hospitalId?.toString() || ''
      });
    } catch {
      errorNotification('Department Not found');
    }
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateDepartment(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/departments');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        const payload = {
          ...values,
          hospitalId: parseInt(values.hospitalId)
        };
        delete payload.id;
        addDepartment(payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/departments');
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
          {isEdit ? 'Edit Department' : 'Add Department'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
          <TextInput label="Code" withAsterisk {...form.getInputProps('code')} />
          <TextInput label="Head of Department" {...form.getInputProps('headOfDepartment')} />
          <TextInput label="Contact Number" withAsterisk {...form.getInputProps('contactNumber')} />
          <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
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
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/departments')}
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