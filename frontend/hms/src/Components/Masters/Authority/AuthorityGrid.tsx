import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '@mantine/core';
import { Authority } from '../../Types/Authority';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteAuthority, getAuthority } from '../../../Services/AuthorityServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

const PAGE_SIZE = 10;

export default function AuthorityGrid() {
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [authorityToDelete, setAuthorityToDelete] = useState<Authority | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getAuthority(page, PAGE_SIZE, search);
      setAuthorities(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load authorities');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div>
      <Title order={2} className="text-gray-800 mb-6">
        Authority Management
      </Title>
      <DataTable<Authority>
        data={authorities}
        columns={[
          { key: 'authorityName', label: 'Authority Name' },
          { key: 'authorityCode', label: 'Code' },
          { key: 'approvalLimit', label: 'Approval Limit' },
        ]}
        onView={(a) => navigate(`/admin/mastersettings/authorities/view/${a.authorityId}`)}
        onEdit={(a) => navigate(`/admin/mastersettings/authorities/edit/${a.authorityId}`)}
        onDelete={(a) => {
          setAuthorityToDelete(a);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/authorities/add')}
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
        title="Authority"
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (authorityToDelete) {
            await deleteAuthority(authorityToDelete.authorityId!);
            successNotification(authorityToDelete.authorityName + ' deleted successfully!');
            fetchData();
          }
        }}
        title="Delete Authority"
        message={`Are you sure you want to delete ${authorityToDelete?.authorityName}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}