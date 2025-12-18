import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Button, Select, NumberInput, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ConsultationChargesService } from '../../../Services/ConsultationChargesService';
import { TariffService } from '../../../Services/TariffService';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getDoctor } from '../../../Services/DoctorServices';

interface ConsultationChargesFormData {
  tariffId: string;
  departmentId: string;
  doctorId: string;
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
}

export default function ConsultationChargesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [masterDataLoading, setMasterDataLoading] = useState(true);
  const [tariffs, setTariffs] = useState<{ value: string; label: string }[]>([]);
  const [departments, setDepartments] = useState<{ value: string; label: string }[]>([]);
  const [doctors, setDoctors] = useState<{ value: string; label: string }[]>([]);
  const isEdit = Boolean(id);

  const form = useForm<ConsultationChargesFormData>({
    initialValues: {
      tariffId: '',
      departmentId: '',
      doctorId: '',
      opdVisitType: '',
      validationDays: 0,
      noOfVisits: 0,
      normalVisits: 0,
      freeVisits: 0,
      paidVisits: 0,
      fee: 0,
      hospitalSharePercent: 0,
      hospitalShareAmount: 0,
      doctorSharePercent: 0,
      doctorShareAmount: 0,
      deluxeFee: 0,
      deluxePercent: 0,
      deluxePrice: 0,
      suiteFee: 0,
      suitePercent: 0,
      suitePrice: 0,
      pvtIcuFee: 0,
      pvtIcuPercent: 0,
      pvtIcuPrice: 0,
      singleRoomFee: 0,
      singleRoomPercent: 0,
      singleRoomPrice: 0,
    },
    validate: {
      tariffId: (value) => (!value ? 'Tariff is required' : null),
      departmentId: (value) => (!value ? 'Department is required' : null),
      doctorId: (value) => (!value ? 'Doctor is required' : null),
      opdVisitType: (value) => (!value ? 'Visit type is required' : null),
    },
  });

  const visitTypes = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Followup', label: 'Follow-up' },
    { value: 'Emergency', label: 'Emergency' },
  ];

  useEffect(() => {
    loadMasterData();
    if (isEdit && id) {
      loadConsultationCharges();
    }
  }, [id, isEdit]);

  const loadMasterData = async () => {
    try {
      setMasterDataLoading(true);
      // Load Tariffs
      const tariffRes = await TariffService.getAllTariffs();
      const tariffOptions = (tariffRes.tariffs || []).map((tariff: any) => ({
        value: tariff.tariffId.toString(),
        label: `${tariff.serviceName} - ${tariff.serviceCode || 'N/A'}`,
      }));
      setTariffs(tariffOptions);

      // Load Departments
      const deptRes = await getDepartment(1, 100, '');
      const deptOptions = deptRes.data.map((dept: any) => ({
        value: dept.id.toString(),
        label: dept.name,
      }));
      setDepartments(deptOptions);

      // Load Doctors
      const doctorRes = await getDoctor(1, 100, '');
      const doctorsArray = doctorRes.doctors || doctorRes.data || doctorRes || [];
      const doctorOptions = doctorsArray.map((doctor: any) => ({
        value: (doctor.doctorId || doctor.id).toString(),
        label: doctor.name || `${doctor.firstName} ${doctor.lastName}` || 'Unknown Doctor',
      }));
      
      setDoctors(doctorOptions);
    } catch {
      errorNotification('Failed to load master data');
    } finally {
      setMasterDataLoading(false);
    }
  };

  const loadConsultationCharges = async () => {
    try {
      setLoading(true);
      const response = await ConsultationChargesService.getConsultationChargesById(Number(id));
      const charges = response.consultationCharges;
      form.setValues({
        ...charges,
        tariffId: charges.tariffId?.toString() || '',
        departmentId: charges.departmentId?.toString() || '',
        doctorId: charges.doctorId?.toString() || '',
      });
    } catch {
      errorNotification('Failed to load consultation charges');
      navigate('/admin/mastersettings/consultation-charges');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: ConsultationChargesFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...values,
        tariffId: Number(values.tariffId),
        departmentId: Number(values.departmentId),
        doctorId: Number(values.doctorId),
      };
      
      if (isEdit) {
        await ConsultationChargesService.updateConsultationCharges(Number(id), submitData);
        successNotification('Consultation charges updated successfully!');
      } else {
        await ConsultationChargesService.createConsultationCharges(submitData);
        successNotification('Consultation charges created successfully!');
      }
      navigate('/admin/mastersettings/consultation-charges');
    } catch {
      errorNotification(`Failed to ${isEdit ? 'update' : 'create'} consultation charges`);
    } finally {
      setLoading(false);
    }
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
          {isEdit ? 'Edit Consultation Charges' : 'Add Consultation Charges'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Tariff"
            placeholder="Select tariff"
            data={tariffs}
            withAsterisk
            searchable
            {...form.getInputProps('tariffId')}
          />
          
          <Select
            label="Department"
            placeholder="Select department"
            data={departments}
            withAsterisk
            searchable
            {...form.getInputProps('departmentId')}
          />
          
          <Select
            label="Doctor"
            placeholder={masterDataLoading ? "Loading doctors..." : "Select doctor"}
            data={doctors}
            withAsterisk
            searchable
            disabled={masterDataLoading}
            {...form.getInputProps('doctorId')}
          />
          
          <Select
            label="OPD Visit Type"
            placeholder="Select visit type"
            data={visitTypes}
            withAsterisk
            {...form.getInputProps('opdVisitType')}
          />
          
          <NumberInput label="Validation Days" {...form.getInputProps('validationDays')} />
          <NumberInput label="No of Visits" {...form.getInputProps('noOfVisits')} />
          <NumberInput label="Normal Visits" {...form.getInputProps('normalVisits')} />
          <NumberInput label="Free Visits" {...form.getInputProps('freeVisits')} />
          <NumberInput label="Paid Visits" {...form.getInputProps('paidVisits')} />
          
          <NumberInput
            label="Fee"
            placeholder="0.00"
            decimalScale={2}
            {...form.getInputProps('fee')}
          />
          
          <NumberInput
            label="Hospital Share %"
            placeholder="0.00"
            decimalScale={2}
            {...form.getInputProps('hospitalSharePercent')}
          />
          
          <NumberInput
            label="Hospital Share Amount"
            placeholder="0.00"
            decimalScale={2}
            {...form.getInputProps('hospitalShareAmount')}
          />
          
          <NumberInput
            label="Doctor Share %"
            placeholder="0.00"
            decimalScale={2}
            {...form.getInputProps('doctorSharePercent')}
          />
          
          <NumberInput
            label="Doctor Share Amount"
            placeholder="0.00"
            decimalScale={2}
            {...form.getInputProps('doctorShareAmount')}
          />

          <div className="xl:col-span-2">
            <Title order={4} mb="md">Room Type Charges</Title>
          </div>

          <NumberInput label="Deluxe Fee" decimalScale={2} {...form.getInputProps('deluxeFee')} />
          <NumberInput label="Deluxe Percent" decimalScale={2} {...form.getInputProps('deluxePercent')} />
          <NumberInput label="Deluxe Price" decimalScale={2} {...form.getInputProps('deluxePrice')} />
          
          <NumberInput label="Suite Fee" decimalScale={2} {...form.getInputProps('suiteFee')} />
          <NumberInput label="Suite Percent" decimalScale={2} {...form.getInputProps('suitePercent')} />
          <NumberInput label="Suite Price" decimalScale={2} {...form.getInputProps('suitePrice')} />
          
          <NumberInput label="Pvt ICU Fee" decimalScale={2} {...form.getInputProps('pvtIcuFee')} />
          <NumberInput label="Pvt ICU Percent" decimalScale={2} {...form.getInputProps('pvtIcuPercent')} />
          <NumberInput label="Pvt ICU Price" decimalScale={2} {...form.getInputProps('pvtIcuPrice')} />
          
          <NumberInput label="Single Room Fee" decimalScale={2} {...form.getInputProps('singleRoomFee')} />
          <NumberInput label="Single Room Percent" decimalScale={2} {...form.getInputProps('singleRoomPercent')} />
          <NumberInput label="Single Room Price" decimalScale={2} {...form.getInputProps('singleRoomPrice')} />

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button type="submit" loading={loading} className="bg-[#202A44] text-white hover:bg-[#1a2236]">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/consultation-charges')}
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