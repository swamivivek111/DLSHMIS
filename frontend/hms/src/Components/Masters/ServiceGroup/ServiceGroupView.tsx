import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Group, Paper, Text, Title } from '@mantine/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { ServiceGroupService } from '../../../Services/ServiceGroupService';
import { DepartmentServices } from '../../../Services/DepartmentServices';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function ServiceGroupView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceGroup, setServiceGroup] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadDepartments();
    if (id) {
      loadServiceGroup();
    }
  }, [id]);

  const loadDepartments = async () => {
    try {
      const response = await DepartmentServices.getAllDepartments();
      const deptList = response.departments || response;
      const deptMap: { [key: number]: string } = {};
      deptList.forEach((dept: any) => {
        deptMap[dept.id] = dept.name;
      });
      setDepartments(deptMap);
    } catch {
      // Ignore error, will show ID instead
    }
  };

  const loadServiceGroup = async () => {
    try {
      setLoading(true);
      const data = await ServiceGroupService.getServiceGroupById(Number(id));
      setServiceGroup(data);
    } catch {
      errorNotification('Failed to load service group');
      navigate('/admin/mastersettings/service-groups');
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

  if (!serviceGroup) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Service group not found</div>
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
          <h2 className="text-2xl font-bold text-gray-800">Service Group Details</h2>
          <div className="flex gap-2">
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/admin/mastersettings/service-groups/edit/${id}`)}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Edit
            </Button>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/service-groups')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text size="sm" c="dimmed">Group ID</Text>
            <Text size="lg" fw={500}>{serviceGroup.groupId}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Group Name</Text>
            <Text size="lg" fw={500}>{serviceGroup.groupName}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Department</Text>
            <Text size="lg" fw={500}>{departments[serviceGroup.departmentId] || `ID: ${serviceGroup.departmentId}`}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Result Required</Text>
            <Text size="lg" fw={500}>{serviceGroup.isResultRequired ? 'Yes' : 'No'}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Status</Text>
            <Text size="lg" fw={500}>{serviceGroup.status}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Created At</Text>
            <Text size="lg" fw={500}>{new Date(serviceGroup.createdAt).toLocaleString()}</Text>
          </div>
          
          <div>
            <Text size="sm" c="dimmed">Updated At</Text>
            <Text size="lg" fw={500}>
              {serviceGroup.updatedAt ? new Date(serviceGroup.updatedAt).toLocaleString() : 'Not updated'}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  );
}