import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addDistrict, getDistrictById, updateDistrict } from '../../../Services/DistrictServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { getState } from '../../../Services/StateServices';
export default function DistrictForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      stateId: '',
      districtName: '',
      districtCode: '',
      createdBy: '',
      active: true,
    },
    validate: {
      districtName: v => (v.length < 2 ? 'Name is required' : null),
      districtCode: v => (v.length < 1 ? 'Code is required' : null),
      stateId: v => (!v ? 'State is required' : null),
    },
  });
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load states
      const stateRes = await getState(1, 100, '');
      const stateOptions = stateRes.data.map((state: any) => ({
        value: state.stateId.toString(),
        label: state.stateName,
      }));
      setStates(stateOptions);

      // Load district data after dropdowns are populated
      if (isEdit && id) {
        setTimeout(() => loadDistrictData(), 100);
      }
    } catch {
      errorNotification('Failed to load data');
    }
  };

  const loadDistrictData = async () => {
    try {
      const data: any = await getDistrictById(Number(id));
      console.log('District data:', data);
      form.setValues({
        ...data,
        stateId: data.stateId?.toString() || ''
      });
    } catch {
      errorNotification('District Not found');
    }
  };

  // District data loading is now handled in loadData to ensure proper order

  const handleSubmit = form.onSubmit(async (values:any) => {
    try {
      /*if (isEdit) {
        await updateDistrict(Number(id), values);
        successNotification('Updated');
      } else {
        await createDistrict(values);
        successNotification('Created');
      }*/
      setLoading(true)
      //console.log(values);
      if (isEdit) {
        updateDistrict(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/districts');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        const payload = {
          ...values,
          stateId: parseInt(values.stateId)
        };
        delete payload.districtId;
        addDistrict(payload).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/districts');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
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
          {isEdit ? 'Edit District' : 'Add District'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Select
          label="State"
          placeholder="Select state"
          data={states}
          withAsterisk
          searchable
          {...form.getInputProps('stateId')}
        />
        <TextInput label="District Name" withAsterisk {...form.getInputProps('districtName')} />
        <TextInput label="District Code" withAsterisk {...form.getInputProps('districtCode')} />
        <TextInput label="Created By" {...form.getInputProps('createdBy')} />

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
          <Button type="submit" className="bg-[#202A44] text-white hover:bg-[#1a2236]">
            {isEdit ? 'Update' : 'Save'}
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/districts')}
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
