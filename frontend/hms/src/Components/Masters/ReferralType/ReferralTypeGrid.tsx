import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ReferralTypeService } from '../../../Services/ReferralTypeService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ReferralType {
  referralTypeId: number;
  referralTypeName: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ReferralTypeGrid() {
  const [referralTypes, setReferralTypes] = useState<ReferralType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<ReferralType | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await ReferralTypeService.getAllReferralTypes();
      const allTypes = res.referralTypes || [];
      
      // Filter by search
      const filteredTypes = search 
        ? allTypes.filter((type: ReferralType) =>
            type.referralTypeName?.toLowerCase().includes(search.toLowerCase())
          )
        : allTypes;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedTypes = filteredTypes.slice(startIndex, endIndex);
      
      setReferralTypes(paginatedTypes);
      setTotalPages(Math.ceil(filteredTypes.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load referral types');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (type: ReferralType) => {
    try {
      await ReferralTypeService.deleteReferralType(type.referralTypeId);
      successNotification(`${type.referralTypeName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete referral type');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Referral Type Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/referral-types/add')}
          >
            Add Referral Type
          </Button>
        </div>

        <DataTable<ReferralType>
        data={referralTypes}
        columns={[
          { key: 'referralTypeName', label: 'Referral Type Name' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(t) => navigate(`/admin/mastersettings/referral-types/view/${t.referralTypeId}`)}
        onEdit={(t) => navigate(`/admin/mastersettings/referral-types/edit/${t.referralTypeId}`)}
        onDelete={(t) => {
          setTypeToDelete(t);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/referral-types/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (typeToDelete) {
            await handleDelete(typeToDelete);
          }
        }}
        title="Delete Referral Type"
        message={`Are you sure you want to delete ${typeToDelete?.referralTypeName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}