import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ConsultationChargesService } from '../../../Services/ConsultationChargesService';
import { TariffService } from '../../../Services/TariffService';
import { getDepartment } from '../../../Services/DepartmentServices';
import { getDoctor } from '../../../Services/DoctorServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ConsultationCharges {
  id: number;
  tariffId: number;
  departmentId: number;
  doctorId: number;
  opdVisitType: string;
  fee: number;
  hospitalSharePercent: number;
  doctorSharePercent: number;
  createdDate: string;
}

const PAGE_SIZE = 10;

export default function ConsultationChargesGrid() {
  const [consultationCharges, setConsultationCharges] = useState<ConsultationCharges[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [chargesToDelete, setChargesToDelete] = useState<ConsultationCharges | null>(null);
  const [masterData, setMasterData] = useState<{tariffs: any[], departments: any[], doctors: any[]}>({tariffs: [], departments: [], doctors: []});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Load master data and consultation charges in parallel
      const [chargesRes, tariffRes, deptRes, doctorRes] = await Promise.all([
        ConsultationChargesService.getAllConsultationCharges(),
        TariffService.getAllTariffs(),
        getDepartment(1, 100, ''),
        getDoctor(1, 100, '')
      ]);
      
      const allCharges = chargesRes.consultationCharges || [];
      
      // Store master data for lookups
      const masterDataObj = {
        tariffs: tariffRes.tariffs || [],
        departments: deptRes.data || [],
        doctors: doctorRes.data || doctorRes.doctors || []
      };
      
      setMasterData(masterDataObj);
      
      // Filter by search
      const filteredCharges = search 
        ? allCharges.filter((charges: ConsultationCharges) =>
            charges.opdVisitType?.toLowerCase().includes(search.toLowerCase()) ||
            charges.fee?.toString().includes(search.toLowerCase())
          )
        : allCharges;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedCharges = filteredCharges.slice(startIndex, endIndex);
      
      setConsultationCharges(paginatedCharges);
      setTotalPages(Math.ceil(filteredCharges.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load consultation charges');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (charges: ConsultationCharges) => {
    try {
      await ConsultationChargesService.deleteConsultationCharges(charges.id);
      successNotification('Consultation charges deleted successfully!');
      fetchData();
    } catch {
      errorNotification('Failed to delete consultation charges');
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Consultation Charges Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/consultation-charges/add')}
          >
            Add Consultation Charges
          </Button>
        </div>

        <DataTable<ConsultationCharges>
          key={`${masterData.doctors.length}-${masterData.departments.length}-${masterData.tariffs.length}`}
          data={consultationCharges}
          columns={[
            { 
              key: 'tariffId', 
              label: 'Tariff', 
              render: (row) => {
                const tariff = masterData.tariffs.find(t => t.tariffId === row.tariffId);
                return tariff ? `${tariff.serviceName} (${tariff.serviceCode || 'N/A'})` : `ID: ${row.tariffId}`;
              }
            },
            { 
              key: 'departmentId', 
              label: 'Department', 
              render: (row) => {
                const dept = masterData.departments.find(d => d.id === row.departmentId);
                return dept ? dept.name : `ID: ${row.departmentId}`;
              }
            },
            { 
              key: 'doctorId', 
              label: 'Doctor', 
              render: (row) => {
                const doctor = masterData.doctors.find(d => d.doctorId == row.doctorId);
                return doctor ? doctor.name : `ID: ${row.doctorId}`;
              }
            },
            { key: 'opdVisitType', label: 'Visit Type' },
            { key: 'fee', label: 'Fee', render: (row) => `₹${row.fee?.toFixed(2)}` },
            { key: 'hospitalSharePercent', label: 'Hospital %', render: (row) => `${row.hospitalSharePercent}%` },
            { key: 'doctorSharePercent', label: 'Doctor %', render: (row) => `${row.doctorSharePercent}%` },
          ]}
          onView={(c) => navigate(`/admin/mastersettings/consultation-charges/view/${c.id}`)}
          onEdit={(c) => navigate(`/admin/mastersettings/consultation-charges/edit/${c.id}`)}
          onDelete={(c) => {
            setChargesToDelete(c);
            setDeleteConfirmOpen(true);
          }}
          onAdd={() => navigate('/admin/mastersettings/consultation-charges/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (chargesToDelete) {
            await handleDelete(chargesToDelete);
          }
        }}
        title="Delete Consultation Charges"
        message={`Are you sure you want to delete this consultation charges? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}