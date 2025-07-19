import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../../../Services/EmployeeServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      employeeId:'',
      employeeCode: '',
      titleId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '', //1 Consider changing this to a dropdown if multiple hospitals exist
      dob: '',
      joiningDate: '',
      designationId: '',
      departmentId: '',
      roleId: '',
      qualification: '',
      emailId: '',
      mobileNo: '',
      address: '',
      cityId: '',
      stateId: '',
      pincode: '',
      country: '',
      remark: '',
      createdBy: '',
      active: true,
    },
    validate: {
      firstName: v => (v.length < 2 ? ' First Name is required' : null),
      middleName: v => (v.length < 2 ? ' Middle Name is required' : null),
      lastName: v => (v.length < 2 ? ' Last Name is required' : null),
      employeeCode: v => (v.length < 1 ? 'Employee Code is required' : null),
      emailId: v => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? null : 'Invalid email'),
      mobileNo: v => (/^\d{10}$/.test(v) ? null : 'Invalid number'),
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
          const data:any = await getEmployeeById(Number(id));
          form.setValues(data);
        } catch {
          errorNotification('Employee Not found');
        }
      })();
    }
  }, [id]);

  const handleSubmit = form.onSubmit(async (values:any) => {
    try {
      /*if (isEdit) {
        await updateEmployee(Number(id), values);
        successNotification('Updated');
      } else {
        await createEmployee(values);
        successNotification('Created');
      }*/
      setLoading(true)
      //console.log(values);
      if (isEdit) {
        updateEmployee(id, values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/employees');
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      } else {
        addEmployee(values).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/employees');
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
        {isEdit ? 'Edit Employee' : 'Add Employee'}
      </Title>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Employee Id" withAsterisk {...form.getInputProps('employeeId')} />
        <TextInput label="Employee Code" withAsterisk {...form.getInputProps('employeeCode')} />
        <TextInput label="Title Id" {...form.getInputProps('titleId')} />
        <TextInput label="First Name" {...form.getInputProps('firstName')} />
        <TextInput label="Middle Name" {...form.getInputProps('middleName')} />
        <TextInput label="Last Name" {...form.getInputProps('lastName')} />
        <TextInput label="Gender" {...form.getInputProps('gender')} />
        <TextInput label="Date Of Birth" {...form.getInputProps('dob')} />
        <TextInput label="Joining Date" {...form.getInputProps('joiningDate')} />
        <TextInput label="Designation Id" {...form.getInputProps('designationId')} />
        <TextInput label="Department Id" {...form.getInputProps('departmentId')} />
        <TextInput label="Role Id" {...form.getInputProps('roleId')} />
        <TextInput label="Qualification" {...form.getInputProps('qualification')} />
        <TextInput label="Email Id" {...form.getInputProps('emailId')} />
        <TextInput label="Mobile Number" {...form.getInputProps('mobileNo')} />
        <TextInput label="City Id " {...form.getInputProps('cityId')} />
        <TextInput label="State Id " {...form.getInputProps('stateId')} />
        <TextInput label="Pin Code " {...form.getInputProps('pincode')} />
        <TextInput label="Country" {...form.getInputProps('country')} />
        <TextInput label="Remark" {...form.getInputProps('remark')} />
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
            onClick={() => navigate('/admin/mastersettings/employees')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </form>
    </Container>
  );
}
