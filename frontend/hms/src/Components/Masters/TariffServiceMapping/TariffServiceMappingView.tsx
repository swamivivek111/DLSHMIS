import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Group, Paper, Text, Title } from '@mantine/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { TariffServiceMappingService } from '../../../Services/TariffServiceMappingService';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function TariffServiceMappingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mapping, setMapping] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadMapping();
    }
  }, [id]);

  const loadMapping = async () => {
    try {
      setLoading(true);
      const data = await TariffServiceMappingService.getTariffServiceMappingById(Number(id));
      setMapping(data);
    } catch {
      errorNotification('Failed to load tariff service mapping');
      navigate('/admin/mastersettings/tariff-service-mappings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mapping) {
    return <div>Tariff service mapping not found</div>;
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
          <h2 className="text-2xl font-bold text-gray-800">Tariff Service Mapping Details</h2>
          <div className="flex gap-2">
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/admin/mastersettings/tariff-service-mappings/edit/${id}`)}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Edit
            </Button>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/tariff-service-mappings')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text size="sm" c="dimmed">ID</Text>
            <Text size="lg" fw={500}>{mapping.id}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Default Tariff Name</Text>
            <Text size="lg" fw={500}>{mapping.defaultTariffName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Get Services</Text>
            <Text size="lg" fw={500}>{mapping.getServices}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Service Name</Text>
            <Text size="lg" fw={500}>{mapping.serviceName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Corporate Service Name</Text>
            <Text size="lg" fw={500}>{mapping.corporateServiceName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Quantity</Text>
            <Text size="lg" fw={500}>{mapping.qty || 'N/A'}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Base Rate</Text>
            <Text size="lg" fw={500}>{mapping.baseRate || 0}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Company Tariff Rate</Text>
            <Text size="lg" fw={500}>{mapping.companyTariffRate || 0}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Discount Percentage</Text>
            <Text size="lg" fw={500}>{mapping.discountPerc || 0}%</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Discount Amount</Text>
            <Text size="lg" fw={500}>{mapping.discountAmount || 0}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Status</Text>
            <Text size="lg" fw={500}>{mapping.isActive ? 'Active' : 'Inactive'}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="lg" fw={500}>{new Date(mapping.createdAt).toLocaleString()}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text size="lg" fw={500}>
              {mapping.updatedAt ? new Date(mapping.updatedAt).toLocaleString() : 'Not updated'}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
}