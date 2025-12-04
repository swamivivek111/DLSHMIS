import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addTaluka, getTalukaById, updateTaluka } from '../../../Services/TalukaServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { getDistrict } from '../../../Services/DistrictServices';
export default function TalukaForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      districtId: '',
      talukaName: '',
      talukaCode: '',
      createdBy: '',
      active: true,
    },
    validate: {
      talukaName: v => (v.length < 2 ? 'Name is required' : null),
      talukaCode: v => (v.length < 1 ? 'Code is required' : null),
      districtId: v => (!v ? 'District is required' : null),
    },
  });
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);
  useEffect(() => {
    loadDistricts();
  }, []);

  const loadDistricts = async () => {
    try {
      const res = await getDistrict(1, 100, '');
      const districtOptions = res.data.map((district: any) => ({
        value: (district.districtId || district.id).toString(),
        label: district.districtName || district.name,
      }));
      setDistricts(districtOptions);
    } catch {
      errorNotification('Failed to load districts');
    }
  };



  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data:any = await getTalukaById(Number(id));
          form.setValues({
            ...data,
            districtId: data.districtId?.toString() || ''
          });
        } catch {
          errorNotification('Taluka Not found');
        }
      })();
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values:any) => {
    try {
      /*if (isEdit) {
        await updateTaluka(Number(id), values);
        successNotification('Updated');
      } else {
        await createTaluka(values);
        successNotification('Created');
      }*/
      setLoading(true)
      //console.log(values);
      if (isEdit) {
        updateTaluka(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/talukas');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        const payload = {
          ...values,
          districtId: parseInt(values.districtId)
        };
        delete payload.talukaId;
        addTaluka(payload).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/talukas');
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
          {isEdit ? 'Edit Taluka' : 'Add Taluka'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Select
          label="District"
          placeholder="Select district"
          data={districts}
          withAsterisk
          searchable
          {...form.getInputProps('districtId')}
        />
        <TextInput label="Taluka Name" withAsterisk {...form.getInputProps('talukaName')} />
        <TextInput label="Taluka Code" withAsterisk {...form.getInputProps('talukaCode')} />
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
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/talukas')}
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
