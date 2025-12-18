import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Switch, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addCompany, getCompanyById, updateCompany } from '../../../Services/CompanyServices';
import { getPatientCategory } from '../../../Services/PatientCategoryServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function CompanyForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientCategories, setPatientCategories] = useState<any[]>([]);

  const form = useForm({
    initialValues: {
      companyId: '',
      companyCode: '',
      companyName: '',
      companyType: '',
      address: '',
      email: '',
      phone: '',
      effectiveFrom: '',
      effectiveTo: '',
      orgPercentage: '',
      empPercentage: '',
      isActive: true,
    },
    validate: {
      companyName: v => (v.length < 2 ? 'Company name is required' : null),
      companyCode: v => (v.length < 1 ? 'Company code is required' : null),
      companyType: v => (!v ? 'Patient category is required' : null),
      email: v => (!v ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? 'Invalid email' : null),
      phone: v => (!v ? 'Phone number is required' : !/^\d{10}$/.test(v) ? 'Invalid phone number' : null),
      effectiveFrom: v => (!v ? 'Effective from date is required' : null),
      effectiveTo: v => (!v ? 'Effective to date is required' : null),
      orgPercentage: v => (!v ? 'Organization percentage is required' : isNaN(Number(v)) || Number(v) < 0 || Number(v) > 100 ? 'Invalid percentage (0-100)' : null),
      empPercentage: v => (!v ? 'Employee percentage is required' : isNaN(Number(v)) || Number(v) < 0 || Number(v) > 100 ? 'Invalid percentage (0-100)' : null),
    },
  });

  const loadPatientCategories = async () => {
    try {
      const response = await getPatientCategory(1, 100);
      const options = response.data.map((category: any) => ({
        value: category.categoryName,
        label: category.categoryName
      }));
      setPatientCategories(options);
    } catch {
      errorNotification('Failed to load patient categories');
    }
  };

  const generateCompanyCode = () => {
    const timestamp = Date.now().toString();
    const code = 'COMP' + timestamp.slice(-6);
    form.setFieldValue('companyCode', code);
  };

  useEffect(() => {
    const loadData = async () => {
      await loadPatientCategories();
      if (isEdit) {
        try {
          const data: any = await getCompanyById(Number(id));
          form.setValues({
            ...data,
            effectiveFrom: data.effectiveFrom ? new Date(data.effectiveFrom) : '',
            effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : '',
          });
        } catch {
          errorNotification('Company not found');
        }
      } else {
        generateCompanyCode();
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      
      const submitData = {
        ...values,
        effectiveFrom: values.effectiveFrom ? values.effectiveFrom.toISOString().split('T')[0] : null,
        effectiveTo: values.effectiveTo ? values.effectiveTo.toISOString().split('T')[0] : null,
      };

      if (isEdit) {
        updateCompany(id, submitData).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/companies');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      } else {
        addCompany(submitData).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/companies');
        }).catch((error) => {
          errorNotification(error.response.data.errorMessage);
        }).finally(() => { setLoading(false); });
      }
    } catch {
      errorNotification('Failed to save company');
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
          {isEdit ? 'Edit Company' : 'Add Company'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TextInput label="Company Name" withAsterisk {...form.getInputProps('companyName')} />
          <TextInput label="Company Code" readOnly {...form.getInputProps('companyCode')} />
          
          <Select
            label="Patient Category"
            placeholder="Select patient category"
            data={patientCategories}
            withAsterisk
            {...form.getInputProps('companyType')}
          />
          
          <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
          <TextInput label="Phone" withAsterisk {...form.getInputProps('phone')} />
          
          <DateInput
            label="Effective From"
            placeholder="Select effective from date"
            withAsterisk
            {...form.getInputProps('effectiveFrom')}
          />
          
          <DateInput
            label="Effective To"
            placeholder="Select effective to date"
            withAsterisk
            {...form.getInputProps('effectiveTo')}
          />
          
          <TextInput 
            label="Organization Percentage (%)" 
            withAsterisk 
            {...form.getInputProps('orgPercentage')} 
          />
          
          <TextInput 
            label="Employee Percentage (%)" 
            withAsterisk 
            {...form.getInputProps('empPercentage')} 
          />

          <Textarea 
            label="Address" 
            {...form.getInputProps('address')} 
            className="xl:col-span-2" 
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
            <Button 
              type="submit" 
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
              loading={loading}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/companies')}
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