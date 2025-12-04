import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Anchor,
  Stack,
  Alert,
  Text,
  Divider,
  Card,
  SimpleGrid,
  Badge,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconMail, IconLock, IconStethoscope, IconUser, IconUserCheck, IconHeartbeat } from '@tabler/icons-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slices/UserSlice';
import { setJwt } from '../Slices/JwtSlice';
import { loginUser } from '../Services/UserService';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { jwtDecode } from 'jwt-decode';

const EnhancedLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError('');
    
    try {
      const token = await loginUser(values);
      
      // Store token
      localStorage.setItem('token', token);
      
      // Decode user details
      const decoded: any = jwtDecode(token);
      
      dispatch(setJwt(token));
      dispatch(setUser(decoded));
      
      notifications.show({
        title: 'Login Successful',
        message: `Welcome back, ${decoded.name}!`,
        color: 'green',
      });
      
      // Check for redirect path
      const redirectPath = localStorage.getItem('redirectPath') || '/dashboard';
      localStorage.removeItem('redirectPath');
      
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errorMessage || 'Login failed. Please try again.';
      setError(errorMessage);
      notifications.show({
        title: 'Login Failed',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const DemoCredentials = () => (
    <Card shadow="xs" padding="md" radius="md" withBorder className="mt-4">
      <Title order={5} mb="sm" className="text-center">Demo Credentials</Title>
      <SimpleGrid cols={isMobile ? 1 : 3} spacing="xs">
        <div className="text-center p-2 bg-blue-50 rounded cursor-pointer" 
             onClick={() => form.setValues({ email: 'admin@hms.com', password: 'admin123' })}>
          <Badge color="blue" size="sm" mb="xs">Admin</Badge>
          <Text size="xs">admin@hms.com</Text>
          <Text size="xs">admin123</Text>
        </div>
        <div className="text-center p-2 bg-green-50 rounded cursor-pointer"
             onClick={() => form.setValues({ email: 'doctor@hms.com', password: 'doctor123' })}>
          <Badge color="green" size="sm" mb="xs">Doctor</Badge>
          <Text size="xs">doctor@hms.com</Text>
          <Text size="xs">doctor123</Text>
        </div>
        <div className="text-center p-2 bg-orange-50 rounded cursor-pointer"
             onClick={() => form.setValues({ email: 'patient@hms.com', password: 'patient123' })}>
          <Badge color="orange" size="sm" mb="xs">Patient</Badge>
          <Text size="xs">patient@hms.com</Text>
          <Text size="xs">patient123</Text>
        </div>
      </SimpleGrid>
      <Text size="xs" c="dimmed" ta="center" mt="xs">
        Click on any card to auto-fill credentials
      </Text>
    </Card>
  );

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ 
        backgroundImage: 'url("/hbg2.jpg")',
        backgroundColor: 'rgba(0,0,0,0.1)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <Container size={isMobile ? "sm" : "md"} className="w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <IconHeartbeat size={45} className="text-red-500 mr-2" stroke={2.5} />
            <Title order={1} className="text-[#202A44] font-bold text-3xl md:text-4xl">
              DLS HMIS
            </Title>
          </div>
          <Text c="dimmed" size="lg" className="text-[#202A44]">
            Digital Healthcare Solutions
          </Text>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8 items-start`}>
          {/* Login Form */}
          <Paper 
            withBorder 
            shadow="xl" 
            p={isMobile ? 20 : 40} 
            radius="lg" 
            className="w-full backdrop-blur-md bg-white/90"
          >
            <Title order={2} ta="center" mb="md" className="text-gray-800">
              Welcome Back
            </Title>
            <Text c="dimmed" size="sm" ta="center" mb="xl">
              Sign in to access your dashboard
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                {error && (
                  <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
                    {error}
                  </Alert>
                )}
                
                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  leftSection={<IconMail size={16} />}
                  {...form.getInputProps('email')}
                  required
                  size="md"
                />
                
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  leftSection={<IconLock size={16} />}
                  {...form.getInputProps('password')}
                  required
                  size="md"
                />
                
                <Group justify="space-between" mt="xs">
                  <Anchor size="sm" c="blue">
                    Forgot password?
                  </Anchor>
                </Group>
                
                <Button 
                  type="submit" 
                  fullWidth 
                  loading={loading} 
                  size="md"
                  className="mt-4 bg-[#202A44] hover:bg-orange-500"
                >
                  Sign In
                </Button>
              </Stack>
            </form>
            
            <Divider label="or" labelPosition="center" my="lg" />
            
            <Group justify="center">
              <Text size="sm" c="dimmed">
                Don't have an account?
              </Text>
              <Anchor component={Link} to="/register" size="sm" fw={500}>
                Create Account
              </Anchor>
            </Group>

            {/* Demo Credentials */}
            <DemoCredentials />
          </Paper>

          {/* Features Section - Hidden on mobile */}
          {!isMobile && (
            <div className="space-y-6">
              <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-white/90 backdrop-blur-md">
                <Title order={3} mb="md" className="text-gray-800">
                  Why Choose Our HMS?
                </Title>
                <Stack gap="md">
                  <Group>
                    <div className="bg-blue-100 p-2 rounded">
                      <IconUser size={20} color="#1c7ed6" />
                    </div>
                    <div>
                      <Text fw={500}>Patient Management</Text>
                      <Text size="sm" c="dimmed">Complete patient records and history</Text>
                    </div>
                  </Group>
                  <Group>
                    <div className="bg-green-100 p-2 rounded">
                      <IconStethoscope size={20} color="#37b24d" />
                    </div>
                    <div>
                      <Text fw={500}>Doctor Portal</Text>
                      <Text size="sm" c="dimmed">Manage appointments and consultations</Text>
                    </div>
                  </Group>
                  <Group>
                    <div className="bg-orange-100 p-2 rounded">
                      <IconUserCheck size={20} color="#fd7e14" />
                    </div>
                    <div>
                      <Text fw={500}>Admin Dashboard</Text>
                      <Text size="sm" c="dimmed">Complete hospital management</Text>
                    </div>
                  </Group>
                </Stack>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Title order={4} mb="sm" className="text-white">
                  24/7 Support
                </Title>
                <Text size="sm" className="text-blue-100">
                  Our dedicated support team is available round the clock to assist you with any queries or technical issues.
                </Text>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default EnhancedLogin;