import { useForm } from '@mantine/form';
import { Button, TextInput, Select, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WardGroupService } from '../../../Services/WardGroupService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function WardGroupForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      wardGroupName: '',
      wardGroupCategory: '',
      isActive: true,
    },
    validate: {
      wardGroupName: v => (v.length < 2 ? 'Ward group name is required' : null),
      wardGroupCategory: v => (!v ? 'Ward group category is required' : null),
    },
  });

  const categoryOptions = [
    { value: 'ICU', label: 'ICU' },
    { value: 'NON_ICU', label: 'NON ICU' },
  ];

  useEffect(() => {
    if (isEdit && id) {
      WardGroupService.getWardGroupById(Number(id))
        .then((data: any) => {
          if (data) {
            form.setValues({
              wardGroupName: data.wardGroupName || '',
              wardGroupCategory: data.wardGroupCategory || '',
              isActive: data.isActive !== undefined ? data.isActive : true
            });
          }
        })
        .catch(() => {
          errorNotification('Ward group not found');
        });
    }
  }, [id, isEdit]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        await WardGroupService.updateWardGroup(Number(id), values);
        successNotification('Ward group updated successfully!');
      } else {
        await WardGroupService.createWardGroup(values);
        successNotification('Ward group created successfully!');
      }
      navigate('/admin/mastersettings/ward-groups');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} ward group`);
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
          {isEdit ? 'Edit Ward Group' : 'Add Ward Group'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Ward Group Name" 
            withAsterisk 
            {...form.getInputProps('wardGroupName')} 
          />
          
          <Select
            label="Ward Group Category"
            withAsterisk
            data={categoryOptions}
            {...form.getInputProps('wardGroupCategory')}
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
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/ward-groups')}
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