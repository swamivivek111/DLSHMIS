import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { SourceService } from '../../../Services/SourceService';
import ConfirmDialog from '../../Common/ConfirmDialog';

interface Source {
  sourceId: number;
  sourceName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 10;

export default function SourceGrid() {
  const [sources, setSources] = useState<Source[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState<Source | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await SourceService.getAllSources();
      const allSources = res.sources || [];
      
      // Filter by search
      const filteredSources = search 
        ? allSources.filter((source: Source) =>
            source.sourceName?.toLowerCase().includes(search.toLowerCase()) ||
            source.description?.toLowerCase().includes(search.toLowerCase())
          )
        : allSources;
      
      // Pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedSources = filteredSources.slice(startIndex, endIndex);
      
      setSources(paginatedSources);
      setTotalPages(Math.ceil(filteredSources.length / PAGE_SIZE));
    } catch {
      errorNotification('Failed to load sources');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleDelete = async (source: Source) => {
    try {
      await SourceService.deleteSource(source.sourceId);
      successNotification(`${source.sourceName} deleted successfully!`);
      fetchData();
    } catch {
      errorNotification('Failed to delete source');
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
          <h2 className="text-2xl font-bold text-gray-800">Source Master</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/sources/add')}
          >
            Add Source
          </Button>
        </div>

        <DataTable<Source>
        data={sources}
        columns={[
          { key: 'sourceName', label: 'Source Name' },
          { key: 'description', label: 'Description' },
          { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
          { key: 'updatedAt', label: 'Updated At', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : 'N/A' },
        ]}
        onView={(s) => navigate(`/admin/mastersettings/sources/view/${s.sourceId}`)}
        onEdit={(s) => navigate(`/admin/mastersettings/sources/edit/${s.sourceId}`)}
        onDelete={(s) => {
          setSourceToDelete(s);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/sources/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (sourceToDelete) {
            await handleDelete(sourceToDelete);
          }
        }}
        title="Delete Source"
        message={`Are you sure you want to delete ${sourceToDelete?.sourceName} source? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}