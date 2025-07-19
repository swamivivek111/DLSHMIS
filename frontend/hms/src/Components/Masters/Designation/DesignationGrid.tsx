import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Designation } from '../../Types/Designation';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteDesignation, getDesignation } from '../../../Services/DesignationServices';

const PAGE_SIZE = 10;

export default function DesignationGrid() {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDesignation(page, PAGE_SIZE, search);
      setDesignations(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load designations');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Designation>
      data={designations}
      columns={[
        { key: 'designationName', label: 'Designation Name' },
        { key: 'description', label: 'Description' },
        { key: 'designationCode', label: 'Designation Code' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/designations/view/${d.designationId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/designations/edit/${d.designationId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.designationName+' designation?')) {
          await deleteDesignation(d.designationId);
          successNotification(d.designationName+' designation deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/designations/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
 