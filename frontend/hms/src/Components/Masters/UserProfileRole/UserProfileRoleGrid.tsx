import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfileRole } from '../../Types/UserProfileRole';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteUserProfileRole, getUserProfileRole } from '../../../Services/UserProfileRoleServices';

const PAGE_SIZE = 10;

export default function UserProfileRoleGrid() {
  const [userProfileRoles, setUserProfileRoles] = useState<UserProfileRole[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getUserProfileRole(page, PAGE_SIZE, search);
      setUserProfileRoles(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load userProfileRoles');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<UserProfileRole>
      data={userProfileRoles}
      columns={[
        { key: 'roleId', label: 'Role Id' },
        { key: 'roleName', label: 'Role Name' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/userProfileRoles/view/${d.roleId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/userProfileRoles/edit/${d.roleId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.roleName+' userProfileRole?')) {
          await deleteUserProfileRole(d.roleId);
          successNotification(d.roleName+' userProfileRole deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/userProfileRoles/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 