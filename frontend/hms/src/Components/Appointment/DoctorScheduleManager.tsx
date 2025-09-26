import {
  Button,
  Modal,
  TextInput,
  Select,
  Group,
  ActionIcon,
  Table,
  Title,
  ScrollArea
} from '@mantine/core';
import { IconTrash, IconEdit, IconPlus } from '@tabler/icons-react';
import React, { useState } from 'react';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

function DoctorScheduleManager() {
  const [schedules, setSchedules] = useState([
    { id: 1, day: 'Monday', start: '09:00 AM', end: '11:00 AM' },
    { id: 2, day: 'Thursday', start: '02:00 PM', end: '04:00 PM' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ id: null, day: '', start: '', end: '' });
  const [previewOpen, setPreviewOpen] = useState(false);

  const resetForm = () => setForm({ id: null, day: '', start: '', end: '' });

  const handleSubmit = () => {
    if (editing) {
      setSchedules((prev) =>
        prev.map((s) => (s.id === form.id ? { ...form, id: s.id } : s))
      );
    } else {
      const newSchedule = { ...form, id: Date.now() };
      setSchedules((prev) => [...prev, newSchedule]);
    }
    resetForm();
    setModalOpen(false);
    setEditing(false);
  };

  const handleEdit = (schedule:any) => {
    setForm(schedule);
    setEditing(true);
    setModalOpen(true);
  };

  const handleDelete = (id:any) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-[#182136] min-h-screen p-6 text-white">
      <Title order={2} className="text-orange-400 mb-4">
        Doctor Schedule Management
      </Title>

      <Button
        leftSection={<IconPlus size={16} />}
        onClick={() => setModalOpen(true)}
        className="mb-4 bg-purple-600 hover:bg-purple-700"
      >
        Add Schedule
      </Button>

      <ScrollArea>
        <Table
            striped
            highlightOnHover
            className="bg-[#1e2a47] border border-gray-600 table-fixed w-full"
            >
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td>{s.day}</td>
                <td>{s.start}</td>
                <td>{s.end}</td>
                <td>
                  <Group gap="xs">
                    <ActionIcon color="blue" onClick={() => handleEdit(s)}>
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => handleDelete(s.id)}>
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      <Button
        variant="outline"
        color="orange"
        className="mt-6"
        onClick={() => setPreviewOpen(true)}
      >
        Preview Schedule
      </Button>

      {/* Schedule Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => {
          resetForm();
          setModalOpen(false);
          setEditing(false);
        }}
        title={editing ? 'Edit Schedule' : 'Add Schedule'}
        centered
        radius="lg"
      >
        <Select
          label="Day"
          data={daysOfWeek}
          value={form.day}
          onChange={(value) => setForm({ ...form, day: value || '' })}
          required
        />
        <TextInput
          label="Start Time"
          placeholder="e.g. 09:00 AM"
          value={form.start}
          onChange={(e) => setForm({ ...form, start: e.currentTarget.value })}
          className="mt-2"
          required
        />
        <TextInput
          label="End Time"
          placeholder="e.g. 11:00 AM"
          value={form.end}
          onChange={(e) => setForm({ ...form, end: e.currentTarget.value })}
          className="mt-2"
          required
        />
        <Button fullWidth className="mt-4 bg-purple-600" onClick={handleSubmit}>
          {editing ? 'Update' : 'Add'}
        </Button>
      </Modal>

      {/* Preview Popup */}
      <Modal
        opened={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Preview Schedule"
        centered
        radius="lg"
      >
        <div className="text-white">
          {schedules.length === 0 ? (
            <p>No schedule added yet.</p>
          ) : (
            <ul className="space-y-2">
              {schedules.map((s) => (
                <li key={s.id} className="border-b border-gray-700 pb-2">
                  <strong>{s.day}</strong>: {s.start} - {s.end}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default DoctorScheduleManager;
