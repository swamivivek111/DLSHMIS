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
  DateInput,
  Container,
  Paper,
  Stepper,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconPhone, IconMail, IconMapPin, IconCalendar, IconCheck } from '@tabler/icons-react';
import { PatientProfileService } from '../../Services/PatientProfileService';
import { CountryServices } from '../../Services/CountryServices';
import { StateServices } from '../../Services/StateServices';
import { CityServices } from '../../Services/CityServices';
import { BloodGroupServices } from '../../Services/BloodGroupServices';

interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date | null;
  gender: string;
  bloodGroup: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalHistory: string;
  allergies: string;
}

const PatientRegistration: React.FC = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [bloodGroups, setBloodGroups] = useState<any[]>([]);

  const form = useForm<PatientFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null,
      gender: '',
      bloodGroup: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalHistory: '',
      allergies: '',
    },
    validate: (values) => {
      if (active === 0) {
        return {
          firstName: !values.firstName ? 'First name is required' : null,
          lastName: !values.lastName ? 'Last name is required' : null,
          email: !values.email ? 'Email is required' : !/^\S+@\S+$/.test(values.email) ? 'Invalid email' : null,
          phoneNumber: !values.phoneNumber ? 'Phone number is required' : null,
          dateOfBirth: !values.dateOfBirth ? 'Date of birth is required' : null,
          gender: !values.gender ? 'Gender is required' : null,
        };
      }
      if (active === 1) {
        return {
          address: !values.address ? 'Address is required' : null,
          country: !values.country ? 'Country is required' : null,
          state: !values.state ? 'State is required' : null,
          city: !values.city ? 'City is required' : null,
          pincode: !values.pincode ? 'Pincode is required' : null,
        };
      }
      return {};
    },
  });

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      const [countriesData, bloodGroupsData] = await Promise.all([
        CountryServices.getAllCountries(),
        BloodGroupServices.getAllBloodGroups(),
      ]);
      setCountries(countriesData.map((c: any) => ({ value: c.id.toString(), label: c.countryName })));
      setBloodGroups(bloodGroupsData.map((bg: any) => ({ value: bg.id.toString(), label: bg.bloodGroupName })));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load master data',
        color: 'red',
      });
    }
  };

  const handleCountryChange = async (countryId: string) => {
    form.setFieldValue('country', countryId);
    form.setFieldValue('state', '');
    form.setFieldValue('city', '');
    
    try {
      const statesData = await StateServices.getStatesByCountry(parseInt(countryId));
      setStates(statesData.map((s: any) => ({ value: s.id.toString(), label: s.stateName })));
      setCities([]);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load states',
        color: 'red',
      });
    }
  };

  const handleStateChange = async (stateId: string) => {
    form.setFieldValue('state', stateId);
    form.setFieldValue('city', '');
    
    try {
      const citiesData = await CityServices.getCitiesByState(parseInt(stateId));
      setCities(citiesData.map((c: any) => ({ value: c.id.toString(), label: c.cityName })));
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load cities',
        color: 'red',
      });
    }
  };

  const nextStep = () => {
    const validation = form.validate();
    if (!validation.hasErrors) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async (values: PatientFormData) => {
    setLoading(true);
    try {
      const patientData = {
        ...values,
        dateOfBirth: values.dateOfBirth?.toISOString().split('T')[0],
      };
      
      await PatientProfileService.createPatient(patientData);
      
      notifications.show({
        title: 'Success',
        message: 'Patient registered successfully!',
        color: 'green',
        icon: <IconCheck />,
      });
      
      form.reset();
      setActive(0);
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
          Patient Registration
        </Title>

        <Stepper active={active} onStepClick={setActive} breakpoint="sm" className="mb-8">
          <Stepper.Step label="Personal Info" description="Basic information" icon={<IconUser size={18} />}>
            <Stack gap="md" className="mt-6">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="Enter first name"
                    {...form.getInputProps('firstName')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Enter last name"
                    {...form.getInputProps('lastName')}
                    required
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    leftSection={<IconMail size={16} />}
                    {...form.getInputProps('email')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    leftSection={<IconPhone size={16} />}
                    {...form.getInputProps('phoneNumber')}
                    required
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DateInput
                    label="Date of Birth"
                    placeholder="Select date of birth"
                    leftSection={<IconCalendar size={16} />}
                    {...form.getInputProps('dateOfBirth')}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
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
              </Grid>

              <Select
                label="Blood Group"
                placeholder="Select blood group"
                data={bloodGroups}
                {...form.getInputProps('bloodGroup')}
                searchable
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Address" description="Location details" icon={<IconMapPin size={18} />}>
            <Stack gap="md" className="mt-6">
              <Textarea
                label="Address"
                placeholder="Enter full address"
                {...form.getInputProps('address')}
                required
                minRows={2}
              />

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="Country"
                    placeholder="Select country"
                    data={countries}
                    {...form.getInputProps('country')}
                    onChange={handleCountryChange}
                    searchable
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="State"
                    placeholder="Select state"
                    data={states}
                    {...form.getInputProps('state')}
                    onChange={handleStateChange}
                    searchable
                    required
                    disabled={!form.values.country}
                  />
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Select
                    label="City"
                    placeholder="Select city"
                    data={cities}
                    {...form.getInputProps('city')}
                    searchable
                    required
                    disabled={!form.values.state}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Pincode"
                    placeholder="Enter pincode"
                    {...form.getInputProps('pincode')}
                    required
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Emergency Contact" description="Emergency details">
            <Stack gap="md" className="mt-6">
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Emergency Contact Name"
                    placeholder="Enter emergency contact name"
                    {...form.getInputProps('emergencyContactName')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Emergency Contact Phone"
                    placeholder="Enter emergency contact phone"
                    leftSection={<IconPhone size={16} />}
                    {...form.getInputProps('emergencyContactPhone')}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Medical Info" description="Medical history">
            <Stack gap="md" className="mt-6">
              <Textarea
                label="Medical History"
                placeholder="Enter medical history (optional)"
                {...form.getInputProps('medicalHistory')}
                minRows={3}
              />
              <Textarea
                label="Allergies"
                placeholder="Enter known allergies (optional)"
                {...form.getInputProps('allergies')}
                minRows={2}
              />
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
          <Button variant="default" onClick={prevStep} disabled={active === 0}>
            Back
          </Button>
          {active < 3 ? (
            <Button onClick={nextStep}>Next step</Button>
          ) : (
            <Button onClick={() => handleSubmit(form.values)} loading={loading}>
              Register Patient
            </Button>
          )}
        </Group>
      </Paper>
    </Container>
  );
};

export default PatientRegistration;