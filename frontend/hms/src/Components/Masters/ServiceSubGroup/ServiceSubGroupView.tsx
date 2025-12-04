import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Group, Paper, Text, Title } from '@mantine/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { ServiceSubGroupService } from '../../../Services/ServiceSubGroupService';
import { WardGroupService } from '../../../Services/WardGroupService';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function ServiceSubGroupView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceSubGroup, setServiceSubGroup] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [wardGroups, setWardGroups] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadWardGroups();
    if (id) {
      loadServiceSubGroup();
    }
  }, [id]);

  const loadWardGroups = async () => {
    try {
      const groups = await WardGroupService.getAllWardGroups();
      const groupMap: { [key: number]: string } = {};
      groups.forEach((group: any) => {
        groupMap[group.wardGroupId] = group.wardGroupName;
      });
      setWardGroups(groupMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const loadServiceSubGroup = async () => {
    try {
      setLoading(true);
      const data = await ServiceSubGroupService.getServiceSubGroupById(Number(id));
      setServiceSubGroup(data);
    } catch {
      errorNotification('Failed to load service sub group');
      navigate('/admin/mastersettings/service-sub-groups');
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

  if (!serviceSubGroup) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Service sub group not found</div>
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
          <h2 className="text-2xl font-bold text-gray-800">Service Sub Group Details</h2>
          <div className="flex gap-2">
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/admin/mastersettings/service-sub-groups/edit/${id}`)}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Edit
            </Button>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-sub-groups')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text size="sm" c="dimmed">Sub Group ID</Text>
            <Text size="lg" fw={500}>{serviceSubGroup.subGroupId}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Group</Text>
            <Text size="lg" fw={500}>{wardGroups[serviceSubGroup.groupId] || `ID: ${serviceSubGroup.groupId}`}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Sub Group Name</Text>
            <Text size="lg" fw={500}>{serviceSubGroup.subGroupName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Status</Text>
            <Text size="lg" fw={500}>{serviceSubGroup.status}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="lg" fw={500}>{new Date(serviceSubGroup.createdAt).toLocaleString()}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text size="lg" fw={500}>
              {serviceSubGroup.updatedAt ? new Date(serviceSubGroup.updatedAt).toLocaleString() : 'Not updated'}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
}