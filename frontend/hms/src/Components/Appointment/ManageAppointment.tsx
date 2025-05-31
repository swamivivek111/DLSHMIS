import { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Group,
  TextInput,
  Modal,
  Select,
  Textarea,
  Pagination,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Badge,
} from '@mantine/core';
import { IconSearch, IconPlus, IconEdit, IconTrash, IconDownload } from '@tabler/icons-react';
import { format, parseISO } from 'date-fns';

const STATUS_OPTIONS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

type Appointment = {
  id:string;
  patientId: string,
  doctorId: string,
  appointmentDateTime: string,
  status: string,
  reason: string,
  notes: string,
};
export default function ManageAppointment() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 'P001',
      doctorId: 'D001',
      appointmentDateTime: '2025-05-18T10:00',
      status: 'scheduled',
      reason: 'Routine checkup',
      notes: 'N/A',
      createdAt: '2025-05-01T08:00',
      updatedAt: '2025-05-10T09:00',
    },
    {
      id: 2,
      patientId: 'P002',
      doctorId: 'D002',
      appointmentDateTime: '2025-05-19T13:30',
      status: 'completed',
      reason: 'Follow-up',
      notes: 'Patient recovering well',
      createdAt: '2025-05-02T11:00',
      updatedAt: '2025-05-12T15:30',
    },
    // Add more dummy data as needed
  ]);

  const PAGE_SIZE = 5;

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpened, setModalOpened] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment|null>(null);

  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    status: 'scheduled',
    reason: '',
    notes: '',
  });

  // Filter appointments based on search query
  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return appointments;
    const q = searchQuery.toLowerCase();
    return appointments.filter((a) =>
      Object.values(a).some((val) =>
        val
          ?.toString()
          .toLowerCase()
          .includes(q)
      )
    );
  }, [appointments, searchQuery]);

  // Paginate filtered appointments
  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAppointments.slice(start, start + PAGE_SIZE);
  }, [filteredAppointments, page]);

  // Handle form input changes
 const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Open modal for Add new appointment
  function openAddModal() {
    setEditingAppointment(null);
    setForm({
      patientId: '',
      doctorId: '',
      appointmentDateTime: '',
      status: 'scheduled',
      reason: '',
      notes: '',
    });
    setModalOpened(true);
  }

  // Open modal for Edit appointment
  function openEditModal(appointment:any) {
    setEditingAppointment(appointment);
    setForm({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      appointmentDateTime: appointment.appointmentDateTime,
      status: appointment.status,
      reason: appointment.reason,
      notes: appointment.notes,
    });
    setModalOpened(true);
  }

  // Save appointment (Add or Update)
  function saveAppointment() {
    if (editingAppointment) {
      setAppointments((aps) =>
        aps.map((a :any) =>
          a.id === (editingAppointment  as Appointment).id
            ? { ...a, ...form, updatedAt: new Date().toISOString() }
            : a
        )
      );
    } else {
      const newId = appointments.length ? Math.max(...appointments.map((a) => a.id)) + 1 : 1;
      const newAppointment = {
        id: newId,
        ...form,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAppointments((aps) => [newAppointment, ...aps]);
    }
    setModalOpened(false);
  }

  // Delete appointment with confirmation
  function deleteAppointment(id:any) {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments((aps) => aps.filter((a) => a.id !== id));
    }
  }

  // Export filtered appointments as CSV
  function exportCSV() {
    const headers = [
      'ID',
      'Patient ID',
      'Doctor ID',
      'Appointment DateTime',
      'Status',
      'Reason',
      'Notes',
      'Created At',
      'Updated At',
    ];
    const rows = filteredAppointments.map((a) => [
      a.id,
      a.patientId,
      a.doctorId,
      a.appointmentDateTime,
      a.status,
      `"${a.reason.replace(/"/g, '""')}"`,
      `"${a.notes.replace(/"/g, '""')}"`,
      a.createdAt,
      a.updatedAt,
    ]);
    const csvContent =
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <Group justify="space-between" mb="md" wrap="wrap" className="gap-4">
        <TextInput
          leftSection={<IconSearch size={16} />}
          placeholder="Search appointments"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          radius="md"
          size="sm"
          className="flex-grow max-w-md"
        />

        <Group gap="xs" className="flex-wrap">
          <Button
            leftSection={<IconDownload size={16} />}
            variant="outline"
            size="sm"
            onClick={exportCSV}
          >
            Export CSV
          </Button>

          <Button
            leftSection={<IconPlus size={16} />}
            size="sm"
            onClick={openAddModal}
          >
            Add Appointment
          </Button>
        </Group>
      </Group>

      <ScrollArea className="border rounded bg-white" style={{ minHeight: 320 }}>
        <Table
          striped
          highlightOnHover
          horizontalSpacing="md"
          verticalSpacing="xs"
          style={{ tableLayout: 'fixed', minWidth: '100%', fontSize: '0.875rem' }}
          className="min-w-full"
        >
          <thead>
            <tr>
              <th className="truncate">ID</th>
              <th className="truncate">Patient ID</th>
              <th className="truncate">Doctor ID</th>
              <th className="truncate">Appointment DateTime</th>
              <th className="truncate">Status</th>
              <th className="truncate">Reason</th>
              <th className="truncate">Notes</th>
              <th className="truncate">Created At</th>
              <th className="truncate">Updated At</th>
              <th className="text-center w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              paginatedAppointments.map((a) => (
                <tr key={a.id} className="align-top">
                  <td className="truncate">{a.id}</td>
                  <td className="truncate">{a.patientId}</td>
                  <td className="truncate">{a.doctorId}</td>
                  <td className="truncate" title={a.appointmentDateTime}>
                    {format(parseISO(a.appointmentDateTime), 'PPpp')}
                  </td>
                  <td className="truncate">
                    <Badge
                      color={
                        a.status === 'completed'
                          ? 'green'
                          : a.status === 'cancelled'
                          ? 'red'
                          : 'blue'
                      }
                      variant="light"
                      className="capitalize"
                    >
                      {a.status}
                    </Badge>
                  </td>
                  <td className="truncate" title={a.reason}>
                    {a.reason}
                  </td>
                  <td className="truncate" title={a.notes}>
                    {a.notes}
                  </td>
                  <td className="truncate" title={a.createdAt}>
                    {format(parseISO(a.createdAt), 'Pp')}
                  </td>
                  <td className="truncate" title={a.updatedAt}>
                    {format(parseISO(a.updatedAt), 'Pp')}
                  </td>
                  <td className="text-center">
                    <Group justify="center" wrap="nowrap">
                      <Tooltip label="Edit" withArrow position="top">
                        <ActionIcon
                          color="blue"
                          onClick={() => openEditModal(a)}
                          size="sm"
                          variant="light"
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete" withArrow position="top">
                        <ActionIcon
                          color="red"
                          onClick={() => deleteAppointment(a.id)}
                          size="sm"
                          variant="light"
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </ScrollArea>

      <Pagination
        total={Math.ceil(filteredAppointments.length / PAGE_SIZE)}
        value={page}
        onChange={setPage}
        mt="md"
        size="sm"
      />

      {/* Modal for Add/Edit */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingAppointment ? 'Edit Appointment' : 'Add Appointment'}
        centered
        size="lg"
        overlayProps={{ style: { backdropFilter: 'blur(5px)' } }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAppointment();
          }}
          className="space-y-4"
        >
          <TextInput
            label="Patient ID"
            name="patientId"
            value={form.patientId}
            onChange={handleFormChange}
            required
            radius="md"
            size="sm"
          />
          <TextInput
            label="Doctor ID"
            name="doctorId"
            value={form.doctorId}
            onChange={handleFormChange}
            required
            radius="md"
            size="sm"
          />
          <TextInput
            type="datetime-local"
            label="Appointment Date & Time"
            name="appointmentDateTime"
            value={form.appointmentDateTime}
            onChange={handleFormChange}
            required
            radius="md"
            size="sm"
          />
          <Select
            label="Status"
            name="status"
            data={STATUS_OPTIONS}
            value={form.status}
            onChange={(val) => setForm((f) => ({ ...f, status: val ?? '' }))}
            required
            radius="md"
            size="sm"
          />
          <TextInput
            label="Reason"
            name="reason"
            value={form.reason}
            onChange={handleFormChange}
            radius="md"
            size="sm"
          />
          <Textarea
            label="Notes"
            name="notes"
            value={form.notes}
           
            onChange={handleFormChange}
            radius="md"
            size="sm"
            minRows={2}
            />
            <Group style={{ justifyContent: 'flex-end' }} mt="md">
              <Button type="submit">{editingAppointment ? 'Update' : 'Add'}</Button>
            </Group>
            </form>
            </Modal>
        </div>
    );
}