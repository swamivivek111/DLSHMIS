import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { District } from '../../Types/District';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDistrict, getDistrict } from '../../../Services/DistrictServices';

const PAGE_SIZE = 10;

export default function DistrictGrid() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDistrict(page, PAGE_SIZE, search);
      setDistricts(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load districts');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<District>
      data={districts}
      columns={[
        { key: 'districtId', label: 'District Id' },
        { key: 'districtName', label: 'District Name' },
        { key: 'stateId', label: 'State Id' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/districts/view/${d.districtId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/districts/edit/${d.districtId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.districtName+' district?')) {
          await deleteDistrict(d.districtId);
          successNotification(d.districtName+' district deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/districts/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 