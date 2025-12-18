import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea, Container, Title, Switch} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addEmployee, getEmployeeById, updateEmployee } from '../../../Services/EmployeeServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getHospital } from '../../../Services/HospitalServices';
import { getDesignation } from '../../../Services/DesignationServices';
import { getCity } from '../../../Services/CityServices';
import { getState } from '../../../Services/StateServices';
import { getCountry } from '../../../Services/CountryServices';
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
      countryId: '',
      remark: '',
      createdBy: '',
      active: true,
    },
    validate: {
      firstName: v => (v.length < 2 ? ' First Name is required' : null),
      middleName: v => (v.length < 2 ? ' Middle Name is required' : null),
      lastName: v => (v.length < 2 ? ' Last Name is required' : null),
      emailId: v => (!v ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ? 'Invalid email' : null),
      mobileNo: v => (!v ? 'Mobile number is required' : !/^\d{10}$/.test(v) ? 'Invalid number' : null),
    },
  });
  const [hospitals, setHospitals] = useState<{ value: string; label: string }[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([]);
  const [designations, setDesignations] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [filteredStates, setFilteredStates] = useState<{ value: string; label: string }[]>([]);
  const [filteredCities, setFilteredCities] = useState<{ value: string; label: string }[]>([]);

  const [loading, setLoading]=useState(false);

  const generateEmployeeCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `EMP${timestamp}`;
  };

  useEffect(() => {
    const loadAllData = async () => {
      try {
        await Promise.all([
          loadHospitals(),
          loadDepartments(),
          loadDesignations(),
          loadCities(),
          loadStates(),
          loadCountries()
        ]);
        
        // Load employee data after master data is loaded (for edit mode)
        if (isEdit && id) {
          setTimeout(() => loadEmployeeData(), 200);
        } else {
          // Auto-generate employee code for new employees
          form.setFieldValue('employeeCode', generateEmployeeCode());
        }
      } catch (error) {
        console.error('Error loading master data:', error);
        errorNotification('Failed to load master data');
      }
    };
    loadAllData();
  }, []);

  const loadHospitals = async () => {
    try {
      const res = await getHospital(1, 100, '');
      const hospitals = res.hospitals || res.data || [];
      const hospitalOptions = hospitals.map((hospital: any) => ({
        value: (hospital.hospitalId || hospital.id).toString(),
        label: hospital.hospitalName || hospital.name,
      }));
      setHospitals(hospitalOptions);
    } catch (error) {
      console.error('Failed to load hospitals:', error);
      errorNotification('Failed to load hospitals');
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartment(1, 100, '');
      const departments = res.departments || res.data || [];
      setDepartments(departments);
      const options = departments.map((dept: any) => ({
        value: dept.id.toString(),
        label: dept.name,
      }));
      setDepartmentOptions(options);
    } catch (error) {
      console.error('Failed to load departments:', error);
      errorNotification('Failed to load departments');
    }
  };

  const loadDesignations = async () => {
    try {
      const res = await getDesignation(1, 100, '');
      console.log('Designation API response:', res);
      console.log('Designation data array:', res.data);
      const data = res.data || [];
      if (data.length === 0) {
        console.warn('No designations found in response');
      }
      const options = data.map((item: any) => {
        console.log('Designation item:', item);
        return {
          value: item.designationId?.toString() || '',
          label: item.designationName || 'Unknown',
        };
      }).filter(option => option.value);
      console.log('Designation options:', options);
      setDesignations(options);
    } catch (error) {
      console.error('Failed to load designations:', error);
      errorNotification('Failed to load designations');
    }
  };

  const loadCities = async () => {
    try {
      const res = await getCity(1, 100, '');
      console.log('City service response:', res);
      console.log('City data array:', res.data);
      const data = res.data || [];
      if (data.length === 0) {
        console.warn('No cities found in response');
      }
      const options = data.map((item: any) => {
        console.log('City item:', item);
        return {
          value: item.cityId?.toString() || '',
          label: item.cityName || `City ${item.cityId}`,
        };
      }).filter(option => option.value);
      console.log('City options:', options);
      setCities(options);
    } catch (error) {
      console.error('Failed to load cities:', error);
      errorNotification('Failed to load cities');
    }
  };

  const loadStates = async () => {
    try {
      const res = await getState(1, 100, '');
      console.log('State service response:', res);
      console.log('State data array:', res.data);
      const data = res.data || [];
      if (data.length === 0) {
        console.warn('No states found in response');
      }
      const options = data.map((item: any) => {
        console.log('State item:', item);
        return {
          value: item.stateId?.toString() || '',
          label: item.stateName || `State ${item.stateId}`,
          countryId: item.countryId
        };
      }).filter(option => option.value);
      console.log('State options:', options);
      setStates(options);
    } catch (error) {
      console.error('Failed to load states:', error);
      errorNotification('Failed to load states');
    }
  };

  const loadCountries = async () => {
    try {
      const res = await getCountry(1, 100, '');
      console.log('Country service response:', res);
      console.log('Country data array:', res.data);
      const data = res.data || [];
      if (data.length === 0) {
        console.warn('No countries found in response');
      }
      const options = data.map((item: any) => {
        console.log('Country item:', item);
        return {
          value: item.countryId?.toString() || '',
          label: item.countryName || `Country ${item.countryId}`,
        };
      }).filter(option => option.value);
      console.log('Country options:', options);
      setCountries(options);
    } catch (error) {
      console.error('Failed to load countries:', error);
      errorNotification('Failed to load countries');
    }
  };

  const loadCitiesByState = async (stateId: string) => {
    try {
      // For now, load all cities since we need to implement proper state->district->taluka->city hierarchy
      const res = await getCity(1, 100, '');
      const cities = res.data || [];
      console.log('All cities for filtering:', cities);
      
      // Show all cities for now - proper filtering would require district/taluka lookup
      const filtered = cities
        .filter((item: any) => item && item.cityId)
        .map((item: any) => ({
          value: item.cityId.toString(),
          label: item.cityName || 'Unknown',
        }));
      console.log('All cities loaded:', cities);
      console.log('Filtered cities for edit mode:', filtered);
      setFilteredCities(filtered);
    } catch (error) {
      console.error('Failed to load cities by state:', error);
      errorNotification('Failed to load cities');
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      loadEmployeeData();
    }
  }, [id]);

  const loadEmployeeData = async () => {
    try {
      const data: any = await getEmployeeById(Number(id));
      console.log('Employee edit data:', data);
      
      // Convert date strings to Date objects and ensure all fields are strings
      const formData = {
        ...data,
        employeeId: data.employeeId?.toString() || '',
        employeeCode: data.employeeCode || '',
        titleId: data.titleId || '',
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        gender: data.gender || '',
        dob: data.dob ? new Date(data.dob) : null,
        joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
        designationId: data.designationId?.toString() || '',
        departmentId: data.departmentId?.toString() || '',
        roleId: data.roleId || '',
        qualification: data.qualification || '',
        emailId: data.emailId || '',
        mobileNo: data.mobileNo || '',
        address: data.address || '',
        cityId: data.cityId?.toString() || '',
        stateId: data.stateId?.toString() || '',
        pincode: data.pincode || '',
        countryId: data.countryId?.toString() || '',
        remark: data.remark || '',
        createdBy: data.createdBy || '',
        hospitalId: data.hospitalId?.toString() || '',
        active: data.active ?? true,
      };
      
      form.setValues(formData);
      console.log('Form values set:', formData);
      console.log('Country dropdown data:', countries);
      console.log('Selected countryId:', formData.countryId);
      console.log('Department dropdown data:', departmentOptions);
      console.log('Selected departmentId:', formData.departmentId);
      console.log('Designation dropdown data:', designations);
      console.log('Selected designationId:', formData.designationId);
      console.log('Hospital dropdown data:', hospitals);
      console.log('Selected hospitalId:', formData.hospitalId);
      
      // Load filtered states and cities for edit mode
      // Wait for master data to be fully loaded before filtering
      const waitForMasterData = () => {
        if (states.length > 0 && countries.length > 0) {
          console.log('Master data loaded, filtering for edit mode');
          
          if (data.countryId) {
            const filtered = states.filter((state: any) => state.countryId?.toString() === data.countryId.toString());
            console.log('Filtered states for country', data.countryId, ':', filtered);
            setFilteredStates(filtered);
          } else {
            console.log('No country selected, showing all states');
            setFilteredStates(states);
          }
          
          // Always load all cities for edit mode
          const loadAllCities = async () => {
            try {
              const res = await getCity(1, 100, '');
              const allCities = res.data || [];
              const cityOptions = allCities
                .filter((item: any) => item && item.cityId)
                .map((item: any) => ({
                  value: item.cityId.toString(),
                  label: item.cityName || 'Unknown',
                }));
              console.log('City options loaded for edit:', cityOptions);
              setFilteredCities(cityOptions);
            } catch (error) {
              console.error('Failed to load cities for edit:', error);
            }
          };
          loadAllCities();
        } else {
          console.log('Master data not ready, retrying... States:', states.length, 'Countries:', countries.length);
          setTimeout(waitForMasterData, 200);
        }
      };
      waitForMasterData();
      
    } catch (error) {
      console.error('Failed to load employee:', error);
      errorNotification('Employee Not found');
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Employee' : 'Add Employee'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TextInput label="Employee Id" withAsterisk {...form.getInputProps('employeeId')} />
        <TextInput label="Employee Code" readOnly {...form.getInputProps('employeeCode')} />
        <Select
          label="Title"
          placeholder="Select title"
          data={[
            { value: 'Mr.', label: 'Mr.' },
            { value: 'Mrs.', label: 'Mrs.' },
            { value: 'Ms.', label: 'Ms.' }
          ]}
          searchable
          {...form.getInputProps('titleId')}
        />
        <TextInput label="First Name" {...form.getInputProps('firstName')} />
        <TextInput label="Middle Name" {...form.getInputProps('middleName')} />
        <TextInput label="Last Name" {...form.getInputProps('lastName')} />
        <Select
          label="Gender"
          placeholder="Select gender"
          data={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' }
          ]}
          searchable
          {...form.getInputProps('gender')}
        />
        <DateInput label="Date Of Birth" placeholder="Select date" {...form.getInputProps('dob')} />
        <DateInput label="Joining Date" placeholder="Select date" {...form.getInputProps('joiningDate')} />
        <Select
          label="Designation"
          placeholder="Select designation"
          data={designations}
          searchable
          {...form.getInputProps('designationId')}
        />
        <Select
          label="Department"
          placeholder="Select department"
          data={departmentOptions}
          withAsterisk
          searchable
          {...form.getInputProps('departmentId')}
          onChange={(value) => {
            form.setFieldValue('departmentId', value);
            if (value) {
              const selectedDept = departments.find(dept => dept.id.toString() === value);
              console.log('Selected department:', selectedDept);
              if (selectedDept && selectedDept.hospitalId) {
                console.log('Setting hospitalId:', selectedDept.hospitalId);
                form.setFieldValue('hospitalId', selectedDept.hospitalId.toString());
              } else {
                console.log('No hospitalId found in department');
                form.setFieldValue('hospitalId', '');
              }
            } else {
              form.setFieldValue('hospitalId', '');
            }
          }}
        />
        <TextInput label="Role Id" {...form.getInputProps('roleId')} />
        <TextInput label="Qualification" {...form.getInputProps('qualification')} />
        <TextInput label="Email Id" withAsterisk {...form.getInputProps('emailId')} />
        <TextInput label="Mobile Number" withAsterisk {...form.getInputProps('mobileNo')} />
        <Select
          label="Country"
          placeholder="Select country"
          data={countries}
          searchable
          {...form.getInputProps('countryId')}
          onChange={(value) => {
            form.setFieldValue('countryId', value);
            form.setFieldValue('stateId', '');
            form.setFieldValue('cityId', '');
            if (value) {
              const filtered = states.filter((state: any) => state.countryId?.toString() === value);
              setFilteredStates(filtered);
            } else {
              setFilteredStates([]);
            }
            setFilteredCities([]);
          }}
        />
        <Select
          label="State"
          placeholder="Select state"
          data={filteredStates.length > 0 ? filteredStates : states}
          searchable
          {...form.getInputProps('stateId')}
          onChange={(value) => {
            form.setFieldValue('stateId', value);
            form.setFieldValue('cityId', '');
            if (value) {
              loadCitiesByState(value);
            } else {
              setFilteredCities([]);
            }
          }}
        />
        <Select
          label="City"
          placeholder="Select city"
          data={filteredCities.length > 0 ? filteredCities : cities}
          searchable
          {...form.getInputProps('cityId')}
        />
        <TextInput label="Pin Code " {...form.getInputProps('pincode')} />
        <TextInput label="Remark" {...form.getInputProps('remark')} />
        <TextInput label="Created By" {...form.getInputProps('createdBy')} />
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
            onClick={() => navigate('/admin/mastersettings/employees')}
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
