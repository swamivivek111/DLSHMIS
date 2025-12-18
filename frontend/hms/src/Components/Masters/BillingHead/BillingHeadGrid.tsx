import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { BillingHeadService } from '../../../Services/BillingHeadService';

interface BillingHead {
  billingHeadId: number;
  billingHeadName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function BillingHeadGrid() {
  const [billingHeads, setBillingHeads] = useState<BillingHead[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const allBillingHeads = await BillingHeadService.getAllBillingHeads();
      
      // Filter by search
      const filteredBillingHeads = search 
        ? allBillingHeads.filter((billingHead: BillingHead) =>
            billingHead.billingHeadName?.toLowerCase().includes(search.toLowerCase())
          )
        : allBillingHeads;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedBillingHeads = filteredBillingHeads.slice(startIndex, endIndex);
      
      setBillingHeads(paginatedBillingHeads);
      setTotalPages(Math.ceil(filteredBillingHeads.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load billing heads');
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
          <h2 className="text-2xl font-bold text-gray-800">Billing Head Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/billing-heads/add')}
          >
            Add Billing Head
          </Button>
        </div>

        <DataTable<BillingHead>
          data={billingHeads}
          columns={[
            { key: 'billingHeadName', label: 'Billing Head Name' },
            { 
              key: 'isActive', 
              label: 'Status',
              render: (value: boolean) => (
                <Badge color={value ? 'green' : 'red'}>
                  {value ? 'Active' : 'Inactive'}
                </Badge>
              )
            },
            { key: 'createdAt', label: 'Created At', render: (value: string) => new Date(value).toLocaleDateString() },
            { key: 'updatedAt', label: 'Updated At', render: (value: string) => value ? new Date(value).toLocaleDateString() : 'N/A' },
          ]}
          onView={(b) => b?.billingHeadId && navigate(`/admin/mastersettings/billing-heads/view/${b.billingHeadId}`)}
          onEdit={(b) => b?.billingHeadId && navigate(`/admin/mastersettings/billing-heads/edit/${b.billingHeadId}`)}
          onDelete={async (b) => {
            if (b?.billingHeadId && confirm(`Delete ${b.billingHeadName}?`)) {
              await BillingHeadService.deleteBillingHead(b.billingHeadId);
              successNotification(`${b.billingHeadName} deleted successfully!`);
              fetchData();
            }
          }}
          onAdd={() => navigate('/admin/mastersettings/billing-heads/add')}
          canExport
          pagination={{ page, total: totalPages, onPageChange: setPage }}
          search={{ value: search, onChange: setSearch }}
        />
      </div>
    </motion.div>
  );
}