import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { Button, Container, Paper, Select, TextInput, Textarea, Title } from '@mantine/core';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ReferralNameService } from '../../../Services/ReferralNameService';
import { ReferralTypeService } from '../../../Services/ReferralTypeService';

interface ReferralNameFormData {
  referralTypeId: string;
  referralName: string;
  referralAddress: string;
}

export default function ReferralNameForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [referralTypes, setReferralTypes] = useState<{ value: string; label: string }[]>([]);
  const isEdit = Boolean(id);

  const form = useForm<ReferralNameFormData>({
    initialValues: {
      referralTypeId: '',
      referralName: '',
      referralAddress: '',
    },
    validate: {
      referralTypeId: (value) => (!value ? 'Referral type is required' : null),
      referralName: (value) => (!value ? 'Referral name is required' : null),
    },
  });



  useEffect(() => {
    loadReferralTypes();
    if (isEdit && id) {
      loadReferralName();
    }
  }, [id, isEdit]);

  const loadReferralTypes = async () => {
    try {
      const res = await ReferralTypeService.getAllReferralTypes();
      const typeOptions = (res.referralTypes || []).map((type: any) => ({
        value: type.referralTypeId.toString(),
        label: type.referralTypeName,
      }));
      setReferralTypes(typeOptions);
    } catch {
      errorNotification('Failed to load referral types');
    }
  };

  const loadReferralName = async () => {
    try {
      setLoading(true);
      const response = await ReferralNameService.getReferralNameById(Number(id));
      const referral = response.referralName;
      form.setValues({
        referralTypeId: referral.referralTypeId?.toString() || '',
        referralName: referral.referralName || '',
        referralAddress: referral.referralAddress || '',
      });
    } catch {
      errorNotification('Failed to load referral name');
      navigate('/admin/mastersettings/referral-names');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ReferralNameFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        referralTypeId: Number(values.referralTypeId),
      };
      
      if (isEdit) {
        await ReferralNameService.updateReferralName(Number(id), submitData);
        successNotification('Referral name updated successfully!');
      } else {
        await ReferralNameService.createReferralName(submitData);
        successNotification('Referral name created successfully!');
      }
      navigate('/admin/mastersettings/referral-names');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} referral name`);
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
          {isEdit ? 'Edit Referral Name' : 'Add Referral Name'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Referral Type"
            placeholder="Select referral type"
            data={referralTypes}
            withAsterisk
            searchable
            {...form.getInputProps('referralTypeId')}
          />
          
          <TextInput 
            label="Referral Name" 
            withAsterisk 
            {...form.getInputProps('referralName')} 
          />
          
          <Textarea 
            label="Referral Address" 
            {...form.getInputProps('referralAddress')} 
            className="xl:col-span-2" 
            rows={4}
          />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/referral-names')}
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