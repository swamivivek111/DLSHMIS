import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { ConsultationChargesService } from '../../../Services/ConsultationChargesService';
import { TariffService } from '../../../Services/TariffService';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getDoctor } from '../../../Services/DoctorServices';

interface ConsultationCharges {
  id: number;
  tariffId: number;
  departmentId: number;
  doctorId: number;
  opdVisitType: string;
  validationDays: number;
  noOfVisits: number;
  normalVisits: number;
  freeVisits: number;
  paidVisits: number;
  fee: number;
  hospitalSharePercent: number;
  hospitalShareAmount: number;
  doctorSharePercent: number;
  doctorShareAmount: number;
  deluxeFee: number;
  deluxePercent: number;
  deluxePrice: number;
  suiteFee: number;
  suitePercent: number;
  suitePrice: number;
  pvtIcuFee: number;
  pvtIcuPercent: number;
  pvtIcuPrice: number;
  singleRoomFee: number;
  singleRoomPercent: number;
  singleRoomPrice: number;
  createdDate: string;
  modifiedDate: string;
}

export default function ConsultationChargesView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charges, setCharges] = useState<ConsultationCharges | null>(null);
  const [loading, setLoading] = useState(true);
  const [masterData, setMasterData] = useState<{tariff: any, department: any, doctor: any}>({tariff: null, department: null, doctor: null});

  useEffect(() => {
    if (id) {
      loadConsultationCharges();
    }
  }, [id]);

  const loadConsultationCharges = async () => {
    try {
      setLoading(true);
      const response = await ConsultationChargesService.getConsultationChargesById(Number(id));
      const chargesData = response.consultationCharges;
      setCharges(chargesData);
      
      // Load master data for display
      if (chargesData) {
        const [tariffRes, deptRes, doctorRes] = await Promise.all([
          TariffService.getTariffById(chargesData.tariffId).catch(() => null),
          getDepartment(1, 100, '').then(res => res.data.find((d: any) => d.id === chargesData.departmentId)).catch(() => null),
          getDoctor(1, 100, '').then(res => {
            const doctors = res.data || res.doctors || [];
            return doctors.find((d: any) => d.doctorId === chargesData.doctorId);
          }).catch(() => null)
        ]);
        
        setMasterData({
          tariff: tariffRes?.tariff || null,
          department: deptRes || null,
          doctor: doctorRes || null
        });
      }
    } catch {
      errorNotification('Failed to load consultation charges');
      navigate('/admin/mastersettings/consultation-charges');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Loading...</Text>
        </div>
      </motion.div>
    );
  }

  if (!charges) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Consultation charges not found</Text>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Consultation Charges Details
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Tariff:</strong> {masterData.tariff 
                ? `${masterData.tariff.serviceName} (${masterData.tariff.serviceCode || 'N/A'})` 
                : `ID: ${charges.tariffId}`
              }
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Department:</strong> {masterData.department 
                ? masterData.department.name 
                : `ID: ${charges.departmentId}`
              }
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Doctor:</strong> {masterData.doctor 
                ? masterData.doctor.name 
                : `ID: ${charges.doctorId}`
              }
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Visit Type:</strong> {charges.opdVisitType}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Fee:</strong> ₹{charges.fee?.toFixed(2)}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Validation Days:</strong> {charges.validationDays}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Hospital Share %:</strong> {charges.hospitalSharePercent}%
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Doctor Share %:</strong> {charges.doctorSharePercent}%
            </Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Title order={4} mb="md">Room Type Charges</Title>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Text>
              <strong>Deluxe Fee:</strong> ₹{charges.deluxeFee?.toFixed(2) || '0.00'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Text>
              <strong>Suite Fee:</strong> ₹{charges.suiteFee?.toFixed(2) || '0.00'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Text>
              <strong>Pvt ICU Fee:</strong> ₹{charges.pvtIcuFee?.toFixed(2) || '0.00'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created Date:</strong> {charges.createdDate ? new Date(charges.createdDate).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Modified Date:</strong> {charges.modifiedDate ? new Date(charges.modifiedDate).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/consultation-charges/edit/${charges.id}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/consultation-charges')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}