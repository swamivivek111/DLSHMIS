import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Title, Group, Button, Stack, Text, Badge, Grid, Card } from '@mantine/core';
import { IconArrowLeft, IconDownload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
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
  userAgent?: string;
  requestData?: string;
  responseData?: string;
  errorMessage?: string;
}

const AuditLogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [auditLog, setAuditLog] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(true);

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
    fetchAuditLog();
  }, [id]);

  const fetchAuditLog = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`http://localhost:9000/audit/logs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAuditLog(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch audit log details',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auditLog) {
    return <div>Audit log not found</div>;
  }

  return (
    <Container size="lg" py="md">
      <Paper shadow="sm" p="md">
        <Group justify="space-between" mb="md">
          <Group>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              variant="light"
              onClick={() => navigate('/admin/audit/logs')}
            >
              Back to Audit Logs
            </Button>
            <Title order={2}>Audit Log Details</Title>
          </Group>
          <Button
            leftSection={<IconDownload size={16} />}
            variant="outline"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={12}>
            <Card withBorder p="md" mb="md">
              <Title order={4} mb="md">Basic Information</Title>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Log ID</Text>
                  <Text fw={500}>{auditLog.id}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Timestamp</Text>
                  <Text fw={500}>{new Date(auditLog.timestamp).toLocaleString()}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Operation</Text>
                  <Badge size="lg">{auditLog.operation}</Badge>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">Status</Text>
                  <Badge size="lg" color={statusColors[auditLog.status as keyof typeof statusColors]}>
                    {auditLog.status}
                  </Badge>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card withBorder p="md" mb="md">
              <Title order={4} mb="md">System Information</Title>
              <Stack gap="sm">
                <div>
                  <Text size="sm" c="dimmed">Module</Text>
                  <Text fw={500}>{auditLog.moduleName}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Microservice</Text>
                  <Text fw={500}>{auditLog.microservice}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Operation Type</Text>
                  <Badge>{auditLog.operationType}</Badge>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Log Level</Text>
                  <Badge color={logLevelColors[auditLog.logLevel as keyof typeof logLevelColors]}>
                    {auditLog.logLevel}
                  </Badge>
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card withBorder p="md" mb="md">
              <Title order={4} mb="md">User Information</Title>
              <Stack gap="sm">
                <div>
                  <Text size="sm" c="dimmed">User ID</Text>
                  <Text fw={500}>{auditLog.userId || 'N/A'}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">User Email</Text>
                  <Text fw={500}>{auditLog.userEmail || 'System'}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">User Role</Text>
                  <Text fw={500}>{auditLog.userRole || 'N/A'}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">IP Address</Text>
                  <Text fw={500}>{auditLog.ipAddress || 'N/A'}</Text>
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          {auditLog.entityType && (
            <Grid.Col span={12}>
              <Card withBorder p="md" mb="md">
                <Title order={4} mb="md">Entity Information</Title>
                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" c="dimmed">Entity Type</Text>
                    <Text fw={500}>{auditLog.entityType}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" c="dimmed">Entity ID</Text>
                    <Text fw={500}>{auditLog.entityId}</Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          )}

          <Grid.Col span={12}>
            <Card withBorder p="md" mb="md">
              <Title order={4} mb="md">Description</Title>
              <Paper withBorder p="sm" bg="gray.0">
                <Text size="sm">{auditLog.description}</Text>
              </Paper>
            </Card>
          </Grid.Col>

          {auditLog.errorMessage && (
            <Grid.Col span={12}>
              <Card withBorder p="md" mb="md">
                <Title order={4} mb="md" c="red">Error Message</Title>
                <Paper withBorder p="sm" bg="red.0">
                  <Text size="sm" c="red">{auditLog.errorMessage}</Text>
                </Paper>
              </Card>
            </Grid.Col>
          )}

          {auditLog.requestData && (
            <Grid.Col span={6}>
              <Card withBorder p="md" mb="md">
                <Title order={4} mb="md">Request Data</Title>
                <Paper withBorder p="sm" bg="gray.0">
                  <Text size="xs" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {auditLog.requestData}
                  </Text>
                </Paper>
              </Card>
            </Grid.Col>
          )}

          {auditLog.responseData && (
            <Grid.Col span={6}>
              <Card withBorder p="md" mb="md">
                <Title order={4} mb="md">Response Data</Title>
                <Paper withBorder p="sm" bg="gray.0">
                  <Text size="xs" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {auditLog.responseData}
                  </Text>
                </Paper>
              </Card>
            </Grid.Col>
          )}

          {auditLog.userAgent && (
            <Grid.Col span={12}>
              <Card withBorder p="md">
                <Title order={4} mb="md">Technical Details</Title>
                <div>
                  <Text size="sm" c="dimmed">User Agent</Text>
                  <Text size="xs" style={{ fontFamily: 'monospace' }}>{auditLog.userAgent}</Text>
                </div>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuditLogView;