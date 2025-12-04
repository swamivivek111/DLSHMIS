import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, TextInput, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ReferralTypeService } from '../../../Services/ReferralTypeService';

interface ReferralTypeFormData {
  referralTypeName: string;
}

export default function ReferralTypeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const form = useForm<ReferralTypeFormData>({
    initialValues: {
      referralTypeName: '',
    },
    validate: {
      referralTypeName: (value) => (!value ? 'Referral type name is required' : null),
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadReferralType();
    }
  }, [id, isEdit]);

  const loadReferralType = async () => {
    try {
      setLoading(true);
      const response = await ReferralTypeService.getReferralTypeById(Number(id));
      const type = response.referralType;
      form.setValues({
        referralTypeName: type.referralTypeName || '',
      });
    } catch {
      errorNotification('Failed to load referral type');
      navigate('/admin/mastersettings/referral-types');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ReferralTypeFormData) => {
    try {
      setLoading(true);
      if (isEdit) {
        await ReferralTypeService.updateReferralType(Number(id), values);
        successNotification('Referral type updated successfully!');
      } else {
        await ReferralTypeService.createReferralType(values);
        successNotification('Referral type created successfully!');
      }
      navigate('/admin/mastersettings/referral-types');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} referral type`);
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
          {isEdit ? 'Edit Referral Type' : 'Add Referral Type'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput 
            label="Referral Type Name" 
            withAsterisk 
            {...form.getInputProps('referralTypeName')} 
            className="xl:col-span-2"
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/referral-types')}
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