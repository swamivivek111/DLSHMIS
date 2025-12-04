import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">City Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/citys/add')}
          >
            Add City
          </Button>
        </div>

        <DataTable<City>
          data={citys}
          columns={[
            { key: 'cityName', label: 'City Name' },
            { key: 'pinCode', label: 'Pin Code' },
            { 
              key: 'active', 
              label: 'Status',
              render: (city: City) => (
                <Badge color={city.active ? 'green' : 'red'} size="sm">
                  {city.active ? 'Active' : 'Inactive'}
                </Badge>
              )
            },
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
      </div>
    </motion.div>
  );
}