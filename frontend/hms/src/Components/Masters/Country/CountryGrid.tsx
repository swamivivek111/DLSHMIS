import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country } from '../../Types/Country';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteCountry, getCountry } from '../../../Services/CountryServices';

const PAGE_SIZE = 10;

export default function CountryGrid() {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getCountry(page, PAGE_SIZE, search);
      setCountrys(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load countrys');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<Country>
      data={countrys}
      columns={[
        { key: 'countryName', label: 'Country' },
        { key: 'countryCode', label: 'Code' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/countrys/view/${d.countryId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/countrys/edit/${d.countryId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.countryName+' country?')) {
          await deleteCountry(d.countryId);
          successNotification(d.countryName+' country deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/countrys/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
