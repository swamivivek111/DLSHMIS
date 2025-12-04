import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
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
      setEmployees(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error('Error loading employees:', error);
      setEmployees([]);
      setTotalPages(1);
      errorNotification('Failed to load employees');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/employees/add')}
          >
            Add Employee
          </Button>
        </div>

        <DataTable<Employee>
      data={employees}
      columns={[
        { key: 'employeeId', label: 'Employee Id' },
        { key: 'employeeCode', label: 'Employee Code' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'departmentId', label: 'Department' },
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
      </div>
    </motion.div>
  );
}
