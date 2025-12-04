import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Group, Paper, Text, Title } from '@mantine/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { ServiceClassService } from '../../../Services/ServiceClassService';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function ServiceClassView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceClass, setServiceClass] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadServiceClass();
    }
  }, [id]);

  const loadServiceClass = async () => {
    try {
      setLoading(true);
      const data = await ServiceClassService.getServiceClassById(Number(id));
      setServiceClass(data);
    } catch {
      errorNotification('Failed to load service class');
      navigate('/admin/mastersettings/service-classes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Loading...</div>
        </div>
      </motion.div>
    );
  }

  if (!serviceClass) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Service class not found</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Service Class Details</h2>
          <div className="flex gap-2">
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/admin/mastersettings/service-classes/edit/${id}`)}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Edit
            </Button>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-classes')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text size="sm" c="dimmed">Service Class ID</Text>
            <Text size="lg" fw={500}>{serviceClass.serviceClassId}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Service Class Name</Text>
            <Text size="lg" fw={500}>{serviceClass.serviceClassName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Status</Text>
            <Text size="lg" fw={500}>{serviceClass.isActive ? 'Active' : 'Inactive'}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="lg" fw={500}>{new Date(serviceClass.createdAt).toLocaleString()}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text size="lg" fw={500}>
              {serviceClass.updatedAt ? new Date(serviceClass.updatedAt).toLocaleString() : 'Not updated'}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
}