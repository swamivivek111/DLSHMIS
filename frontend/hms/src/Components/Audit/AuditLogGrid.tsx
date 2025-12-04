import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import { 
  Container, Paper, Title, Group, Button, Select, TextInput, 
  Badge, ActionIcon, Flex, Text, Card, Grid,
  Modal, Stack, NumberInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconDownload, IconFilter, IconRefresh, IconEye, IconFileExport } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuditLog {
  id: number;
  timestamp: string;
  operation: string;
  moduleName: string;
  microservice: string;
  userId?: number;
  userEmail?: string;
  userRole?: string;
  operationType: string;
  logLevel: string;
  entityType?: string;
  entityId?: number;
  status: string;
  description: string;
  ipAddress?: string;
}

interface AuditStats {
  totalLogs: number;
  operationTypeCounts: Record<string, number>;
  moduleCounts: Record<string, number>;
  logLevelCounts: Record<string, number>;
  recentActivity: number;
}

const AuditLogGrid: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [stats, setStats] = useState<AuditStats | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    operation: '',
    moduleName: '',
    microservice: '',
    userId: '',
    userEmail: '',
    logLevel: '',
    operationType: '',
    status: '',
    startDate: null as Date | null,
    endDate: null as Date | null
  });
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    operations: [] as string[],
    modules: [] as string[],
    microservices: [] as string[]
  });
  
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [detailsOpened, setDetailsOpened] = useState(false);

  const logLevelColors = {
    DEBUG: 'gray',
    INFO: 'blue',
    WARN: 'yellow',
    ERROR: 'red',
    CRITICAL: 'dark'
  };

  const statusColors = {
    SUCCESS: 'green',
    FAILED: 'red',
    PENDING: 'yellow'
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
    fetchFilterOptions();
  }, [page, pageSize, filters]);

  // Auto-refresh every 10 seconds to show latest logs
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLogs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const params = new URLSearchParams({
        page: (page - 1).toString(),
        size: pageSize.toString(),
        sortBy: 'id',
        sortDir: 'desc'
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === 'startDate' || key === 'endDate') {
            params.append(key, (value as Date).toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = await axios.get(`http://localhost:9000/audit/logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(response.data.content);
      setTotalRecords(response.data.totalElements);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch audit logs',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) return;
      
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
      
      const response = await axios.get(`http://localhost:9000/audit/stats?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) return;
      
      const headers = { Authorization: `Bearer ${token}` };
      
      const [operations, modules, microservices] = await Promise.all([
        axios.get('http://localhost:9000/audit/operations', { headers }),
        axios.get('http://localhost:9000/audit/modules', { headers }),
        axios.get('http://localhost:9000/audit/microservices', { headers })
      ]);
      
      setFilterOptions({
        operations: operations.data,
        modules: modules.data,
        microservices: microservices.data
      });
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const exportLogs = async (format: string = 'csv') => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const params = new URLSearchParams({ format });
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === 'startDate' || key === 'endDate') {
            params.append(key, (value as Date).toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = await axios.get(`http://localhost:9000/audit/logs/export?${params}`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit_logs_${new Date().getTime()}.${format}`;
      link.click();
      window.URL.revokeObjectURL(url);

      notifications.show({
        title: 'Success',
        message: 'Audit logs exported successfully',
        color: 'green'
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to export audit logs',
        color: 'red'
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      operation: '',
      moduleName: '',
      microservice: '',
      userId: '',
      userEmail: '',
      logLevel: '',
      operationType: '',
      status: '',
      startDate: null,
      endDate: null
    });
    setPage(1);
  };

  const columns = [
    {
      accessor: 'timestamp',
      title: 'Timestamp',
      width: 180,
      render: (log: AuditLog) => new Date(log.timestamp).toLocaleString()
    },
    {
      accessor: 'operation',
      title: 'Operation',
      width: 150
    },
    {
      accessor: 'moduleName',
      title: 'Module',
      width: 120
    },
    {
      accessor: 'microservice',
      title: 'Service',
      width: 120
    },
    {
      accessor: 'userEmail',
      title: 'User',
      width: 180,
      render: (log: AuditLog) => log.userEmail || 'System'
    },
    {
      accessor: 'operationType',
      title: 'Type',
      width: 120,
      render: (log: AuditLog) => (
        <Badge size="sm" variant="light">
          {log.operationType}
        </Badge>
      )
    },
    {
      accessor: 'logLevel',
      title: 'Level',
      width: 100,
      render: (log: AuditLog) => (
        <Badge size="sm" color={logLevelColors[log.logLevel as keyof typeof logLevelColors]}>
          {log.logLevel}
        </Badge>
      )
    },
    {
      accessor: 'status',
      title: 'Status',
      width: 100,
      render: (log: AuditLog) => (
        <Badge size="sm" color={statusColors[log.status as keyof typeof statusColors]}>
          {log.status}
        </Badge>
      )
    },
    {
      accessor: 'actions',
      title: 'Actions',
      width: 80,
      render: (log: AuditLog) => (
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            setSelectedLog(log);
            setDetailsOpened(true);
          }}
        >
          <IconEye size={16} />
        </ActionIcon>
      )
    }
  ];

  return (
    <Container size="xl" py="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper shadow="sm" p="md" mb="md">
          <Group justify="space-between" mb="md">
            <Title order={2}>Audit Logs</Title>
            <Group>
              <Button
                leftSection={<IconRefresh size={16} />}
                onClick={fetchLogs}
                loading={loading}
              >
                Refresh
              </Button>
              <Button
                leftSection={<IconFileExport size={16} />}
                onClick={() => exportLogs('csv')}
                variant="light"
              >
                Export CSV
              </Button>
            </Group>
          </Group>

          {/* Statistics Cards */}
          {stats && (
            <Grid mb="md">
              <Grid.Col span={3}>
                <Card withBorder>
                  <Text size="sm" c="dimmed">Total Logs</Text>
                  <Text size="xl" fw={700}>{stats.totalLogs.toLocaleString()}</Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card withBorder>
                  <Text size="sm" c="dimmed">Recent Activity (24h)</Text>
                  <Text size="xl" fw={700}>{stats.recentActivity.toLocaleString()}</Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card withBorder>
                  <Text size="sm" c="dimmed">Active Modules</Text>
                  <Text size="xl" fw={700}>{Object.keys(stats.moduleCounts).length}</Text>
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card withBorder>
                  <Text size="sm" c="dimmed">Error Rate</Text>
                  <Text size="xl" fw={700} c="red">
                    {((stats.logLevelCounts.ERROR || 0) / stats.totalLogs * 100).toFixed(1)}%
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          )}

          {/* Filters */}
          <Paper withBorder p="md" mb="md">
            <Group mb="md">
              <IconFilter size={16} />
              <Text fw={500}>Filters</Text>
              <Button size="xs" variant="subtle" onClick={clearFilters}>
                Clear All
              </Button>
            </Group>
            
            <Grid>
              <Grid.Col span={3}>
                <Select
                  label="Operation"
                  placeholder="Select operation"
                  data={filterOptions.operations}
                  value={filters.operation}
                  onChange={(value) => setFilters(prev => ({ ...prev, operation: value || '' }))}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Module"
                  placeholder="Select module"
                  data={filterOptions.modules}
                  value={filters.moduleName}
                  onChange={(value) => setFilters(prev => ({ ...prev, moduleName: value || '' }))}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Microservice"
                  placeholder="Select service"
                  data={filterOptions.microservices}
                  value={filters.microservice}
                  onChange={(value) => setFilters(prev => ({ ...prev, microservice: value || '' }))}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Log Level"
                  placeholder="Select level"
                  data={['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']}
                  value={filters.logLevel}
                  onChange={(value) => setFilters(prev => ({ ...prev, logLevel: value || '' }))}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="User Email"
                  placeholder="Enter user email"
                  value={filters.userEmail}
                  onChange={(e) => setFilters(prev => ({ ...prev, userEmail: e.target.value }))}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <NumberInput
                  label="User ID"
                  placeholder="Enter user ID"
                  value={filters.userId ? parseInt(filters.userId) : undefined}
                  onChange={(value) => setFilters(prev => ({ ...prev, userId: value?.toString() || '' }))}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DateInput
                  label="Start Date"
                  placeholder="Select start date"
                  value={filters.startDate}
                  onChange={(value) => setFilters(prev => ({ ...prev, startDate: value }))}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <DateInput
                  label="End Date"
                  placeholder="Select end date"
                  value={filters.endDate}
                  onChange={(value) => setFilters(prev => ({ ...prev, endDate: value }))}
                  clearable
                />
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Data Table */}
          <DataTable
            data={logs}
            columns={[
              { key: 'operation', label: 'Operation' },
              { key: 'userEmail', label: 'User' },
              { key: 'moduleName', label: 'Module' },
              { 
                key: 'operationType', 
                label: 'Action Type',
                render: (log: AuditLog) => (
                  <Badge 
                    size="sm" 
                    variant="light"
                    color={log.operationType === 'LOGIN' ? 'green' : log.operationType === 'LOGOUT' ? 'orange' : 'blue'}
                  >
                    {log.operationType}
                  </Badge>
                )
              },
              { 
                key: 'logLevel', 
                label: 'Level',
                render: (log: AuditLog) => (
                  <Badge size="sm" color={logLevelColors[log.logLevel as keyof typeof logLevelColors]}>
                    {log.logLevel}
                  </Badge>
                )
              },
              { 
                key: 'status', 
                label: 'Status',
                render: (log: AuditLog) => (
                  <Badge size="sm" color={statusColors[log.status as keyof typeof statusColors]}>
                    {log.status}
                  </Badge>
                )
              },
              { 
                key: 'timestamp', 
                label: 'Date & Time',
                render: (log: AuditLog) => (
                  <div>
                    <Text size="sm" fw={500}>{new Date(log.timestamp).toLocaleDateString()}</Text>
                    <Text size="xs" c="dimmed">{new Date(log.timestamp).toLocaleTimeString()}</Text>
                  </div>
                )
              }
            ]}
            onView={(item) => {
              navigate(`/admin/audit/logs/view/${item.id}`);
            }}
            pagination={{
              page: page,
              total: Math.ceil(totalRecords / pageSize),
              onPageChange: setPage
            }}
            search={{
              value: '',
              onChange: () => {}
            }}
          />
        </Paper>

        {/* Log Details Modal */}
        <Modal
          opened={detailsOpened}
          onClose={() => setDetailsOpened(false)}
          title="Audit Log Details"
          size="lg"
        >
          {selectedLog && (
            <Stack gap="md">
              <Group>
                <Text fw={500}>ID:</Text>
                <Text>{selectedLog.id}</Text>
              </Group>
              <Group>
                <Text fw={500}>Timestamp:</Text>
                <Text>{new Date(selectedLog.timestamp).toLocaleString()}</Text>
              </Group>
              <Group>
                <Text fw={500}>Operation:</Text>
                <Badge>{selectedLog.operation}</Badge>
              </Group>
              <Group>
                <Text fw={500}>Module:</Text>
                <Text>{selectedLog.moduleName}</Text>
              </Group>
              <Group>
                <Text fw={500}>Microservice:</Text>
                <Text>{selectedLog.microservice}</Text>
              </Group>
              <Group>
                <Text fw={500}>User:</Text>
                <Text>{selectedLog.userEmail || 'System'} ({selectedLog.userId})</Text>
              </Group>
              <Group>
                <Text fw={500}>Role:</Text>
                <Text>{selectedLog.userRole || 'N/A'}</Text>
              </Group>
              <Group>
                <Text fw={500}>IP Address:</Text>
                <Text>{selectedLog.ipAddress || 'N/A'}</Text>
              </Group>
              <Group>
                <Text fw={500}>Entity:</Text>
                <Text>{selectedLog.entityType} (ID: {selectedLog.entityId})</Text>
              </Group>
              <div>
                <Text fw={500} mb="xs">Description:</Text>
                <Paper withBorder p="sm" bg="gray.0">
                  <Text size="sm">{selectedLog.description}</Text>
                </Paper>
              </div>
            </Stack>
          )}
        </Modal>
      </motion.div>
    </Container>
  );
};

export default AuditLogGrid;