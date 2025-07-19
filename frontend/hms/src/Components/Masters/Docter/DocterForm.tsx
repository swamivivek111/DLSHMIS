import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoctor, getDoctorById, updateDoctor } from '../../../Services/DoctorServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { doctorSpecializations } from '../../../DataMaster/DropdownData';
export default function DoctorForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      doctorId:'',
      code: '',
      type: '',
      name: '',
      specialization: '',
      departmentId: '',
      qualification: '', //1 Consider changing this to a dropdown if multiple hospitals exist
      emailId: '',
      contactNumber: '',
      firstConsultationFees: '',
      followUpFees: '',
      joiningDate: '',
      panno: '',
      address: '',
      city: '',
      district: '',
      doctorShare: '',
      createdBy: '',
      active: true,
    },
    validate: {
      name: v => (v.length < 2 ? 'Name is required' : null),
      code: v => (v.length < 1 ? 'Code is required' : null),
      emailId: v => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? null : 'Invalid email'),
      contactNumber: v => (/^\d{10}$/.test(v) ? null : 'Invalid number'),
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
          const data:any = await getDoctorById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('Doctor Not found');
        }
      })();
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values:any) => {
    try {
      /*if (isEdit) {
        await updateDoctor(Number(id), values);
        successNotification('Updated');
      } else {
        await createDoctor(values);
        successNotification('Created');
      }*/
      setLoading(true)
      //console.log(values);
      if (isEdit) {
        updateDoctor(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/doctors');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        addDoctor(values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/doctors');
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
        {isEdit ? 'Edit Doctor' : 'Add Doctor'}
      </Title>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Code" withAsterisk {...form.getInputProps('code')} />
        <TextInput label="Type" {...form.getInputProps('type')} />
        <TextInput label="Name" {...form.getInputProps('name')} />
        <TextInput label="Specialization" {...form.getInputProps('specialization')} />
        <TextInput label="Department Id" {...form.getInputProps('departmentId')} />
        <TextInput label="Qualification" {...form.getInputProps('qualification')} />
        <TextInput label="Email Id" {...form.getInputProps('emailId')} />
        <TextInput label="Contact Number" {...form.getInputProps('contactNumber')} />
        <TextInput label="First Consultation Fees" {...form.getInputProps('firstConsultationFees')} />
        <TextInput label="FollowUp Fees" {...form.getInputProps('followUpFees')} />
        <TextInput label="Joining Date" {...form.getInputProps('joiningDate')} />
        <TextInput label="PAN No" {...form.getInputProps('panno')} />
        <TextInput label="Address" {...form.getInputProps('address')} />
        <TextInput label="City" {...form.getInputProps('city')} />
        <TextInput label="District" {...form.getInputProps('district')} />
        <TextInput label="Doctor Share" {...form.getInputProps('doctorShare')} />
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
            onClick={() => navigate('/admin/mastersettings/doctors')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
}
