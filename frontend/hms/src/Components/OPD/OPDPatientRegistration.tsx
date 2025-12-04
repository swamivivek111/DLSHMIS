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
  FileInput,
  Switch,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPhone, IconMail, IconCalendar, IconCheck, IconUpload } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { OPDPatientRegistrationService } from '../../Services/OPDPatientRegistrationService';
import { getCountry } from '../../Services/CountryServices';
import { getState } from '../../Services/StateServices';
import { getCity } from '../../Services/CityServices';
import { getDistrict } from '../../Services/DistrictServices';
import { getTaluka } from '../../Services/TalukaServices';
import { getPatientCategory } from '../../Services/PatientCategoryServices';

interface PatientFormData {
  id?: number;
  prnNumber?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  age?: number;
  mobile: string;
  alternateMobile?: string;
  aadharNumber?: string;
  email: string;
  address: string;
  countryId: string;
  stateId: string;
  cityId: string;
  pincode?: string;
  patientCategoryId: string;
  idProofType: string;
  idProofNumber?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationship: string;
  patientPhoto?: File | null;
}

const OPDPatientRegistration: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const isView = window.location.pathname.includes('/view/');
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [patientCategories, setPatientCategories] = useState<any[]>([]);

  const form = useForm<PatientFormData>({
    initialValues: {
      prnNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: null,
      age: undefined,
      mobile: '',
      alternateMobile: '',
      aadharNumber: '',
      email: '',
      address: '',
      countryId: '',
      stateId: '',
      cityId: '',
      pincode: '',
      patientCategoryId: '',
      idProofType: '',
      idProofNumber: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      relationship: '',
      patientPhoto: null,
    },
    validate: {
      firstName: (value) => (!value ? 'First name is required' : null),
      lastName: (value) => (!value ? 'Last name is required' : null),
      gender: (value) => (!value ? 'Gender is required' : null),
      mobile: (value) => (!value ? 'Mobile number is required' : !/^\d{10}$/.test(value) ? 'Invalid mobile number' : null),
      dateOfBirth: (value) => (!value ? 'Date of birth is required' : null),
      email: (value) => (!value ? 'Email is required' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? 'Invalid email' : null),
      address: (value) => (!value ? 'Address is required' : null),
      countryId: (value) => (!value ? 'Country is required' : null),
      stateId: (value) => (!value ? 'State is required' : null),
      cityId: (value) => (!value ? 'City is required' : null),
      patientCategoryId: (value) => (!value ? 'Patient category is required' : null),
      idProofType: (value) => (!value ? 'ID proof type is required' : null),
      relationship: (value) => (!value ? 'Relationship is required' : null),
      emergencyContactName: (value) => (!value ? 'Emergency contact name is required' : null),
      emergencyContactPhone: (value) => (!value ? 'Emergency contact phone is required' : !/^\d{10}$/.test(value) ? 'Invalid phone number' : null),
    },
  });

  useEffect(() => {
    const initializeData = async () => {
      await loadMasterData();
      if (isEdit && id) {
        // Small delay to ensure master data is loaded
        setTimeout(() => {
          loadPatientData(parseInt(id));
        }, 100);
      }
    };
    initializeData();
  }, [id]);

  const loadMasterData = async () => {
    try {
      const [countriesRes, categoriesRes] = await Promise.all([
        getCountry(1, 100, ''),
        getPatientCategory(1, 100, '')
      ]);
      
      setCountries(countriesRes.data.map((country: any) => ({
        value: country.countryId.toString(),
        label: country.countryName
      })));
      
      setPatientCategories(categoriesRes.data.map((cat: any) => ({
        value: cat.categoryId.toString(),
        label: cat.categoryName
      })));
    } catch (error) {
      console.error('Failed to load master data:', error);
    }
  };

  const loadStates = async (countryId: string) => {
    try {
      const statesRes = await getState(1, 100, '');
      const filteredStates = statesRes.data.filter((state: any) => 
        state.countryId?.toString() === countryId
      );
      setStates(filteredStates.map((state: any) => ({
        value: state.stateId.toString(),
        label: state.stateName
      })));
    } catch (error) {
      console.error('Failed to load states:', error);
    }
  };

  const loadCities = async (stateId: string) => {
    try {
      const [citiesRes, talukasRes, districtsRes] = await Promise.all([
        getCity(1, 1000, ''),
        getTaluka(1, 1000, ''),
        getDistrict(1, 1000, '')
      ]);
      
      // Filter districts by state
      const stateDistricts = districtsRes.data.filter((district: any) => 
        district.stateId?.toString() === stateId
      );
      const districtIds = stateDistricts.map((d: any) => d.districtId.toString());
      
      // Filter talukas by districts
      const stateTalukas = talukasRes.data.filter((taluka: any) => 
        districtIds.includes(taluka.districtId?.toString())
      );
      const talukaIds = stateTalukas.map((t: any) => t.talukaId.toString());
      
      // Filter cities by talukas
      const filteredCities = citiesRes.data.filter((city: any) => 
        talukaIds.includes(city.talukaId?.toString())
      );
      
      setCities(filteredCities.map((city: any) => ({
        value: city.cityId.toString(),
        label: city.cityName
      })));
    } catch (error) {
      console.error('Failed to load cities:', error);
    }
  };



  const loadPatientData = async (patientId: number) => {
    try {
      const response = await OPDPatientRegistrationService.getRegistrationById(patientId);
      const patient = response.data?.registration || response.data;
      
      // Load dependent data if IDs exist
      if (patient.countryId) {
        await loadStates(patient.countryId.toString());
        
        if (patient.stateId) {
          await loadCities(patient.stateId.toString());
        }
      }
      
      form.setValues({
        ...patient,
        countryId: patient.countryId?.toString() || '',
        stateId: patient.stateId?.toString() || '',
        cityId: patient.cityId?.toString() || '',
        patientCategoryId: patient.patientCategoryId?.toString() || '',
        dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth) : null,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load patient data',
        color: 'red',
      });
    }
  };

  const handleSubmit = async (values: PatientFormData) => {
    setLoading(true);
    try {
      const submitData = {
        ...values,
        dateOfBirth: values.dateOfBirth?.toISOString(),
        countryId: values.countryId ? parseInt(values.countryId) : null,
        stateId: values.stateId ? parseInt(values.stateId) : null,
        cityId: values.cityId ? parseInt(values.cityId) : null,
        patientCategoryId: values.patientCategoryId ? parseInt(values.patientCategoryId) : null,
      };
      
      // Remove undefined/null fields
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '' || submitData[key] === undefined) {
          delete submitData[key];
        }
      });

      let response;
      if (isEdit && id) {
        response = await OPDPatientRegistrationService.updateRegistration(parseInt(id), submitData);
      } else {
        response = await OPDPatientRegistrationService.createRegistration(submitData);
      }

      notifications.show({
        title: 'Success',
        message: response.data?.message || (isEdit ? 'Patient updated successfully!' : 'Patient registered successfully!'),
        color: 'green',
        icon: <IconCheck />,
      });

      navigate('/admin/opd/registration');
    } catch (error: any) {
      console.error('Registration error:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || error.message || 'Failed to save patient',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>
            {isEdit ? 'Edit Patient' : isView ? 'View Patient' : 'Register New Patient'}
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              {/* PRN Number */}
              <TextInput
                label="PRN Number"
                placeholder="Auto-generated"
                {...form.getInputProps('prnNumber')}
                readOnly
                description="Patient Registration Number (Auto-generated)"
              />

              {/* Personal Information */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter first name"
                    {...form.getInputProps('firstName')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="Middle Name"
                    placeholder="Enter middle name"
                    {...form.getInputProps('middleName')}
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter last name"
                    {...form.getInputProps('lastName')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

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
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <DateInput
                    label="Date of Birth"
                    placeholder="Select date of birth"
                    leftSection={<IconCalendar size={16} />}
                    value={form.values.dateOfBirth}
                    onChange={(date) => {
                      form.setFieldValue('dateOfBirth', date);
                      if (date) {
                        const today = new Date();
                        const age = today.getFullYear() - date.getFullYear() - 
                          (today.getMonth() < date.getMonth() || 
                           (today.getMonth() === date.getMonth() && today.getDate() < date.getDate()) ? 1 : 0);
                        form.setFieldValue('age', age);
                      }
                    }}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <NumberInput
                    label="Age"
                    placeholder="Enter age"
                    value={form.values.age}
                    onChange={(value) => form.setFieldValue('age', value)}
                    min={0}
                    max={150}
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              {/* Contact Information */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    leftSection={<IconPhone size={16} />}
                    {...form.getInputProps('mobile')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Alternate Mobile"
                    placeholder="Enter alternate mobile"
                    leftSection={<IconPhone size={16} />}
                    value={form.values.alternateMobile}
                    onChange={(event) => form.setFieldValue('alternateMobile', event.currentTarget.value)}
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Aadhar Number"
                    placeholder="Enter 12-digit Aadhar number"
                    value={form.values.aadharNumber}
                    onChange={(event) => form.setFieldValue('aadharNumber', event.currentTarget.value)}
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    leftSection={<IconMail size={16} />}
                    {...form.getInputProps('email')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              <Textarea
                label="Address"
                placeholder="Enter full address"
                {...form.getInputProps('address')}
                minRows={2}
                withAsterisk
                readOnly={isView}
              />

              {/* Location Information */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <Select
                    label="Country"
                    placeholder="Select country"
                    data={countries}
                    value={form.values.countryId}
                    onChange={(value) => {
                      form.setFieldValue('countryId', value || '');
                      form.setFieldValue('stateId', '');
                      form.setFieldValue('cityId', '');
                      setStates([]);
                      setCities([]);
                      if (value) {
                        loadStates(value);
                      }
                    }}
                    searchable
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <Select
                    label="State"
                    placeholder="Select state"
                    data={states}
                    value={form.values.stateId}
                    onChange={(value) => {
                      form.setFieldValue('stateId', value || '');
                      form.setFieldValue('cityId', '');
                      setCities([]);
                      if (value) {
                        loadCities(value);
                      }
                    }}
                    searchable
                    withAsterisk
                    readOnly={isView}
                    disabled={!form.values.countryId}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <Select
                    label="City"
                    placeholder="Select city"
                    data={cities}
                    value={form.values.cityId}
                    onChange={(value) => {
                      form.setFieldValue('cityId', value || '');
                    }}
                    searchable
                    withAsterisk
                    readOnly={isView}
                    disabled={!form.values.stateId}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                  <TextInput
                    label="Pincode"
                    placeholder="Enter pincode"
                    {...form.getInputProps('pincode')}
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              {/* Patient Category & ID Proof */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="Patient Category"
                    placeholder="Select patient category"
                    data={patientCategories}
                    value={form.values.patientCategoryId}
                    onChange={(value) => form.setFieldValue('patientCategoryId', value || '')}
                    withAsterisk
                    searchable
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="ID Proof Type"
                    placeholder="Select ID proof type"
                    data={[
                      { value: 'AADHAR', label: 'Aadhar Card' },
                      { value: 'PAN', label: 'PAN Card' },
                      { value: 'PASSPORT', label: 'Passport' },
                      { value: 'DRIVING_LICENSE', label: 'Driving License' },
                      { value: 'VOTER_ID', label: 'Voter ID' },
                      { value: 'OTHER', label: 'Other' },
                    ]}
                    value={form.values.idProofType}
                    onChange={(value) => form.setFieldValue('idProofType', value || '')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="ID Proof Number"
                    placeholder="Enter ID proof number"
                    value={form.values.idProofNumber}
                    onChange={(event) => form.setFieldValue('idProofNumber', event.currentTarget.value)}
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              {/* Emergency Contact */}
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="Emergency Contact Name"
                    placeholder="Enter contact name"
                    value={form.values.emergencyContactName}
                    onChange={(event) => form.setFieldValue('emergencyContactName', event.currentTarget.value)}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    label="Emergency Contact Phone"
                    placeholder="Enter contact phone"
                    leftSection={<IconPhone size={16} />}
                    value={form.values.emergencyContactPhone}
                    onChange={(event) => form.setFieldValue('emergencyContactPhone', event.currentTarget.value)}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Select
                    label="Relationship"
                    placeholder="Select relationship"
                    data={[
                      { value: 'FATHER', label: 'Father' },
                      { value: 'MOTHER', label: 'Mother' },
                      { value: 'SPOUSE', label: 'Spouse' },
                      { value: 'SON', label: 'Son' },
                      { value: 'DAUGHTER', label: 'Daughter' },
                      { value: 'BROTHER', label: 'Brother' },
                      { value: 'SISTER', label: 'Sister' },
                      { value: 'FRIEND', label: 'Friend' },
                      { value: 'OTHER', label: 'Other' },
                    ]}
                    value={form.values.relationship}
                    onChange={(value) => form.setFieldValue('relationship', value || '')}
                    withAsterisk
                    readOnly={isView}
                  />
                </Grid.Col>
              </Grid>

              {/* Patient Photo */}
              {!isView && (
                <FileInput
                  label="Patient Photo"
                  placeholder="Select image file"
                  leftSection={<IconUpload size={16} />}
                  accept="image/*"
                  {...form.getInputProps('patientPhoto')}
                />
              )}

              <Group justify="flex-end" mt="md">
                {!isView && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/admin/opd/registration')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      variant="outline"
                    >
                      {isEdit ? 'Update' : 'Register'} Patient
                    </Button>
                  </>
                )}
                {isView && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/admin/opd/registration')}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => navigate(`/admin/opd/registration/edit/${id}`)}
                      variant="outline"
                    >
                      Edit Patient
                    </Button>
                  </>
                )}
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default OPDPatientRegistration;