import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, Badge, Button, Grid } from '@mantine/core';
import { motion } from 'framer-motion';
import { Company } from '../../Types/Company';
import { getCompanyById } from '../../../Services/CompanyServices';
import { errorNotification } from '../../../Utility/NotificationUtil';

export default function CompanyView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getCompanyById(Number(id));
          setCompany(data);
        } catch {
          errorNotification('Company not found');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Loading...</Text>
        </div>
      </motion.div>
    );
  }

  if (!company) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Text>Company not found</Text>
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
          {company.companyName} Company
        </h2>

        <Grid gutter="sm" className="text-sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Company Name:</strong> {company.companyName}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text className="bg-blue-50 px-2 py-1 rounded">
              <strong>Company Code:</strong> {company.companyCode}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Patient Category:</strong> <Badge color="blue" variant="light">{company.companyType}</Badge>
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge color={company.isActive ? 'green' : 'red'} variant="light">
                {company.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Email:</strong> {company.email || 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Phone:</strong> {company.phone || 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Effective From:</strong> {company.effectiveFrom ? new Date(company.effectiveFrom).toLocaleDateString() : 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Effective To:</strong> {company.effectiveTo ? new Date(company.effectiveTo).toLocaleDateString() : 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Organization Percentage:</strong> {company.orgPercentage}%
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Employee Percentage:</strong> {company.empPercentage}%
            </Text>
          </Grid.Col>
          
          <Grid.Col span={12}>
            <Text>
              <strong>Address:</strong> {company.address || 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Created At:</strong> {company.createdAt ? new Date(company.createdAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Text>
              <strong>Updated At:</strong> {company.updatedAt ? new Date(company.updatedAt).toLocaleString() : 'N/A'}
            </Text>
          </Grid.Col>
        </Grid>

        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button
            onClick={() => navigate(`/admin/mastersettings/companies/edit/${id}`)}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Edit
          </Button>
          <Button
            variant="subtle"
            onClick={() => navigate('/admin/mastersettings/companies')}
            className="bg-[#202A44] text-white hover:bg-[#1a2236]"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
}