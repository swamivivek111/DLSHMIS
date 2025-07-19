import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addUserProfileRole, getUserProfileRoleById, updateUserProfileRole } from '../../../Services/UserProfileRoleServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
export default function UserProfileRoleForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      roleId:'',
      roleName: '',
      description: '',
      accessLevel: '',
      createdBy: '',
      active: true,
    },
    validate: {
      roleId: v => (v.length < 2 ? 'Role Id is required' : null),
      roleName: v => (v.length < 1 ? 'Role Name is required' : null),
    },
  });
  const [hospitals, setHospitals] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);
  useEffect(() => {
    // Replace with your actual service call
    /*fetch('/api/hospitals')
      .then(res => res.json())
      .then(data => {
        const options = data.map((h: any) => ({
          value: h.id.toString(),
          label: h.name,
        }));
        setHospitals(options);
      });*/
    // Simulating fetch with dummy data
    const data = [
      { id: 1, name: 'HIMS Hospital' },
      { id: 2, name: 'Fortis Healthcare' },
      { id: 3, name: 'AIIMS Delhi' },
      { id: 4, name: 'Max Hospital' },
    ];

    const options = data.map((h) => ({
      value: h.id.toString(),
      label: h.name,
    }));

    setHospitals(options);

  }, []);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data:any = await getUserProfileRoleById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('UserProfileRole Not found');
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
        updateUserProfileRole(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/userProfileRoles');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        addUserProfileRole(values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/userProfileRoles');
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
        {isEdit ? 'Edit UserProfileRole' : 'Add UserProfileRole'}
      </Title>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Role Id" {...form.getInputProps('roleId')} />
        <TextInput label="Role Name" {...form.getInputProps('roleName')} />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <TextInput label="Access Level" {...form.getInputProps('accessLevel')} />
        <TextInput label="Created By" {...form.getInputProps('createdBy')} />
        <Select
          label="Hospital"
          placeholder="Select hospital"
          data={hospitals}
          withAsterisk
          searchable
          {...form.getInputProps('hospitalId')}
        />
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
            onClick={() => navigate('/admin/mastersettings/userProfileRoles')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
}
