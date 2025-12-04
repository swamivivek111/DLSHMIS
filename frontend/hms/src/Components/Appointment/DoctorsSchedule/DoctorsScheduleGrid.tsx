import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Group, Text } from '@mantine/core';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { DoctorSchedule, DoctorScheduleServices } from '../../../Services/DoctorScheduleServices';
import { notifications } from '@mantine/notifications';
import DataTable from '../../DataTable/DataTable';
import ConfirmDialog from '../../Common/ConfirmDialog';

const PAGE_SIZE = 10;

export default function DoctorsScheduleGrid() {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<DoctorSchedule | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await DoctorScheduleServices.getAllSchedules(page, PAGE_SIZE, search);
      setSchedules(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to load doctor schedules',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = (schedule: DoctorSchedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (scheduleToDelete) {
      try {
        await DoctorScheduleServices.deleteSchedule(scheduleToDelete.id!);
        notifications.show({
          title: 'Success',
          message: 'Schedule deleted successfully',
          color: 'green',
        });
        fetchData();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete schedule',
          color: 'red',
        });
      }
    }
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  const getStatusBadge = (schedule: DoctorSchedule) => {
    if (schedule.isLeave) return <Badge color="orange">Leave</Badge>;
    if (schedule.isHoliday) return <Badge color="red">Holiday</Badge>;
    if (!schedule.isAvailable) return <Badge color="gray">Unavailable</Badge>;
    return <Badge color="green">Available</Badge>;
  };

  const getSessionBadge = (session: string) => {
    const colors = { MORNING: 'blue', AFTERNOON: 'orange', EVENING: 'purple' };
    return <Badge color={colors[session as keyof typeof colors] || 'gray'}>{session}</Badge>;
  };

  return (
    <>
      <DataTable<DoctorSchedule>
      data={schedules}
      columns={[
        { 
          key: 'doctorName', 
          label: 'Doctor',
          render: (schedule) => (
            <div>
              <Text fw={500}>{schedule.doctorName}</Text>
              <Text size="xs" c="dimmed">ID: {schedule.doctorId}</Text>
            </div>
          )
        },
        { 
          key: 'scheduleDate', 
          label: 'Date',
          render: (schedule) => (
            <Group gap="xs">
              <IconCalendar size={14} />
              <Text size="sm">{new Date(schedule.scheduleDate).toLocaleDateString()}</Text>
            </Group>
          )
        },
        { 
          key: 'sessionType', 
          label: 'Session',
          render: (schedule) => getSessionBadge(schedule.sessionType)
        },
        { 
          key: 'startTime', 
          label: 'Time',
          render: (schedule) => (
            <Group gap="xs">
              <IconClock size={14} />
              <Text size="sm">{schedule.startTime} - {schedule.endTime}</Text>
            </Group>
          )
        },
        { 
          key: 'maxPatients', 
          label: 'Capacity',
          render: (schedule) => <Text size="sm">{schedule.maxPatients}</Text>
        },
        { 
          key: 'isAvailable', 
          label: 'Status',
          render: (schedule) => getStatusBadge(schedule)
        }
      ]}
      onView={(schedule) => navigate(`/admin/appointments/schedule/view/${schedule.id}`)}
      onEdit={(schedule) => navigate(`/admin/appointments/schedule/edit/${schedule.id}`)}
      onDelete={handleDelete}
      onAdd={() => navigate('/admin/appointments/schedule/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
    
    <ConfirmDialog
      opened={deleteDialogOpen}
      onClose={() => setDeleteDialogOpen(false)}
      onConfirm={confirmDelete}
      title="Delete Schedule"
      message={`Are you sure you want to delete the schedule for ${scheduleToDelete?.doctorName}?`}
      confirmText="Delete"
      cancelText="Cancel"
    />
    </>
  );
}
