import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addDoctor, getDoctorById, updateDoctor } from '../../../Services/DoctorServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { doctorSpecializations } from '../../../DataMaster/DropdownData';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getHospital } from '../../../Services/HospitalServices';
import { getCity } from '../../../Services/CityServices';
import { getDistrict } from '../../../Services/DistrictServices';
import { useSelector } from 'react-redux';
export default function DoctorForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

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
      cityId: '',
      districtId: '',
      doctorShare: '',
      createdBy: user?.name || 'Admin',
      hospitalId: '',
      active: true,
    },
    validate: {
      name: v => (v.length < 2 ? 'Name is required' : null),
      code: v => (v.length < 1 ? 'Code is required' : null),
      departmentId: v => (!v ? 'Department is required' : null),
      emailId: v => (!v ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? 'Invalid email' : null),
      contactNumber: v => (!v ? 'Contact number is required' : !/^\d{10}$/.test(v) ? 'Invalid number' : null),
      firstConsultationFees: v => (!v ? 'First consultation fees is required' : null),
      followUpFees: v => (!v ? 'Follow up fees is required' : null),
      panno: v => (!v ? 'PAN number is required' : null),
      specialization: v => (!v ? 'Specialization is required' : null),

    },
  });
  const [hospitals, setHospitals] = useState<{ value: string; label: string }[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);

  const generateDoctorCode = () => {
    const timestamp = Date.now().toString();
    const code = 'DOC' + timestamp.slice(-6);
    form.setFieldValue('code', code);
  };

  useEffect(() => {
    loadHospitals();
    loadDepartments();
    loadCities();
    loadDistricts();
    if (!isEdit) {
      generateDoctorCode();
    }
  }, []);

  const loadHospitals = async () => {
    try {
      const res = await getHospital(1, 100, '');
      const hospitalOptions = res.data.map((hospital: any) => ({
        value: hospital.hospitalId.toString(),
        label: hospital.hospitalName,
      }));
      setHospitals(hospitalOptions);
    } catch {
      errorNotification('Failed to load hospitals');
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartment(1, 100, '');
      setDepartments(res.data); // Store full department data
      const options = res.data.map((dept: any) => ({
        value: dept.id.toString(),
        label: dept.name,
      }));
      setDepartmentOptions(options);
    } catch {
      errorNotification('Failed to load departments');
    }
  };

  const loadCities = async () => {
    try {
      const res = await getCity(1, 100, '');
      const cityOptions = res.data.map((city: any) => ({
        value: (city.cityId || city.id).toString(),
        label: city.cityName || city.name,
      }));
      setCities(cityOptions);
    } catch {
      errorNotification('Failed to load cities');
    }
  };

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
    if (isEdit && id) {
      console.log('Loading doctor ID:', id);
      getDoctorById(Number(id))
        .then((data: any) => {
          console.log('Doctor data received:', data);
          if (data) {
            form.setValues({
              doctorId: data.doctorId || '',
              code: data.code || '',
              type: data.type || '',
              name: data.name || '',
              specialization: data.specialization || '',
              departmentId: data.departmentId?.toString() || '',
              qualification: data.qualification || '',
              emailId: data.emailId || '',
              contactNumber: data.contactNumber || '',
              firstConsultationFees: data.firstConsultationFees || '',
              followUpFees: data.followUpFees || '',
              joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
              panno: data.panno || '',
              address: data.address || '',
              cityId: data.cityId?.toString() || '',
              districtId: data.districtId?.toString() || '',
              doctorShare: data.doctorShare || '',
              createdBy: data.createdBy || user?.name || 'Admin',
              hospitalId: data.hospitalId?.toString() || '1',
              active: data.active !== undefined ? data.active : true
            });
          }
        })
        .catch((error) => {
          console.error('Error loading doctor:', error);
          errorNotification('Doctor Not found');
        });
    }
  }, [id, isEdit]);

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
        const payload = {
          ...values,
          departmentId: parseInt(values.departmentId),
          hospitalId: parseInt(values.hospitalId),
          cityId: values.cityId ? parseInt(values.cityId) : null,
          districtId: values.districtId ? parseInt(values.districtId) : null,
          joiningDate: values.joiningDate ? values.joiningDate.toISOString().split('T')[0] : null
        };
        console.log('Update payload:', payload);
        updateDoctor(id, payload).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/doctors');
        }).catch((error)=>{
          console.error('Update error:', error);
          console.error('Error response:', error.response?.data);
          errorNotification(error.response?.data?.errorMessage || 'Failed to update doctor');
        }).finally(()=>{setLoading(false);});
      } else {
        const payload = {
          ...values,
          departmentId: parseInt(values.departmentId),
          hospitalId: parseInt(values.hospitalId),
          cityId: values.cityId ? parseInt(values.cityId) : null,
          districtId: values.districtId ? parseInt(values.districtId) : null,
          joiningDate: values.joiningDate ? values.joiningDate.toISOString().split('T')[0] : null
        };
        delete payload.doctorId;
        addDoctor(payload).then((data)=>{
          successNotification(data.message);
          navigate('/admin/mastersettings/doctors');
        }).catch((error)=>{
          console.error('Create error:', error);
          errorNotification(error.response?.data?.errorMessage || 'Failed to create doctor');
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
          {isEdit ? 'Edit Doctor' : 'Add Doctor'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Code" readOnly {...form.getInputProps('code')} />
        <TextInput label="Type" {...form.getInputProps('type')} />
        <TextInput label="Name" {...form.getInputProps('name')} />
        <TextInput label="Specialization" withAsterisk {...form.getInputProps('specialization')} />
        <Select
          label="Department"
          placeholder="Select department"
          data={departmentOptions}
          searchable
          withAsterisk
          {...form.getInputProps('departmentId')}
          onChange={(value) => {
            form.setFieldValue('departmentId', value);
            // Auto-select hospital based on department
            if (value) {
              const selectedDept = departments.find(dept => dept.id.toString() === value);
              if (selectedDept && selectedDept.hospitalId) {
                form.setFieldValue('hospitalId', selectedDept.hospitalId.toString());
              }
            }
          }}
        />
        <TextInput label="Qualification" {...form.getInputProps('qualification')} />
        <TextInput label="Email Id" withAsterisk {...form.getInputProps('emailId')} />
        <TextInput label="Contact Number" withAsterisk {...form.getInputProps('contactNumber')} />
        <TextInput label="First Consultation Fees" withAsterisk {...form.getInputProps('firstConsultationFees')} />
        <TextInput label="FollowUp Fees" withAsterisk {...form.getInputProps('followUpFees')} />
        <DateInput label="Joining Date" placeholder="Select date" {...form.getInputProps('joiningDate')} />
        <TextInput label="PAN No" withAsterisk {...form.getInputProps('panno')} />
        <TextInput label="Address" {...form.getInputProps('address')} />
        <Select
          label="City"
          placeholder="Select city"
          data={cities}
          searchable
          {...form.getInputProps('cityId')}
        />
        <Select
          label="District"
          placeholder="Select district"
          data={districts}
          searchable
          {...form.getInputProps('districtId')}
        />
        <TextInput label="Doctor Share" {...form.getInputProps('doctorShare')} />
        <TextInput label="Created By" disabled {...form.getInputProps('createdBy')} />
        <Select
          label="Hospital"
          placeholder="Select hospital"
          data={hospitals}
          withAsterisk
          searchable
          readOnly
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
            {isEdit ? 'Update' : 'Save'}
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/doctors')}
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
