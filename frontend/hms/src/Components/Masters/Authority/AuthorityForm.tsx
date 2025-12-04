import { useForm } from '@mantine/form';
import { Button, TextInput, Switch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addAuthority, getAuthorityById, updateAuthority } from '../../../Services/AuthorityServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function AuthorityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      authorityId: '',
      authorityCode: '',
      authorityName: '',
      approvalLimit: '',
      isActive: true,
      createdBy: 1,
    },
    validate: {
      authorityName: v => (v.length < 2 ? 'Authority name is required' : null),
      authorityCode: v => (v.length < 1 ? 'Authority code is required' : null),
      approvalLimit: v => (!v ? 'Approval limit is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      getAuthorityById(Number(id))
        .then((data: any) => {
          if (data) {
            form.setValues({
              authorityId: data.authorityId || '',
              authorityCode: data.authorityCode || '',
              authorityName: data.authorityName || '',
              approvalLimit: data.approvalLimit || '',
              isActive: data.isActive !== undefined ? data.isActive : true,
              createdBy: data.createdBy || 1
            });
          }
        })
        .catch(() => {
          errorNotification('Authority not found');
        });
    }
  }, [id, isEdit]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      if (isEdit) {
        updateAuthority(id, values).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/authorities');
        }).catch((error) => {
          errorNotification(error.response?.data?.errorMessage || 'Failed to update authority');
        }).finally(() => { setLoading(false); });
      } else {
        const payload = { ...values };
        delete payload.authorityId;
        addAuthority(payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/authorities');
        }).catch((error) => {
          errorNotification(error.response?.data?.errorMessage || 'Failed to create authority');
        }).finally(() => { setLoading(false); });
      }
    } catch {
      errorNotification('Failed to save authority');
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
          {isEdit ? 'Edit Authority' : 'Add Authority'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Authority Name" withAsterisk {...form.getInputProps('authorityName')} />
          <TextInput label="Authority Code" withAsterisk {...form.getInputProps('authorityCode')} />
          <TextInput label="Approval Limit" withAsterisk {...form.getInputProps('approvalLimit')} />
          
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
            <Button 
              type="submit" 
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
              loading={loading}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/authorities')}
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