import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Title, Checkbox } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';
import { DepartmentServices } from '../../../Services/DepartmentServices';

interface ServiceGroupFormData {
  groupName: string;
  departmentId: string;
  isResultRequired: boolean;
  status: string;
}

export default function ServiceGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const isEdit = Boolean(id);

  const form = useForm<ServiceGroupFormData>({
    initialValues: {
      groupName: '',
      departmentId: '',
      isResultRequired: false,
      status: 'Active',
    },
    validate: {
      groupName: (value) => (!value ? 'Group name is required' : null),
      departmentId: (value) => (!value ? 'Department is required' : null),
      status: (value) => (!value ? 'Status is required' : null),
    },
  });

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  useEffect(() => {
    loadDepartments();
    if (isEdit && id) {
      loadServiceGroup();
    }
  }, [id, isEdit]);

  const loadDepartments = async () => {
    try {
      const response = await DepartmentServices.getAllDepartments();
      const deptList = response.departments || response;
      const deptOptions = deptList.map((dept: any) => ({
        value: dept.id.toString(),
        label: dept.name
      }));
      setDepartments(deptOptions);
    } catch {
      errorNotification('Failed to load departments');
    }
  };

  const loadServiceGroup = async () => {
    try {
      setLoading(true);
      const serviceGroup = await ServiceGroupService.getServiceGroupById(Number(id));
      form.setValues({
        groupName: serviceGroup.groupName || '',
        departmentId: serviceGroup.departmentId?.toString() || '',
        isResultRequired: serviceGroup.isResultRequired ?? false,
        status: serviceGroup.status || 'Active',
      });
    } catch {
      errorNotification('Failed to load service group');
      navigate('/admin/mastersettings/service-groups');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ServiceGroupFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        departmentId: Number(values.departmentId),
      };
      
      if (isEdit) {
        await ServiceGroupService.updateServiceGroup(Number(id), submitData);
        successNotification('Service group updated successfully!');
      } else {
        await ServiceGroupService.createServiceGroup(submitData);
        successNotification('Service group created successfully!');
      }
      navigate('/admin/mastersettings/service-groups');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} service group`);
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
          {isEdit ? 'Edit Service Group' : 'Add Service Group'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Group Name" 
            withAsterisk 
            {...form.getInputProps('groupName')} 
          />
          
          <Select
            label="Department"
            placeholder="Select department"
            data={departments}
            withAsterisk
            searchable
            {...form.getInputProps('departmentId')}
          />
          
          <Checkbox
            label="Is Result Required"
            {...form.getInputProps('isResultRequired', { type: 'checkbox' })}
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
              onClick={() => navigate('/admin/mastersettings/service-groups')}
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