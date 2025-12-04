import React, { useState, useEffect } from 'react';
import {
  Card,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Grid,
  NumberInput,
  Textarea,
  Container,
  Paper,
  FileInput,
  Switch,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconPhone, IconMail, IconMapPin, IconCalendar, IconCheck, IconUpload } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { OPDPatientRegistrationService } from '../../Services/OPDPatientRegistrationService';
import { getAllActiveCompanies } from '../../Services/CompanyServices';
import { getPatientCategory } from '../../Services/PatientCategoryServices';
import { getCountry } from '../../Services/CountryServices';
import { getState } from '../../Services/StateServices';
import { getCity } from '../../Services/CityServices';

interface PatientFormData {
  patientId?: number;
  prnNumber?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  age?: number;
  mobileNumber: string;
  alternateMobile: string;
  aadharNumber: string;
  email: string;
  address: string;
  cityId: string;
  stateId: string;
  countryId: string;
  pincode: string;
  patientCategoryId: string;
  idProofType: string;
  idProofNumber: string;
  emergencyContactName: string;
  emergencyContactMobile: string;
  relationship: string;
  patientPhoto?: File | null;
  isActive: boolean;
}

interface PatientRegistrationProps {
  onSuccess?: () => void;
  initialData?: any;
}

const OPDPatientRegistration: React.FC<PatientRegistrationProps> = ({ onSuccess, initialData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const isView = window.location.pathname.includes('/view/');
  const [loading, setLoading] = useState(false);
  const [patientCategories, setPatientCategories] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const form = useForm<PatientFormData>({
    initialValues: {
      prnNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: null,
      age: undefined,
      mobileNumber: '',
      alternateMobile: '',
      aadharNumber: '',
      email: '',
      address: '',
      cityId: '',
      stateId: '',
      countryId: '',
      pincode: '',
      patientCategoryId: '',
      idProofType: '',
      idProofNumber: '',
      emergencyContactName: '',
      emergencyContactMobile: '',
      relationship: '',
      patientPhoto: null,
      isActive: true,
    },
    validate: {
      firstName: (value) => (!value ? 'First name is required' : null),
      lastName: (value) => (!value ? 'Last name is required' : null),
      gender: (value) => (!value ? 'Gender is required' : null),
      mobileNumber: (value) => (!value ? 'Mobile number is required' : !/^\d{10}$/.test(value) ? 'Invalid mobile number' : null),
      dateOfBirth: (value) => (!value ? 'Date of birth is required' : null),
      aadharNumber: (value) => (!value ? 'Aadhar number is required' : !/^\d{12}$/.test(value) ? 'Invalid Aadhar number' : null),
      email: (value) => (!value ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? 'Invalid email' : null),
      address: (value) => (!value ? 'Address is required' : null),
      countryId: (value) => (!value ? 'Country is required' : null),
      stateId: (value) => (!value ? 'State is required' : null),
      cityId: (value) => (!value ? 'City is required' : null),
      patientCategoryId: (value) => (!value ? 'Patient category is required' : null),
      idProofType: (value) => (!value ? 'ID proof type is required' : null),
      idProofNumber: (value) => (!value ? 'ID proof number is required' : null),
      emergencyContactName: (value) => (!value ? 'Emergency contact name is required' : null),
      emergencyContactMobile: (value) => (!value ? 'Emergency contact mobile is required' : !/^\d{10}$/.test(value) ? 'Invalid mobile number' : null),
      relationship: (value) => (!value ? 'Relationship is required' : null),
    },
  });

  useEffect(() => {
    loadMasterData();
    if (isEdit && id) {
      loadPatientData(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (form.values.stateId) {
      loadCities(form.values.stateId);
    }
  }, [form.values.stateId]);

  useEffect(() => {
    if (form.values.countryId) {
      loadStates(form.values.countryId);
    }
  }, [form.values.countryId]);

  const loadPatientData = async (patientId: number) => {
    try {
      const response = await OPDPatientRegistrationService.getRegistrationById(patientId);
      const patient = response.data;
      form.setValues({
        prnNumber: patient.prnNo || '',
        prefix: patient.prefix || '',
        firstName: patient.firstName || '',
        middleName: patient.middleName || '',
        lastName: patient.lastName || '',
        fullName: `${patient.prefix || ''} ${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.trim(),
        gender: patient.gender || '',
        age: patient.age || undefined,
        dateOfBirth: null,
        mobile: patient.mobileNumber || '',
        email: '',
        address: patient.address || '',
        bloodGroup: '',
        maritalStatus: '',
        registrationDate: new Date(),
        departmentId: '',
        consultingDoctorId: '',
        visitType: 'NEW',
        visitSource: 'WALK_IN',
        appointmentId: '',
        registrationFee: 100,
        discountPercent: 0,
        paymentMode: 'CASH',
        amountPaid: 100,
        paymentReferenceNo: ''
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load patient data',
        color: 'red',
      });
    }
  };



  useEffect(() => {
    // Auto-generate full name
    const { prefix, firstName, middleName, lastName } = form.values;
    const nameParts = [prefix, firstName, middleName, lastName].filter(part => part && part.trim());
    const fullName = nameParts.join(' ');
    form.setFieldValue('fullName', fullName);
  }, [form.values.prefix, form.values.firstName, form.values.middleName, form.values.lastName]);

  useEffect(() => {
    // Calculate amount paid based on registration fee and discount
    const fee = form.values.registrationFee || 0;
    const discount = form.values.discountPercent || 0;
    const discountAmount = (fee * discount) / 100;
    const finalAmount = fee - discountAmount;
    form.setFieldValue('amountPaid', finalAmount);
  }, [form.values.registrationFee, form.values.discountPercent]);

  const loadMasterData = async () => {
    try {
      // Load blood groups
      try {
        const bloodGroupsData = await BloodGroupServices.getAllBloodGroups();
        if (Array.isArray(bloodGroupsData) && bloodGroupsData.length > 0) {
          setBloodGroups(bloodGroupsData
            .filter((bg: any) => bg && bg.id && bg.bloodGroupName)
            .map((bg: any) => ({ 
              value: bg.id.toString(), 
              label: bg.bloodGroupName || 'Unknown' 
            })));
        } else {
          setBloodGroups([]);
        }
      } catch (error) {
        console.error('Failed to load blood groups:', error);
        setBloodGroups([]);
      }
      
      // Load departments
      try {
        const response = await DepartmentServices.getDepartment(1, 1000, '');
        const departmentsData = response.data || [];
        
        if (departmentsData && departmentsData.length > 0) {
          const mappedDepartments = departmentsData
            .map((d: any) => ({ 
              value: d.id.toString(), 
              label: d.name
            }));
          setDepartments(mappedDepartments);
        } else {
          setDepartments([]);
        }
      } catch (error) {
        console.error('Failed to load departments:', error);
        setDepartments([]);
      }
      
      // Load doctors
      try {
        const response = await DoctorServices.getDoctor(1, 1000, '');
        const doctorsData = response.data || [];
        
        if (doctorsData && doctorsData.length > 0) {
          const mappedDoctors = doctorsData
            .map((doc: any) => ({ 
              value: doc.doctorId.toString(), 
              label: `${doc.name}${doc.specialization ? ' - ' + doc.specialization : ''}` 
            }));
          setDoctors(mappedDoctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error('Failed to load doctors:', error);
        setDoctors([]);
      }
    } catch (error) {
      console.error('Master data loading error:', error);
    }
  };

  const nextStep = () => {
    const validation = form.validate();
    if (!validation.hasErrors) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async (values: OPDPatientFormData) => {
    setLoading(true);
    try {
      // Get department and doctor names from master data
      const selectedDepartment = departments.find(d => d.value === values.departmentId);
      const selectedDoctor = doctors.find(d => d.value === values.consultingDoctorId);
      
      const registrationData = {
        prnNo: `PRN${Date.now()}`,
        prefix: values.prefix || 'Mr.',
        firstName: values.firstName,
        middleName: values.middleName || '',
        lastName: values.lastName,
        gender: values.gender,
        age: values.age || 25,
        mobileNumber: values.mobile,
        aadharNumber: `${Math.floor(Math.random() * 1000000000000)}`,
        address: values.address
      };
      
      let response;
      if (isEdit && id) {
        response = await OPDPatientRegistrationService.updateRegistration(parseInt(id), registrationData);
      } else {
        response = await OPDPatientRegistrationService.createRegistration(registrationData);
      }
      
      notifications.show({
        title: 'Success',
        message: isEdit ? 'Patient updated successfully!' : 'Patient registered successfully!',
        color: 'green',
        icon: <IconCheck />,
      });
      
      form.reset();
      setActive(0);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to register patient',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" className="py-4">
      <Paper shadow="sm" radius="md" p="xl" pos="relative">
        <LoadingOverlay visible={loading} />
        
        <Title order={2} ta="center" mb="xl" className="text-gray-800">
          OPD Patient Registration
        </Title>

        <Stepper active={active} onStepClick={setActive} breakpoint="sm" className="mb-8">
          <Stepper.Step label="Basic Info" description="Patient details" icon={<IconUser size={18} />}>
            <Stack gap="lg" className="mt-6">
              {/* Patient Registration */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Patient Registration</Title>
                <TextInput
                  label="PRN Number"
                  placeholder="Patient Registration Number"
                  {...form.getInputProps('prnNumber')}
                  readOnly
                  description="Auto-generated after registration"
                />
              </Card>

              {/* Personal Information */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Personal Information</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <Select
                      label="Prefix"
                      placeholder="Select prefix"
                      data={[
                        { value: 'Mr.', label: 'Mr.' },
                        { value: 'Mrs.', label: 'Mrs.' },
                        { value: 'Ms.', label: 'Ms.' },
                        { value: 'Dr.', label: 'Dr.' },
                        { value: 'Prof.', label: 'Prof.' },
                      ]}
                      {...form.getInputProps('prefix')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter first name"
                      {...form.getInputProps('firstName')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Middle Name"
                      placeholder="Enter middle name"
                      {...form.getInputProps('middleName')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter last name"
                      {...form.getInputProps('lastName')}
                      required
                    />
                  </Grid.Col>
                </Grid>
                
                <TextInput
                  label="Full Name"
                  placeholder="Auto-generated full name"
                  {...form.getInputProps('fullName')}
                  readOnly
                  description="Automatically generated from prefix and names"
                  mt="md"
                />
              </Card>

              {/* Demographics */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Demographics</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Select
                      label="Gender"
                      placeholder="Select gender"
                      data={[
                        { value: 'MALE', label: 'Male' },
                        { value: 'FEMALE', label: 'Female' },
                        { value: 'OTHER', label: 'Other' },
                      ]}
                      {...form.getInputProps('gender')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <NumberInput
                      label="Age"
                      placeholder="Enter age"
                      {...form.getInputProps('age')}
                      min={0}
                      max={150}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <DateInput
                      label="Date of Birth"
                      placeholder="Select date of birth"
                      leftSection={<IconCalendar size={16} />}
                      {...form.getInputProps('dateOfBirth')}
                      required
                    />
                  </Grid.Col>
                </Grid>

                <Grid mt="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Blood Group"
                      placeholder="Select blood group"
                      data={bloodGroups}
                      {...form.getInputProps('bloodGroup')}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Marital Status"
                      placeholder="Select marital status"
                      data={[
                        { value: 'SINGLE', label: 'Single' },
                        { value: 'MARRIED', label: 'Married' },
                        { value: 'DIVORCED', label: 'Divorced' },
                        { value: 'WIDOWED', label: 'Widowed' },
                      ]}
                      {...form.getInputProps('maritalStatus')}
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              {/* Contact Information */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Contact Information</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Mobile"
                      placeholder="Enter mobile number"
                      leftSection={<IconPhone size={16} />}
                      {...form.getInputProps('mobile')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email"
                      placeholder="Enter email address"
                      type="email"
                      leftSection={<IconMail size={16} />}
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                </Grid>

                <Textarea
                  label="Address"
                  placeholder="Enter full address"
                  {...form.getInputProps('address')}
                  minRows={2}
                  mt="md"
                />
              </Card>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Registration Details" description="Visit information" icon={<IconCalendar size={18} />}>
            <Stack gap="lg" className="mt-6">
              {/* Registration Date */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Registration Date</Title>
                <DateInput
                  label="Registration Date"
                  placeholder="Select registration date"
                  leftSection={<IconCalendar size={16} />}
                  {...form.getInputProps('registrationDate')}
                  required
                />
              </Card>

              {/* Department & Doctor */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Department & Doctor</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Department"
                      placeholder="Select department"
                      data={departments}
                      {...form.getInputProps('departmentId')}
                      searchable
                      clearable
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Consulting Doctor"
                      placeholder="Select consulting doctor"
                      data={doctors}
                      {...form.getInputProps('consultingDoctorId')}
                      searchable
                      clearable
                      required
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              {/* Visit Information */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Visit Information</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Visit Type"
                      placeholder="Select visit type"
                      data={[
                        { value: 'NEW', label: 'New' },
                        { value: 'FOLLOW_UP', label: 'Follow-up' },
                      ]}
                      {...form.getInputProps('visitType')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Visit Source"
                      placeholder="Select visit source"
                      data={[
                        { value: 'WALK_IN', label: 'Walk-in' },
                        { value: 'APPOINTMENT', label: 'Appointment' },
                      ]}
                      {...form.getInputProps('visitSource')}
                      required
                    />
                  </Grid.Col>
                </Grid>

                {form.values.visitSource === 'APPOINTMENT' && (
                  <TextInput
                    label="Appointment ID"
                    placeholder="Enter appointment ID"
                    {...form.getInputProps('appointmentId')}
                    mt="md"
                  />
                )}
              </Card>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Billing" description="Payment details" icon={<IconCurrencyRupee size={18} />}>
            <Stack gap="lg" className="mt-6">
              {/* Fee Details */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Fee Details</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label="Registration Fee"
                      placeholder="Enter registration fee"
                      leftSection={<IconCurrencyRupee size={16} />}
                      {...form.getInputProps('registrationFee')}
                      min={0}
                      decimalScale={2}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label="Discount %"
                      placeholder="Enter discount percentage"
                      {...form.getInputProps('discountPercent')}
                      min={0}
                      max={100}
                      decimalScale={2}
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              {/* Payment Details */}
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Title order={4} mb="md">Payment Details</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Payment Mode"
                      placeholder="Select payment mode"
                      data={[
                        { value: 'CASH', label: 'Cash' },
                        { value: 'CARD', label: 'Card' },
                        { value: 'UPI', label: 'UPI' },
                        { value: 'NET_BANKING', label: 'Net Banking' },
                        { value: 'CHEQUE', label: 'Cheque' },
                      ]}
                      {...form.getInputProps('paymentMode')}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label="Amount Paid"
                      placeholder="Amount paid"
                      leftSection={<IconCurrencyRupee size={16} />}
                      {...form.getInputProps('amountPaid')}
                      min={0}
                      decimalScale={2}
                      required
                      readOnly
                    />
                  </Grid.Col>
                </Grid>

                <TextInput
                  label="Payment Reference No"
                  placeholder="Enter payment reference number"
                  {...form.getInputProps('paymentReferenceNo')}
                  mt="md"
                />
              </Card>
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack align="center" gap="md" className="mt-6">
              <IconCheck size={48} color="green" />
              <Title order={3}>Registration Complete!</Title>
              <Button onClick={() => { form.reset(); setActive(0); }}>
                Register Another Patient
              </Button>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="outline" onClick={prevStep} disabled={active === 0} size="md">
            Back
          </Button>
          {active < 2 ? (
            <Button 
              onClick={nextStep} 
              size="md" 
              variant="outline"
disabled={(() => {
                if (active === 0) {
                  return !form.values.firstName || !form.values.lastName || !form.values.gender || !form.values.mobile || !form.values.dateOfBirth;
                }
                if (active === 1) {
                  return !form.values.departmentId || !form.values.consultingDoctorId || !form.values.visitType || !form.values.visitSource;
                }
                return false;
              })()} 
            >
              Next step
            </Button>
          ) : (
            <Button 
              onClick={() => handleSubmit(form.values)} 
              loading={loading} 
              size="md" 
              variant="outline"
              disabled={!form.values.paymentMode || form.values.amountPaid <= 0}
            >
              Register Patient
            </Button>
          )}
        </Group>
      </Paper>
    </Container>
  );
};

export default OPDPatientRegistration;