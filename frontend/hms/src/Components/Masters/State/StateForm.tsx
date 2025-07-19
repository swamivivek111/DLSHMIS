import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addState, getStateById, updateState } from '../../../Services/StateServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { getCountry } from '../../../Services/CountryServices';
export default function StateForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      stateId:'',
      countryId: '',
      stateName: '',
      stateCode: '',
      createdBy: '',
      active: true,
    },
    validate: {
      stateName: v => (v.length < 2 ? 'Name is required' : null),
      stateCode: v => (v.length < 1 ? 'Code is required' : null),
    },
  });
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);
  useEffect(() => {
   
       



   const fetchCountries = async () => {
      try {
        const response = await getCountry(); // default page=1, limit=10
        const countryOptions = response.data.map((c: any) => ({
          value: c.countryId.toString(), // adjust if different
          label: c.countryName,          // adjust to your field name
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();









  }, []);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data:any = await getStateById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('State Not found');
        }
      })();
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values:any) => {
    try {
      /*if (isEdit) {
        await updateState(Number(id), values);
        successNotification('Updated');
      } else {
        await createState(values);
        successNotification('Created');
      }*/
      setLoading(true)
      //console.log(values);
      if (isEdit) {
        updateState(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/states');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        addState(values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/states');
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
    <Container>
      <Title order={2} mb="md">
        {isEdit ? 'Edit State' : 'Add State'}
      </Title>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">


        <Select label="Country" placeholder="Select country" 
        data={countries} withAsterisk searchable {...form.getInputProps('countryId')}
        />


        <TextInput label="State Name" {...form.getInputProps('stateName')} />
        <TextInput label="State Code" {...form.getInputProps('stateCode')} />
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
            onClick={() => navigate('/admin/mastersettings/states')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
}
