import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { City } from '../../Types/City';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deleteCity, getCity } from '../../../Services/CityServices';

const PAGE_SIZE = 10;

export default function CityGrid() {
  const [citys, setCitys] = useState<City[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getCity(page, PAGE_SIZE, search);
      setCitys(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load citys');
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <DataTable<City>
      data={citys}
      columns={[
        { key: 'cityName', label: 'City Name' },
        { key: 'pinCode', label: 'Pin Code' },
      ]}
      onView={(d) => navigate(`/admin/mastersettings/citys/view/${d.cityId}`)}
      onEdit={(d) => navigate(`/admin/mastersettings/citys/edit/${d.cityId}`)}
      onDelete={async (d) => {
        if (confirm('Delete '+d.cityName+' city?')) {
          await deleteCity(d.cityId);
          successNotification(d.cityName+' city deleted successfully!');
          fetchData();
        }
      }}
      onAdd={() => navigate('/admin/mastersettings/citys/add')}
      canExport
      pagination={{ page, total: totalPages, onPageChange: setPage }}
      search={{ value: search, onChange: setSearch }}
    />
  );
}
