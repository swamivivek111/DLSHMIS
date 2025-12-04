import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { ReferralNameService } from '../../../Services/ReferralNameService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface ReferralName {
  referralNameId: number;
  referralTypeId: number;
  referralName: string;
  referralAddress: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function ReferralNameGrid() {
  const [referralNames, setReferralNames] = useState<ReferralName[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [referralToDelete, setReferralToDelete] = useState<ReferralName | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await ReferralNameService.getAllReferralNames();
      const allReferrals = res.referralNames || [];
      
      // Filter by search
      const filteredReferrals = search 
        ? allReferrals.filter((referral: ReferralName) =>
            referral.referralName?.toLowerCase().includes(search.toLowerCase()) ||
            referral.referralAddress?.toLowerCase().includes(search.toLowerCase())
          )
        : allReferrals;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedReferrals = filteredReferrals.slice(startIndex, endIndex);
      
      setReferralNames(paginatedReferrals);
      setTotalPages(Math.ceil(filteredReferrals.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load referral names');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (referral: ReferralName) => {
    try {
      await ReferralNameService.deleteReferralName(referral.referralNameId);
      successNotification(`${referral.referralName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete referral name');
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
          <h2 className="text-2xl font-bold text-gray-800">Referral Name Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/referral-names/add')}
          >
            Add Referral Name
          </Button>
        </div>

        <DataTable<ReferralName>
        data={referralNames}
        columns={[
          { key: 'referralName', label: 'Referral Name' },
          { key: 'referralTypeId', label: 'Referral Type ID' },
          { key: 'referralAddress', label: 'Address' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(r) => navigate(`/admin/mastersettings/referral-names/view/${r.referralNameId}`)}
        onEdit={(r) => navigate(`/admin/mastersettings/referral-names/edit/${r.referralNameId}`)}
        onDelete={(r) => {
          setReferralToDelete(r);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/referral-names/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (referralToDelete) {
            await handleDelete(referralToDelete);
          }
        }}
        title="Delete Referral Name"
        message={`Are you sure you want to delete ${referralToDelete?.referralName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}