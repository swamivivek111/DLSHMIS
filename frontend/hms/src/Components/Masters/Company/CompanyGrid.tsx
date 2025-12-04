import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Company } from '../../Types/Company';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteCompany, getCompany } from '../../../Services/CompanyServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

const PAGE_SIZE = 10;

export default function CompanyGrid() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getCompany(page, PAGE_SIZE, search);
      setCompanies(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load companies');
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
          <h2 className="text-2xl font-bold text-gray-800">Company Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/companies/add')}
          >
            Add Company
          </Button>
        </div>

        <DataTable<Company>
          data={companies}
          columns={[
            { key: 'companyName', label: 'Company Name' },
            { key: 'companyCode', label: 'Code' },
            { key: 'companyType', label: 'Type' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
          ]}
          onView={(c) => navigate(`/admin/mastersettings/companies/view/${c.companyId}`)}
          onEdit={(c) => navigate(`/admin/mastersettings/companies/edit/${c.companyId}`)}
          onDelete={(c) => {
            setCompanyToDelete(c);
            setDeleteConfirmOpen(true);
          }}
          onAdd={() => navigate('/admin/mastersettings/companies/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (companyToDelete) {
            await deleteCompany(companyToDelete.companyId!);
            successNotification(companyToDelete.companyName + ' company deleted successfully!');
            fetchData();
          }
        }}
        title="Delete Company"
        message={`Are you sure you want to delete ${companyToDelete?.companyName} company? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  );
}