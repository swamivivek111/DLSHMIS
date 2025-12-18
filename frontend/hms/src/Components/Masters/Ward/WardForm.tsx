import { useForm } from '@mantine/form';
import { Button, TextInput, Select, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WardServices } from '../../../Services/WardServices';
import { DepartmentServices } from '../../../Services/DepartmentServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function WardForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);

  const form = useForm({
    initialValues: {
      wardName: '',
      wardType: '',
      floorNo: '',
      blockBuildingName: '',
      description: '',
      departmentId: '',
      status: 'ACTIVE',
    },
    validate: {
      wardName: v => (v.length < 2 ? 'Ward name is required' : null),
      wardType: v => (!v ? 'Ward type is required' : null),
      floorNo: v => (!v ? 'Floor number is required' : null),
      blockBuildingName: v => (!v ? 'Block/Building name is required' : null),
      departmentId: v => (!v ? 'Department is required' : null),
    },
  });

  useEffect(() => {
    loadDepartments();
    if (isEdit && id) {
      WardServices.getWardById(parseInt(id))
        .then((data: any) => {
          if (data) {
            form.setValues({
              wardName: data.wardName || '',
              wardType: data.wardType || '',
              floorNo: data.floorNo || '',
              blockBuildingName: data.blockBuildingName || '',
              description: data.description || '',
              departmentId: data.departmentId?.toString() || '',
              status: data.status || 'ACTIVE'
            });
          }
        })
        .catch(() => {
          errorNotification('Ward not found');
        });
    }
  }, [id, isEdit]);

  const loadDepartments = async () => {
    try {
      const response = await DepartmentServices.getDepartment(1, 1000, '');
      const departmentsData = response.data || [];
      setDepartments(departmentsData.map((d: any) => ({
        value: d.id.toString(),
        label: d.name
      })));
    } catch (error) {
      errorNotification('Failed to load departments');
    }
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      const selectedDepartment = departments.find(d => d.value === values.departmentId);
      const wardData = {
        ...values,
        departmentId: parseInt(values.departmentId),
        departmentName: selectedDepartment?.label || '',
      };

      if (isEdit) {
        await WardServices.updateWard(parseInt(id!), wardData);
        successNotification('Ward updated successfully!');
      } else {
        await WardServices.addWard(wardData);
        successNotification('Ward created successfully!');
      }
      navigate('/admin/mastersettings/wards');
    } catch (error) {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} ward`);
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
          {isEdit ? 'Edit Ward' : 'Add Ward'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Ward Name" withAsterisk {...form.getInputProps('wardName')} />
          <Select
            label="Ward Type"
            withAsterisk
            data={[
              { value: 'GENERAL', label: 'General' },
              { value: 'SEMI_SPECIAL', label: 'Semi-special' },
              { value: 'SPECIAL', label: 'Special' },
              { value: 'ICU', label: 'ICU' },
              { value: 'ISOLATION', label: 'Isolation' },
            ]}
            {...form.getInputProps('wardType')}
          />
          <TextInput label="Floor No" withAsterisk {...form.getInputProps('floorNo')} />
          <TextInput label="Block/Building Name" withAsterisk {...form.getInputProps('blockBuildingName')} />
          <Select
            label="Department"
            withAsterisk
            data={departments}
            searchable
            {...form.getInputProps('departmentId')}
          />
          <Select
            label="Status"
            data={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
            ]}
            {...form.getInputProps('status')}
          />
          <Textarea label="Description" {...form.getInputProps('description')} className="xl:col-span-2" />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/wards')}
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