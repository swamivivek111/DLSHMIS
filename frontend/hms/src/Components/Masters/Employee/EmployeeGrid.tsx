import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../Types/Employee';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteEmployee, getEmployee } from '../../../Services/EmployeeServices';

const PAGE_SIZE = 10;

export default function EmployeeGrid() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getEmployee(page, PAGE_SIZE, search);
      setEmployees(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load employees');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Employee>
      data={employees}
      columns={[
        { key: 'employeeId', label: 'Employee Id' },
        { key: 'employeeCode', label: 'Employee Code' },
        { key: 'firstName', label: 'First Name' },
        { key: 'middleName', label: 'Middle Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'mobileNo', label: 'Mobile Number' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/employees/view/${d.employeeId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/employees/edit/${d.employeeId}`)} 
      onDelete={async (d) => {
        if (confirm('Delete '+d.firstName+' employee?')) {
          await deleteEmployee(d.employeeId);
          successNotification(d.firstName+' employee deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/employees/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
