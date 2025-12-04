import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Title,
  Tabs,
  Stack,
  Group,
  Switch,
  TextInput,
  Select,
  Button,
  Grid,
  Text,
  Divider,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ApplicationSetting, ApplicationSettingServices } from '../../../Services/ApplicationSettingServices';

const ApplicationManagement: React.FC = () => {
  const [settings, setSettings] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testApiConnection();
    loadSettings();
  }, []);

  const testApiConnection = async () => {
    try {
      const result = await ApplicationSettingServices.testConnection();
      console.log('API Connection Test:', result);
    } catch (error) {
      console.error('API Connection Failed:', error);
      notifications.show({
        title: 'API Connection Error',
        message: 'Cannot connect to Application Settings API',
        color: 'red',
      });
    }
  };

  const loadSettings = async () => {
    try {
      const allSettings = await ApplicationSettingServices.getAllSettings();
      const settingsMap: { [key: string]: string } = {};
      allSettings.forEach(setting => {
        settingsMap[setting.settingKey] = setting.settingValue || '';
      });
      setSettings(settingsMap);
      console.log('Loaded settings:', settingsMap);
    } catch (error: any) {
      console.error('Failed to load settings:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load settings',
        color: 'red',
      });
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      console.log('Saving settings:', settings);
      await ApplicationSettingServices.updateMultipleSettings(settings);
      notifications.show({
        title: 'Success',
        message: 'Settings updated successfully',
        color: 'green',
      });
      loadSettings(); // Reload to confirm save
    } catch (error: any) {
      console.error('Failed to save settings:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update settings',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const GeneralSettings = () => (
    <Stack gap="md">
      <Title order={4}>General Hospital Settings</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Hospital Name"
            placeholder="DLS Multispeciality Hospital"
            value={settings['hospital.name'] || ''}
            onChange={(e) => updateSetting('hospital.name', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Branch / Location"
            placeholder="Pune - Hinjewadi"
            value={settings['hospital.branch'] || ''}
            onChange={(e) => updateSetting('hospital.branch', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Hospital Code"
            placeholder="DLS-H01"
            value={settings['hospital.code'] || ''}
            onChange={(e) => updateSetting('hospital.code', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Contact Email"
            placeholder="admin@dlshmis.com"
            value={settings['hospital.email'] || ''}
            onChange={(e) => updateSetting('hospital.email', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Contact Phone"
            placeholder="+91 9876543210"
            value={settings['hospital.phone'] || ''}
            onChange={(e) => updateSetting('hospital.phone', e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Timezone"
            data={[
              { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
              { value: 'UTC', label: 'UTC' },
              { value: 'America/New_York', label: 'America/New_York' },
            ]}
            value={settings['hospital.timezone'] || ''}
            onChange={(value) => updateSetting('hospital.timezone', value || '')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );

  const ModuleSettings = () => (
    <Stack gap="md">
      <Title order={4}>Module Visibility Settings</Title>
      <Text size="sm" c="dimmed">Enable or disable modules for the entire system</Text>
      
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Doctor Module"
            checked={settings['module.doctor'] === 'true'}
            onChange={(e) => updateSetting('module.doctor', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Pharmacy Module"
            checked={settings['module.pharmacy'] === 'true'}
            onChange={(e) => updateSetting('module.pharmacy', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Laboratory Module"
            checked={settings['module.laboratory'] === 'true'}
            onChange={(e) => updateSetting('module.laboratory', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="IPD (Indoor Patient)"
            checked={settings['module.ipd'] === 'true'}
            onChange={(e) => updateSetting('module.ipd', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Appointments"
            checked={settings['module.appointments'] === 'true'}
            onChange={(e) => updateSetting('module.appointments', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Queue System"
            checked={settings['module.queue'] === 'true'}
            onChange={(e) => updateSetting('module.queue', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Doctor Schedule"
            checked={settings['module.schedule'] === 'true'}
            onChange={(e) => updateSetting('module.schedule', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Billing Module"
            checked={settings['module.billing'] === 'true'}
            onChange={(e) => updateSetting('module.billing', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Insurance Module"
            checked={settings['module.insurance'] === 'true'}
            onChange={(e) => updateSetting('module.insurance', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );

  const SecuritySettings = () => (
    <Stack gap="md">
      <Title order={4}>Authentication & Security Settings</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Password Expiry Duration"
            data={[
              { value: '30', label: '30 Days' },
              { value: '60', label: '60 Days' },
              { value: '90', label: '90 Days' },
              { value: 'never', label: 'Never' },
            ]}
            value={settings['security.password_expiry'] || ''}
            onChange={(value) => updateSetting('security.password_expiry', value || '')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            label="Auto Logout Timeout"
            data={[
              { value: '15', label: '15 Minutes' },
              { value: '30', label: '30 Minutes' },
              { value: '60', label: '1 Hour' },
              { value: '120', label: '2 Hours' },
            ]}
            value={settings['security.auto_logout'] || ''}
            onChange={(value) => updateSetting('security.auto_logout', value || '')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Force Strong Passwords"
            checked={settings['security.strong_password'] === 'true'}
            onChange={(e) => updateSetting('security.strong_password', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Enable 2FA"
            checked={settings['security.two_factor'] === 'true'}
            onChange={(e) => updateSetting('security.two_factor', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Enable Login Captcha"
            checked={settings['security.captcha'] === 'true'}
            onChange={(e) => updateSetting('security.captcha', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );

  const NotificationSettings = () => (
    <Stack gap="md">
      <Title order={4}>Notification Settings</Title>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="Email Alerts"
            checked={settings['notification.email'] === 'true'}
            onChange={(e) => updateSetting('notification.email', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="SMS Alerts"
            checked={settings['notification.sms'] === 'true'}
            onChange={(e) => updateSetting('notification.sms', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Switch
            label="WhatsApp Alerts"
            checked={settings['notification.whatsapp'] === 'true'}
            onChange={(e) => updateSetting('notification.whatsapp', e.currentTarget.checked.toString())}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );

  return (
    <Container size="xl" className="py-4">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between">
            <Title order={3}>Application Management</Title>
            <Button onClick={saveSettings} loading={loading}>
              Save Settings
            </Button>
          </Group>

          <Tabs defaultValue="general">
            <Tabs.List>
              <Tabs.Tab value="general">General</Tabs.Tab>
              <Tabs.Tab value="modules">Modules</Tabs.Tab>
              <Tabs.Tab value="security">Security</Tabs.Tab>
              <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="general" pt="md">
              <GeneralSettings />
            </Tabs.Panel>

            <Tabs.Panel value="modules" pt="md">
              <ModuleSettings />
            </Tabs.Panel>

            <Tabs.Panel value="security" pt="md">
              <SecuritySettings />
            </Tabs.Panel>

            <Tabs.Panel value="notifications" pt="md">
              <NotificationSettings />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
};

export default ApplicationManagement;