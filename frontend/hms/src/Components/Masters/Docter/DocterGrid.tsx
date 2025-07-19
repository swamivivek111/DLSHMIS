import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../../Types/Doctor';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDoctor, getDoctor } from '../../../Services/DoctorServices';

const PAGE_SIZE = 10;

export default function DoctorGrid() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDoctor(page, PAGE_SIZE, search);
      setDoctors(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load doctors');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Doctor>
      data={doctors}
      columns={[
        { key: 'name', label: 'Doctor' },
        { key: 'code', label: 'Code' },
        { key: 'qualification', label: 'Qualification' },
        { key: 'contactNumber', label: 'Contact' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/doctors/view/${d.doctorId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/doctors/edit/${d.doctorId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.name+' doctor?')) {
          await deleteDoctor(d.doctorId);
          successNotification(d.name+' doctor deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/doctors/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
