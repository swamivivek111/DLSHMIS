import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Card, Divider, Grid, Badge } from '@mantine/core';
import { Employee } from '../../Types/Employee';
import { getEmployeeById } from '../../../Services/EmployeeServices';
import { getDepartmentById } from '../../../Services/DepartmentServices';
import { getDesignationById } from '../../../Services/DesignationServices';
import { getCityById } from '../../../Services/CityServices';
import { getStateById } from '../../../Services/StateServices';
import { getCountryById } from '../../../Services/CountryServices';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { motion } from 'framer-motion';

export default function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [departmentName, setDepartmentName] = useState<string>('');
  const [designationName, setDesignationName] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById(Number(id))
      .then((emp) => {
        setEmployee(emp);
        
        // Load related master data
        if (emp.departmentId) {
          console.log('Loading department for ID:', emp.departmentId);
          getDepartmentById(Number(emp.departmentId))
            .then((dept) => {
              console.log('Department response:', dept);
              setDepartmentName(dept.name || dept.departmentName || 'Unknown');
            })
            .catch((error) => {
              console.error('Failed to load department:', error);
              setDepartmentName('Unknown');
            });
        }
        if (emp.designationId) {
          console.log('Loading designation for ID:', emp.designationId);
          getDesignationById(Number(emp.designationId))
            .then((desig) => {
              console.log('Designation response:', desig);
              setDesignationName(desig.designationName || desig.name || 'Unknown');
            })
            .catch((error) => {
              console.error('Failed to load designation:', error);
              setDesignationName('Unknown');
            });
        }
        if (emp.cityId) {
          getCityById(emp.cityId)
            .then((city) => setCityName(city.cityName || city.name || 'Unknown'))
            .catch(() => setCityName('Unknown'));
        }
        if (emp.stateId) {
          getStateById(emp.stateId)
            .then((state) => setStateName(state.stateName || state.name || 'Unknown'))
            .catch(() => setStateName('Unknown'));
        }
        if (emp.countryId) {
          getCountryById(emp.countryId)
            .then((country) => setCountryName(country.countryName || country.name || 'Unknown'))
            .catch(() => setCountryName('Unknown'));
        }
      })
      .catch(() => errorNotification('Employee not found'));
  }, [id]);

  if (!employee) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {employee.firstName} Employee
        </h2>

          <Grid gutter="sm" className="text-sm">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Employee ID:</strong> {employee.employeeId}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text className="bg-blue-50 px-2 py-1 rounded">
                <strong>Employee Code:</strong> {employee.employeeCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Title:</strong> {employee.titleId || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Name:</strong> {`${employee.firstName || ''} ${employee.middleName || ''} ${employee.lastName || ''}`.trim()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Gender:</strong> {employee.gender || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Date of Birth:</strong> {employee.dob || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Joining Date:</strong> {employee.joiningDate || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Designation:</strong> {designationName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Department:</strong> {departmentName || 'Loading...'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Qualification:</strong> {employee.qualification || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Email:</strong> {employee.emailId || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Mobile:</strong> {employee.mobileNo || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Address:</strong> {employee.address || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>City:</strong> {cityName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>State:</strong> {stateName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Country:</strong> {countryName || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Pin Code:</strong> {employee.pincode || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Role ID:</strong> {employee.roleId || 'N/A'}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Text>
                <strong>Status:</strong>{' '}
                <Badge color={employee.active ? 'green' : 'red'}>
                  {employee.active ? 'Active' : 'Inactive'}
                </Badge>
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>
                <strong>Remark:</strong> {employee.remark || 'N/A'}
              </Text>
            </Grid.Col>
          </Grid>

        <Button
          variant="filled"
          className="bg-[#202A44] hover:bg-[#1a2236] transition-colors mt-4"
          onClick={() => navigate('/admin/mastersettings/employees')}
        >
          Back
        </Button>
      </div>
    </motion.div>
  );
}
