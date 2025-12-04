import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { Badge } from '@mantine/core';
import ConfirmDialog from '../Common/ConfirmDialog';
import { OPDPatientRegistrationService } from '../../Services/OPDPatientRegistrationService';

interface Patient {
  patientId: number;
  prnNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  age?: number;
  mobileNumber: string;
  email?: string;
  patientCategoryId?: number;
  isActive: boolean;
  createdAt: string;
}

const PAGE_SIZE = 10;

export default function OPDPatientGrid() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await OPDPatientRegistrationService.getAllRegistrations(page - 1, PAGE_SIZE, search);
      setPatients(response.content || response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch {
      errorNotification('Failed to load patients');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const getFullName = (patient: Patient) => {
    return `${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.trim();
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'green' : 'red';
  };

  const handleDelete = async (patient: Patient) => {
    try {
      await OPDPatientRegistrationService.deleteRegistration(patient.patientId);
      successNotification(`Patient ${getFullName(patient)} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete patient');
    }
  };

  return (
    <>
      <DataTable<Patient>
        data={patients}
        columns={[
          { key: 'prnNumber', label: 'PRN Number' },
          { 
            key: 'patientName', 
            label: 'Patient Name',
            render: (row) => getFullName(row)
          },
          { key: 'gender', label: 'Gender' },
          { key: 'age', label: 'Age' },
          { key: 'mobileNumber', label: 'Mobile' },
          { key: 'email', label: 'Email' },
          { 
            key: 'isActive', 
            label: 'Status',
            render: (row) => (
              <Badge color={getStatusColor(row.isActive)} variant="light">
                {row.isActive ? 'Active' : 'Inactive'}
              </Badge>
            )
          },
          { 
            key: 'createdAt', 
            label: 'Registered On',
            render: (row) => new Date(row.createdAt).toLocaleDateString()
          },
        ]}
        onView={(p) => navigate(`/admin/opd/registration/view/${p.patientId}`)}
        onEdit={(p) => navigate(`/admin/opd/registration/edit/${p.patientId}`)}
        onDelete={(p) => {
          setPatientToDelete(p);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/opd/registration/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        title="Patient Registration"
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (patientToDelete) {
            await handleDelete(patientToDelete);
          }
        }}
        title="Delete Patient"
        message={`Are you sure you want to delete patient ${patientToDelete ? getFullName(patientToDelete) : ''}? This action cannot be undone.`}
        confirmText="Delete Patient"
        cancelText="Cancel"
      />
    </>
  );
}