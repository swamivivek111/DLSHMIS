import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Department } from '../../Types/Department';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDepartment, getDepartment } from '../../../Services/DepartmentServices';

const PAGE_SIZE = 10;

export default function DepartmentGrid() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDepartment(page, PAGE_SIZE, search);
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
        if (confirm('Delete '+d.name+' department?')) {
          await deleteDepartment(d.id);
          successNotification(d.name+' department deleted successfully!');
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
