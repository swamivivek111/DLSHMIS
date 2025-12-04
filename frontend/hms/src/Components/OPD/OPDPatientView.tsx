import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text, Button, Grid, Badge } from '@mantine/core';
import { OPDPatientRegistrationService } from '../../Services/OPDPatientRegistrationService';
import { getCountry } from '../../Services/CountryServices';
import { getState } from '../../Services/StateServices';
import { getCity } from '../../Services/CityServices';
import { getPatientCategory } from '../../Services/PatientCategoryServices';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';

export default function OPDPatientView() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [masterData, setMasterData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesRes, statesRes, citiesRes, categoriesRes] = await Promise.all([
          getCountry(1, 100, ''),
          getState(1, 100, ''),
          getCity(1, 1000, ''),
          getPatientCategory(1, 100, '')
        ]);
        
        setMasterData({
          countries: countriesRes.data,
          states: statesRes.data,
          cities: citiesRes.data,
          categories: categoriesRes.data
        });
        
        if (id) {
          const response = await OPDPatientRegistrationService.getRegistrationById(Number(id));
          const patientData = response.data?.registration || response.data;
          setPatient(patientData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        navigate('/admin/opd/registration');
      }
    };
    
    loadData();
  }, [id]);

  if (!patient) return null;



  const getGenderBadge = () => {
    const colors = { MALE: 'blue', FEMALE: 'pink', OTHER: 'gray' };
    return <Badge color={colors[patient.gender as keyof typeof colors] || 'gray'}>{patient.gender}</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Patient Registration - {patient.firstName} {patient.lastName}
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>PRN Number:</strong> {patient.prnNumber || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Full Name:</strong> {`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.trim()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Gender:</strong> {getGenderBadge()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Age:</strong> {patient.age || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Date of Birth:</strong> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Mobile Number:</strong> {patient.mobile}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Alternate Mobile:</strong> {patient.alternateMobile || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Aadhar Number:</strong> {patient.aadharNumber || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Email:</strong> {patient.email}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Address:</strong> {patient.address}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Country:</strong> {masterData.countries?.find((c: any) => c.countryId === patient.countryId)?.countryName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>State:</strong> {masterData.states?.find((s: any) => s.stateId === patient.stateId)?.stateName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>City:</strong> {masterData.cities?.find((c: any) => c.cityId === patient.cityId)?.cityName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Pincode:</strong> {patient.pincode || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Patient Category:</strong> {masterData.categories?.find((c: any) => c.categoryId === patient.patientCategoryId)?.categoryName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>ID Proof Type:</strong> {patient.idProofType || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>ID Proof Number:</strong> {patient.idProofNumber || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Emergency Contact:</strong> {patient.emergencyContactName}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Emergency Mobile:</strong> {patient.emergencyContactPhone}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text>
                <strong>Relationship:</strong> {patient.relationship || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Created At:</strong> {patient.createdAt ? new Date(patient.createdAt).toLocaleString() : 'N/A'}
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/opd/registration')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}