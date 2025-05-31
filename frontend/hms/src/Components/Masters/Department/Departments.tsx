import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Department } from '../../Types/Department';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDepartment, getDepartments } from '../../../Services/DepartmentServices';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDepartments(page, 10, search);
      setDepartments(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load departments');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Department>
      data={departments}
      columns={[
        { key: 'name', label: 'Department' },
        { key: 'code', label: 'Code' },
        { key: 'headOfDepartment', label: 'HOD' },
        { key: 'contactNumber', label: 'Contact' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/departments/view/${d.id}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/departments/edit/${d.id}`)}
      onDelete={async (d) => {
        if (confirm('Delete department?')) {
          await deleteDepartment(d.id);
          successNotification('Deleted');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/departments/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
