import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { Badge } from '@mantine/core';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface Appointment {
  appointmentId: number;
  patientName: string;
  doctorName: string;
  departmentName: string;
  appointmentDate: string;
  timeSlot: string;
  sessionType: string;
  status: string;
}

const PAGE_SIZE = 10;

export default function AppointmentGrid() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      const response = await AppointmentServices.getAllAppointments(page - 1, PAGE_SIZE, search);
      setAppointments(response.content);
      setTotalPages(response.totalPages);
    } catch {
      errorNotification('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'SCHEDULED': 'blue',
      'COMPLETED': 'green',
      'CANCELLED': 'red',
      'RESCHEDULED': 'orange'
    };
    return colors[status] || 'gray';
  };

  const handleCancel = async (appointment: Appointment) => {
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      await AppointmentServices.cancelAppointment(appointment.appointmentId);
      successNotification(`Appointment for ${appointment.patientName} cancelled successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to cancel appointment');
    }
  };

  const handleDelete = async (appointment: Appointment) => {
    try {
      const { AppointmentServices } = await import('../../../Services/AppointmentServices');
      await AppointmentServices.deleteAppointment(appointment.appointmentId);
      successNotification(`Appointment for ${appointment.patientName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete appointment');
    }
  };

  return (
    <>
      <DataTable<Appointment>
        data={appointments}
        columns={[
          { key: 'patientName', label: 'Patient' },
          { key: 'doctorName', label: 'Doctor' },
          { key: 'departmentName', label: 'Department' },
          { key: 'appointmentDate', label: 'Date' },
          { key: 'timeSlot', label: 'Time Slot' },
          { key: 'sessionType', label: 'Session' },
          { 
            key: 'status', 
            label: 'Status',
            render: (row) => (
              <Badge color={getStatusColor(row.status)} variant="light">
                {row.status}
              </Badge>
            )
          },
        ]}
        onView={(a) => navigate(`/admin/appointments/bookappointment/view/${a.appointmentId}`)}
        onEdit={(a) => navigate(`/admin/appointments/bookappointment/edit/${a.appointmentId}`)}
        onDelete={(a) => {
          setAppointmentToDelete(a);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/appointments/bookappointment/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (appointmentToDelete) {
            await handleDelete(appointmentToDelete);
          }
        }}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel the appointment for ${appointmentToDelete?.patientName}?`}
        confirmText="Cancel Appointment"
        cancelText="Keep Appointment"
      />
    </>
  );
}