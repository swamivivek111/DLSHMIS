import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleMaster } from '../../Types/Title';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteTitle, getTitle } from '../../../Services/TitleServices';

const PAGE_SIZE = 10;

export default function TitleGrid() {
  const [titles, setTitles] = useState<TitleMaster[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTitle(page, PAGE_SIZE, search);
      setTitles(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load titles');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<TitleMaster>
      data={titles}
      columns={[
        { key: 'titleName', label: 'Title Name' },
        { key: 'gender', label: 'Gender' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/titles/view/${d.titleId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/titles/edit/${d.titleId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.titleName+' title?')) {
          await deleteTitle(d.titleId);
          successNotification(d.titleName+' title deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/titles/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 