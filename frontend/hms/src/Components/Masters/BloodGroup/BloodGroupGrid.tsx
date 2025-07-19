import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BloodGroup } from '../../Types/BloodGroup';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteBloodGroup, getBloodGroup } from '../../../Services/BloodGroupServices';

const PAGE_SIZE = 10;

export default function BloodGroupGrid() {
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getBloodGroup(page, PAGE_SIZE, search);
      setBloodGroups(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load bloodGroups');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<BloodGroup>
      data={bloodGroups}
      columns={[
        { key: 'bloodGroup', label: 'BloodGroup' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/bloodGroups/view/${d.bloodGroupId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/bloodGroups/edit/${d.bloodGroupId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.bloodGroup+' bloodGroup?')) {
          await deleteBloodGroup(d.bloodGroupId);
          successNotification(d.bloodGroup+' bloodGroup deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/bloodGroups/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 