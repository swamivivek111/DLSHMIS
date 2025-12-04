import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../DataTable/DataTable';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { Badge } from '@mantine/core';
import ConfirmDialog from '../Common/ConfirmDialog';
import { OPDPatientRegistrationService } from '../../Services/OPDPatientRegistrationService';
import { getCity } from '../../Services/CityServices';

interface PatientRegistration {
  id: number;
  prnNumber?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobile: string;
  gender: string;
  age?: number;
  email: string;
  cityId?: number;
}

const PAGE_SIZE = 10;

export default function OPDPatientRegistrationGrid() {
  const [registrations, setRegistrations] = useState<PatientRegistration[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<PatientRegistration | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [registrationsRes, citiesRes] = await Promise.all([
        OPDPatientRegistrationService.getAllRegistrations(page - 1, PAGE_SIZE, search),
        getCity(1, 1000, '')
      ]);
      
      const data = registrationsRes.data;
      const registrations = data?.registrations || data?.content || data || [];
      setRegistrations(Array.isArray(registrations) ? registrations : []);
      setTotalPages(data?.totalPages || 1);
      setCities(citiesRes.data || []);
    } catch {
      errorNotification('Failed to load patient registrations');
      setRegistrations([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);



  const handleDelete = async (registration: PatientRegistration) => {
    try {
      const response = await OPDPatientRegistrationService.deleteRegistration(registration.id);
      successNotification(response.data?.message || `Patient ${registration.firstName} ${registration.lastName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete patient registration');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedRegistration(null);
    if (viewMode !== 'view') {
      fetchRegistrations();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedRegistration(null);
    fetchRegistrations();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const renderViewModal = () => (
    <Modal
      opened={showForm && viewMode === 'view'}
      onClose={() => setShowForm(false)}
      title="Patient Registration Details"
      size="lg"
    >
      {selectedRegistration && (
        <Stack gap="md">
          <Group>
            <Text fw={500}>PRN Number:</Text>
            <Badge color="green">{selectedRegistration.prnNumber}</Badge>
          </Group>
          
          <Group>
            <Text fw={500}>UHID:</Text>
            <Badge color="blue">{selectedRegistration.uhid}</Badge>
          </Group>
          
          <Group>
            <Text fw={500}>Full Name:</Text>
            <Text>{selectedRegistration.fullName || `${selectedRegistration.firstName} ${selectedRegistration.lastName}`}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Mobile:</Text>
            <Text>{selectedRegistration.mobile}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Email:</Text>
            <Text>{selectedRegistration.email || 'N/A'}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Gender:</Text>
            <Text>{selectedRegistration.gender}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Age:</Text>
            <Text>{selectedRegistration.age || 'N/A'}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Blood Group:</Text>
            <Text>{selectedRegistration.bloodGroup || 'N/A'}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Address:</Text>
            <Text>{selectedRegistration.address || 'N/A'}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Visit Type:</Text>
            <Badge color={selectedRegistration.visitType === 'NEW' ? 'green' : 'blue'}>
              {selectedRegistration.visitType}
            </Badge>
          </Group>
          
          <Group>
            <Text fw={500}>Visit Source:</Text>
            <Text>{selectedRegistration.visitSource}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Registration Date:</Text>
            <Text>{formatDate(selectedRegistration.registrationDate)}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Registration Fee:</Text>
            <Text>{formatCurrency(selectedRegistration.registrationFee)}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Discount:</Text>
            <Text>{selectedRegistration.discountPercent}%</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Amount Paid:</Text>
            <Text fw={500} c="green">{formatCurrency(selectedRegistration.amountPaid)}</Text>
          </Group>
          
          <Group>
            <Text fw={500}>Payment Mode:</Text>
            <Text>{selectedRegistration.paymentMode}</Text>
          </Group>
          
          {selectedRegistration.paymentReferenceNo && (
            <Group>
              <Text fw={500}>Payment Reference:</Text>
              <Text>{selectedRegistration.paymentReferenceNo}</Text>
            </Group>
          )}
        </Stack>
      )}
    </Modal>
  );

  return (
    <>
      <DataTable<PatientRegistration>
        data={registrations}
        columns={[
          { key: 'prnNumber', label: 'PRN Number' },
          { 
            key: 'fullName', 
            label: 'Patient Name',
            render: (row) => `${row.firstName} ${row.middleName || ''} ${row.lastName}`.trim()
          },
          { key: 'mobile', label: 'Mobile' },
          { key: 'gender', label: 'Gender' },
          { key: 'age', label: 'Age' },
          { 
            key: 'cityId', 
            label: 'City',
            render: (row) => cities.find(c => c.cityId === row.cityId)?.cityName || 'N/A'
          },
          { key: 'email', label: 'Email' },
        ]}
        onView={(r) => navigate(`/admin/opd/registration/view/${r.id}`)}
        onEdit={(r) => navigate(`/admin/opd/registration/edit/${r.id}`)}
        onDelete={(r) => {
          setRegistrationToDelete(r);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/opd/registration/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (registrationToDelete) {
            await handleDelete(registrationToDelete);
          }
        }}
        title="Delete Patient Registration"
        message={`Are you sure you want to delete the registration for ${registrationToDelete?.firstName} ${registrationToDelete?.lastName}?`}
        confirmText="Delete Registration"
        cancelText="Keep Registration"
      />
    </>
  );
}