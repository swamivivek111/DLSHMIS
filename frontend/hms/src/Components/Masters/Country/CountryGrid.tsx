import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Country Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/countrys/add')}
          >
            Add Country
          </Button>
        </div>

        <DataTable<Country>
          data={countrys}
          columns={[
            { key: 'countryName', label: 'Country' },
            { key: 'countryCode', label: 'Code' },
            { 
              key: 'active', 
              label: 'Status',
              render: (country: Country) => (
                <Badge color={country.active ? 'green' : 'red'} size="sm">
                  {country.active ? 'Active' : 'Inactive'}
                </Badge>
              )
            },
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
      </div>
    </motion.div>
  );
}