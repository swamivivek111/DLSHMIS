import { useForm } from '@mantine/form';
import { Button, TextInput, Switch, Select, Table, NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addAuthority, getAuthorityById, updateAuthority, getAuthority } from '../../../Services/AuthorityServices';
import { getEmployee } from '../../../Services/EmployeeServices';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

export default function AuthorityForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [transactions, setTransactions] = useState([
    { type: 'OP Bill', discountPercent: 0, duePercent: 0 },
    { type: 'OP Bill Refund', discountPercent: 0, duePercent: 0 },
    { type: 'OP Bill Cancellation', discountPercent: 0, duePercent: 0 },
    { type: 'IP Final Bill', discountPercent: 0, duePercent: 0 },
    { type: 'IP Final Bill Refund', discountPercent: 0, duePercent: 0 },
    { type: 'IP Final Bill Cancellation', discountPercent: 0, duePercent: 0 },
  ]);


  const form = useForm({
    initialValues: {
      authorityId: '',
      authorityCode: '',
      authorityName: '',
      isActive: true,
      createdBy: 1,
      transactions: [],
    },
    validate: {
      authorityName: v => (v.length < 2 ? 'Authority name is required' : null),
      authorityCode: v => (v.length < 1 ? 'Authority code is required' : null),
    },
  });

  useEffect(() => {
    loadEmployees();
    if (isEdit && id) {
      getAuthorityById(Number(id))
        .then((data: any) => {
          if (data) {
            form.setValues({
              authorityId: data.authorityId || '',
              authorityCode: data.authorityCode || '',
              authorityName: data.authorityName || '',
              isActive: data.isActive !== undefined ? data.isActive : true,
              createdBy: data.createdBy || 1,
              transactions: data.transactions || []
            });
            if (data.transactions) {
              try {
                const parsedTransactions = typeof data.transactions === 'string' 
                  ? JSON.parse(data.transactions) 
                  : data.transactions;
                if (parsedTransactions && parsedTransactions.length > 0) {
                  setTransactions(parsedTransactions);
                } else {
                  setTransactions([
                    { type: 'OP Bill', discountPercent: 0, duePercent: 0 },
                    { type: 'OP Bill Refund', discountPercent: 0, duePercent: 0 },
                    { type: 'OP Bill Cancellation', discountPercent: 0, duePercent: 0 },
                    { type: 'IP Final Bill', discountPercent: 0, duePercent: 0 },
                    { type: 'IP Final Bill Refund', discountPercent: 0, duePercent: 0 },
                    { type: 'IP Final Bill Cancellation', discountPercent: 0, duePercent: 0 },
                  ]);
                }
              } catch {
                setTransactions([
                  { type: 'OP Bill', discountPercent: 0, duePercent: 0 },
                  { type: 'OP Bill Refund', discountPercent: 0, duePercent: 0 },
                  { type: 'OP Bill Cancellation', discountPercent: 0, duePercent: 0 },
                  { type: 'IP Final Bill', discountPercent: 0, duePercent: 0 },
                  { type: 'IP Final Bill Refund', discountPercent: 0, duePercent: 0 },
                  { type: 'IP Final Bill Cancellation', discountPercent: 0, duePercent: 0 },
                ]);
              }
            } else {
              // Keep default transactions if no saved data
              setTransactions([
                { type: 'OP Bill', discountPercent: 0, duePercent: 0 },
                { type: 'OP Bill Refund', discountPercent: 0, duePercent: 0 },
                { type: 'OP Bill Cancellation', discountPercent: 0, duePercent: 0 },
                { type: 'IP Final Bill', discountPercent: 0, duePercent: 0 },
                { type: 'IP Final Bill Refund', discountPercent: 0, duePercent: 0 },
                { type: 'IP Final Bill Cancellation', discountPercent: 0, duePercent: 0 },
              ]);
            }
          }
        })
        .catch(() => {
          errorNotification('Authority not found');
        });
    } else {
      loadNextAuthorityCode();
    }
  }, [id, isEdit]);

  const loadEmployees = async () => {
    try {
      const [employeeResponse, authorityResponse] = await Promise.all([
        getEmployee(1, 100),
        getAuthority(1, 100)
      ]);
      
      const existingAuthorityNames = authorityResponse.data.map((auth: any) => auth.authorityName);
      
      const availableEmployees = employeeResponse.data.filter((emp: any) => {
        const fullName = `${emp.firstName} ${emp.lastName}`;
        return !existingAuthorityNames.includes(fullName);
      });
      
      const employeeOptions = availableEmployees.map((emp: any) => ({
        value: `${emp.firstName} ${emp.lastName}`,
        label: `${emp.firstName} ${emp.lastName} (${emp.employeeCode})`
      }));
      
      setEmployees(employeeOptions);
    } catch {
      errorNotification('Failed to load employees');
    }
  };

  const loadNextAuthorityCode = async () => {
    try {
      const nextCode = Date.now().toString().slice(-6);
      form.setFieldValue('authorityCode', nextCode);
    } catch {
      // Ignore error
    }
  };

  const updateTransaction = (index: number, field: string, value: number) => {
    const updated = [...transactions];
    updated[index] = { ...updated[index], [field]: value };
    setTransactions(updated);
  };

  const handleSubmit = form.onSubmit(async (values: any) => {
    try {
      setLoading(true);
      const payload = { ...values, transactions: JSON.stringify(transactions) };
      
      if (isEdit) {
        updateAuthority(id, payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/authorities');
        }).catch((error) => {
          errorNotification(error.response?.data?.errorMessage || 'Failed to update authority');
        }).finally(() => { setLoading(false); });
      } else {
        delete payload.authorityId;
        addAuthority(payload).then((data) => {
          successNotification(data.message);
          navigate('/admin/mastersettings/authorities');
        }).catch((error) => {
          errorNotification(error.response?.data?.errorMessage || 'Failed to create authority');
        }).finally(() => { setLoading(false); });
      }
    } catch {
      errorNotification('Failed to save authority');
      setLoading(false);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Authority' : 'Add New Authority'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Select
            label="Authority Name"
            placeholder="Select employee"
            data={employees}
            withAsterisk
            searchable
            {...form.getInputProps('authorityName')}
          />
          <TextInput label="Authority Code" placeholder="Auto-generated" readOnly value={form.values.authorityCode || 'Loading...'} />
          
          <div className="flex items-center xl:justify-end">
            <Switch
              label="Active"
              className="px-2 py-1 rounded"
              color="#202A44"
              labelPosition="left"
              {...form.getInputProps('isActive', { type: 'checkbox' })}
            />
          </div>

          <div className="xl:col-span-2 mt-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Permissions</h3>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Transaction Type</Table.Th>
                  <Table.Th>Discount %</Table.Th>
                  <Table.Th>Due %</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {transactions.map((transaction, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{transaction.type}</Table.Td>
                    <Table.Td>
                      <NumberInput
                        value={transaction.discountPercent}
                        onChange={(value) => updateTransaction(index, 'discountPercent', Number(value) || 0)}
                        min={0}
                        max={100}
                        step={1}
                        decimalScale={0}
                        size="sm"
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        value={transaction.duePercent}
                        onChange={(value) => updateTransaction(index, 'duePercent', Number(value) || 0)}
                        min={0}
                        max={100}
                        step={1}
                        decimalScale={0}
                        size="sm"
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
            <Button 
              type="submit" 
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
              loading={loading}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/authorities')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}