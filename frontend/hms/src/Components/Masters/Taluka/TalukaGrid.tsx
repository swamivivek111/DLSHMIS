import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Taluka } from '../../Types/Taluka';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteTaluka, getTaluka } from '../../../Services/TalukaServices';

const PAGE_SIZE = 10;

export default function TalukaGrid() {
  const [talukas, setTalukas] = useState<Taluka[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTaluka(page, PAGE_SIZE, search);
      setTalukas(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load talukas');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Taluka>
      data={talukas}
      columns={[
        { key: 'talukaName', label: 'Taluka Name' },
        { key: 'talukaCode', label: 'Taluka Code' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/talukas/view/${d.talukaId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/talukas/edit/${d.talukaId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.talukaName+' taluka?')) {
          await deleteTaluka(d.talukaId);
          successNotification(d.talukaName+' taluka deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/talukas/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 