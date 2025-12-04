import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PatientCategory } from '../../Types/PatientCategory';
import DataTable from '../../DataTable/DataTable';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { deletePatientCategory, getPatientCategory } from '../../../Services/PatientCategoryServices';
import ConfirmDialog from '../../Common/ConfirmDialog';

const PAGE_SIZE = 10;

export default function PatientCategoryGrid() {
  const [categories, setCategories] = useState<PatientCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<PatientCategory | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getPatientCategory(page, PAGE_SIZE, search);
      setCategories(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification('Failed to load patient categories');
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
          <h2 className="text-2xl font-bold text-gray-800">Patient Category Management</h2>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => navigate('/admin/mastersettings/patient-categories/add')}
          >
            Add Patient Category
          </Button>
        </div>

        <DataTable<PatientCategory>
        data={categories}
        columns={[
          { key: 'categoryName', label: 'Category Name' },
          { key: 'categoryCode', label: 'Code' },
          { key: 'discountPercentage', label: 'Discount %' },
          { key: 'description', label: 'Description' },
        ]}
        onView={(c) => navigate(`/admin/mastersettings/patient-categories/view/${c.categoryId}`)}
        onEdit={(c) => navigate(`/admin/mastersettings/patient-categories/edit/${c.categoryId}`)}
        onDelete={(c) => {
          setCategoryToDelete(c);
          setDeleteConfirmOpen(true);
        }}
        onAdd={() => navigate('/admin/mastersettings/patient-categories/add')}
        title="Patient Category"
        canExport
        pagination={{ page, total: totalPages, onPageChange: setPage }}
        search={{ value: search, onChange: setSearch }}
      />
      
      <ConfirmDialog
        opened={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={async () => {
          if (categoryToDelete) {
            await deletePatientCategory(categoryToDelete.categoryId!);
            successNotification(categoryToDelete.categoryName + ' deleted successfully!');
            fetchData();
          }
        }}
        title="Delete Patient Category"
        message={`Are you sure you want to delete ${categoryToDelete?.categoryName}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      </div>
    </motion.div>
  );
}