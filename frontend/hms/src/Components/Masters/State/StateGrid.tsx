import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { State } from '../../Types/State';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteState, getState } from '../../../Services/StateServices';

const PAGE_SIZE = 10;

export default function StateGrid() {
  const [states, setStates] = useState<State[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getState(page, PAGE_SIZE, search);
      setStates(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load states');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<State>
      data={states}
      columns={[
        { key: 'stateName', label: 'State Name' },
        { key: 'stateCode', label: 'State Code' },
        { key: 'countryName', label: 'Country Name'},
      ]}
      onView={(d) => navigate(`/admin/mastersettings/states/view/${d.stateId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/states/edit/${d.stateId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.stateName+' state?')) {
          await deleteState(d.stateId);
          successNotification(d.stateName+' state deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/states/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
