import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container, Group, Paper, Text, Title, Tabs } from '@mantine/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { ServiceMasterService } from '../../../Services/ServiceMasterService';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function ServiceMasterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      setLoading(true);
      const data = await ServiceMasterService.getServiceById(Number(id));
      setService(data);
    } catch {
      errorNotification('Failed to load service');
      navigate('/admin/mastersettings/services');
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

  if (!service) {
    return (
      <motion.div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>Service not found</div>
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
          <h2 className="text-2xl font-bold text-gray-800">Service Details</h2>
          <div className="flex gap-2">
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={() => navigate(`/admin/mastersettings/services/edit/${id}`)}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Edit
            </Button>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="subtle"
              onClick={() => navigate('/admin/mastersettings/services')}
              className="bg-[#202A44] text-white hover:bg-[#1a2236]"
            >
              Back
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic">
          <Tabs.List>
            <Tabs.Tab value="basic">Basic Info</Tabs.Tab>
            <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
            <Tabs.Tab value="additional">Additional</Tabs.Tab>
            <Tabs.Tab value="options">Options</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Text size="sm" c="dimmed">Tariff ID</Text>
              <Text size="lg" fw={500}>{service.tariffId}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Service Name</Text>
              <Text size="lg" fw={500}>{service.serviceName}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Display Name</Text>
              <Text size="lg" fw={500}>{service.displayName || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Service Group ID</Text>
              <Text size="lg" fw={500}>{service.serviceGroupId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Service Sub Group ID</Text>
              <Text size="lg" fw={500}>{service.serviceSubGroupId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Service Class ID</Text>
              <Text size="lg" fw={500}>{service.serviceClassId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Service Type</Text>
              <Text size="lg" fw={500}>{service.serviceType || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Applicable For</Text>
              <Text size="lg" fw={500}>{service.applicableFor || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Billing Process</Text>
              <Text size="lg" fw={500}>{service.billingProcess || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Billing Head ID</Text>
              <Text size="lg" fw={500}>{service.billingHeadId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Effect From</Text>
              <Text size="lg" fw={500}>{service.effectFrom ? new Date(service.effectFrom).toLocaleDateString() : 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Effect To</Text>
              <Text size="lg" fw={500}>{service.effectTo ? new Date(service.effectTo).toLocaleDateString() : 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Status</Text>
              <Text size="lg" fw={500}>{service.status}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Created At</Text>
              <Text size="lg" fw={500}>{service.createdAt ? new Date(service.createdAt).toLocaleString() : 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Updated At</Text>
              <Text size="lg" fw={500}>{service.updatedAt ? new Date(service.updatedAt).toLocaleString() : 'N/A'}</Text>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="pricing" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Text size="sm" c="dimmed">OPD Service Price</Text>
              <Text size="lg" fw={500}>{service.opdServicePrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Emergency Price</Text>
              <Text size="lg" fw={500}>{service.opdEmergencyPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Hospital Share %</Text>
              <Text size="lg" fw={500}>{service.opdHospitalSharePct || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Hospital Price</Text>
              <Text size="lg" fw={500}>{service.opdHospitalPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Hospital Emergency Price</Text>
              <Text size="lg" fw={500}>{service.opdHospitalEmergencyPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Doctor Price</Text>
              <Text size="lg" fw={500}>{service.opdDoctorPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">OPD Doctor Share %</Text>
              <Text size="lg" fw={500}>{service.opdDoctorSharePct || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Ward Group ID</Text>
              <Text size="lg" fw={500}>{service.wardGroupNameId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">IPD Normal Price</Text>
              <Text size="lg" fw={500}>{service.ipdNormalPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">IPD Doctor Share Price</Text>
              <Text size="lg" fw={500}>{service.ipdDoctorSharePrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">IPD Emergency Price</Text>
              <Text size="lg" fw={500}>{service.ipdEmergencyPrice || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">IPD Doctor Share %</Text>
              <Text size="lg" fw={500}>{service.ipdDoctorShare || 0}</Text>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="additional" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Text size="sm" c="dimmed">Universal Code</Text>
              <Text size="lg" fw={500}>{service.universalCode || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Having Universal Code</Text>
              <Text size="lg" fw={500}>{service.isHavingUniversalCode ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Min Amount</Text>
              <Text size="lg" fw={500}>{service.minAmt || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Max Amount</Text>
              <Text size="lg" fw={500}>{service.maxAmt || 0}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Price Caps</Text>
              <Text size="lg" fw={500}>{service.isPriceCaps ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Tax ID</Text>
              <Text size="lg" fw={500}>{service.taxId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Tax Percentage</Text>
              <Text size="lg" fw={500}>{service.taxPercentage || 0}%</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Active</Text>
              <Text size="lg" fw={500}>{service.isActive ? 'Yes' : 'No'}</Text>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="options" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Text size="sm" c="dimmed">Is Quantity Editable</Text>
              <Text size="lg" fw={500}>{service.isQtyEditable ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Diet</Text>
              <Text size="lg" fw={500}>{service.isDiet ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Non-Consumable Required</Text>
              <Text size="lg" fw={500}>{service.isNonConsumableRequired ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Normal Service Charges</Text>
              <Text size="lg" fw={500}>{service.isNormalServiceCharges ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Price Editable</Text>
              <Text size="lg" fw={500}>{service.isPriceEditable ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Emergency Service Charges</Text>
              <Text size="lg" fw={500}>{service.isEmergencyServiceCharges ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Doctor Required</Text>
              <Text size="lg" fw={500}>{service.isDoctorRequired ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Treatment Room Procedure</Text>
              <Text size="lg" fw={500}>{service.isTreatmentRoom ? 'Yes' : 'No'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Is Doctor Share Required</Text>
              <Text size="lg" fw={500}>{service.isDoctorShareRequired ? 'Yes' : 'No'}</Text>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </motion.div>
  );
}