import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Grid, Paper, Text, Title } from '@mantine/core';
import { errorNotification } from '../../../Utility/NotificationUtil';
import { ServiceTypeService } from '../../../Services/ServiceTypeService';
import { ServiceClassService } from '../../../Services/ServiceClassService';

interface ServiceType {
  serviceTypeId: number;
  serviceClassName: number;
  serviceClassTypeName: string;
  createdAt: string;
  updatedAt: string;
}

export default function ServiceTypeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviceClasses, setServiceClasses] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadServiceClasses();
    if (id) {
      loadServiceType();
    }
  }, [id]);

  const loadServiceClasses = async () => {
    try {
      const classes = await ServiceClassService.getAllServiceClasses();
      const classMap: { [key: number]: string } = {};
      classes.forEach((cls: any) => {
        classMap[cls.serviceClassId] = cls.serviceClassName;
      });
      setServiceClasses(classMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const loadServiceType = async () => {
    try {
      setLoading(true);
      const serviceType = await ServiceTypeService.getServiceTypeById(Number(id));
      setServiceType(serviceType);
    } catch {
      errorNotification('Failed to load service type');
      navigate('/admin/mastersettings/service-types');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Loading...</Text>
        </div>
      </motion.div>
    );
  }

  if (!serviceType) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Service type not found</Text>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Service Type Details
        </h2>

        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Service Type ID</Text>
            <Text>{serviceType.serviceTypeId}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Service Class</Text>
            <Text>{serviceClasses[serviceType.serviceClassName] || `ID: ${serviceType.serviceClassName}`}</Text>
          </Grid.Col>

          <Grid.Col span={12}>
            <Text fw={500} mb="xs">Service Class Type Name</Text>
            <Text>{serviceType.serviceClassTypeName}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Created At</Text>
            <Text>{serviceType.createdAt ? new Date(serviceType.createdAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">Updated At</Text>
            <Text>{serviceType.updatedAt ? new Date(serviceType.updatedAt).toLocaleString() : 'N/A'}</Text>
          </Grid.Col>
        </Grid>

        <div className="xl:col-span-2 flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/service-types/edit/${serviceType.serviceTypeId}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/service-types')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}