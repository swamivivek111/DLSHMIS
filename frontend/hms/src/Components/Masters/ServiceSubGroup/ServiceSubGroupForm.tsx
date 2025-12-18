import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceSubGroupService } from '../../../Services/ServiceSubGroupService';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';

interface ServiceSubGroupFormData {
  groupId: string;
  subGroupName: string;
  status: string;
}

export default function ServiceSubGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serviceGroups, setServiceGroups] = useState<any[]>([]);
  const isEdit = Boolean(id);

  const form = useForm<ServiceSubGroupFormData>({
    initialValues: {
      groupId: '',
      subGroupName: '',
      status: 'Active',
    },
    validate: {
      groupId: (value) => (!value ? 'Group is required' : null),
      subGroupName: (value) => (!value ? 'Sub group name is required' : null),
      status: (value) => (!value ? 'Status is required' : null),
    },
  });

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  useEffect(() => {
    loadServiceGroups();
    if (isEdit && id) {
      loadServiceSubGroup();
    }
  }, [id, isEdit]);

  const loadServiceGroups = async () => {
    try {
      const response = await ServiceGroupService.getAllServiceGroups();
      const groupOptions = response.map((group: any) => ({
        value: group.groupId.toString(),
        label: group.groupName
      }));
      setServiceGroups(groupOptions);
    } catch {
      errorNotification('Failed to load service groups');
    }
  };

  const loadServiceSubGroup = async () => {
    try {
      setLoading(true);
      const serviceSubGroup = await ServiceSubGroupService.getServiceSubGroupById(Number(id));
      form.setValues({
        groupId: serviceSubGroup.groupId?.toString() || '',
        subGroupName: serviceSubGroup.subGroupName || '',
        status: serviceSubGroup.status || 'Active',
      });
    } catch {
      errorNotification('Failed to load service sub group');
      navigate('/admin/mastersettings/service-sub-groups');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ServiceSubGroupFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        groupId: Number(values.groupId),
      };
      
      if (isEdit) {
        await ServiceSubGroupService.updateServiceSubGroup(Number(id), submitData);
        successNotification('Service sub group updated successfully!');
      } else {
        await ServiceSubGroupService.createServiceSubGroup(submitData);
        successNotification('Service sub group created successfully!');
      }
      navigate('/admin/mastersettings/service-sub-groups');
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessage || error.response?.data?.message || error.message || `Failed to ${isEdit ? 'update' : 'create'} service sub group`;
      errorNotification(errorMessage);
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
          {isEdit ? 'Edit Service Sub Group' : 'Add Service Sub Group'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Group"
            placeholder="Select group"
            data={serviceGroups}
            withAsterisk
            searchable
            {...form.getInputProps('groupId')}
          />
          
          <TextInput 
            label="Sub Group Name" 
            withAsterisk 
            {...form.getInputProps('subGroupName')} 
          />
          
          <Select
            label="Status"
            data={statusOptions}
            withAsterisk
            {...form.getInputProps('status')}
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-sub-groups')}
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