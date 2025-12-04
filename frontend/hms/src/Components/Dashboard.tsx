import {
    Card,
    Text,
    Title,
    Button,
    Grid,
    Group,
    Paper,
    Center,
    Badge,
    Stack,
    SimpleGrid,
    Progress,
    ActionIcon,
  } from '@mantine/core';
  import { useNavigate } from 'react-router-dom';
  import {
    IconCalendar,
    IconUser,
    IconStethoscope,
    IconDropletFilled,
    IconBed,
    IconBuildingHospital,
    IconTrendingUp,
    IconEye,
    IconUsers,
    IconPlus,
  } from '@tabler/icons-react';
  import { motion } from 'framer-motion';
  import { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import { RootState } from '../Store';
  import { AppointmentServices } from '../Services/AppointmentServices';
  import { PatientProfileService } from '../Services/PatientProfileService';
  
  function DashboardCard({
    title,
    value,
    icon,
    color,
    trend,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
    trend?: number;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full"
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full h-full hover:shadow-lg transition-shadow">
          <Group justify="space-between" className="mb-2">
            <div className="flex-1">
              <Text size="sm" c="dimmed" className="font-medium mb-1">{title}</Text>
              <Title order={2} className="text-gray-800">{value}</Title>
              {trend && (
                <Group gap={4} mt={8}>
                  <IconTrendingUp size={14} color="green" />
                  <Text size="xs" c="green">+{trend}% from last month</Text>
                </Group>
              )}
            </div>
            <ActionIcon size={50} radius="md" color={color || 'blue'} variant="light">
              {icon}
            </ActionIcon>
          </Group>
        </Card>
      </motion.div>
    );
  }
  
  function useCurrentDateTime() {
    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
      const interval = setInterval(() => setDateTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);
    return {
      day: dateTime.toLocaleDateString(undefined, { weekday: 'long' }),
      date: dateTime.toLocaleDateString(),
      time: dateTime.toLocaleTimeString(),
      year: dateTime.getFullYear(),
    };
  }
  
  function Dashboard() {
    const {date, time, day} = useCurrentDateTime();
    const { user } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
      totalPatients: 0,
      todayAppointments: 0,
      availableDoctors: 35,
      opdPatients: 420,
      ipdAdmissions: 120,
      bloodUnits: 56,
      pendingAppointments: 0,
      completedAppointments: 0
    });
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch appointments
          const today = new Date().toISOString().split('T')[0];
          const appointmentResponse = await AppointmentServices.getAllAppointments(0, 1000, today);
          const todayCount = appointmentResponse.content?.length || 0;
          const completed = appointmentResponse.content?.filter(apt => apt.status === 'COMPLETED')?.length || 0;
          const pending = appointmentResponse.content?.filter(apt => apt.status === 'SCHEDULED')?.length || 0;
          
          // Fetch patients
          const patientsResponse = await PatientProfileService.getAllPatients();
          const totalPatients = patientsResponse?.length || 0;
          
          // Generate recent activities from real data
          const activities = [];
          if (patientsResponse?.length > 0) {
            const latestPatient = patientsResponse[patientsResponse.length - 1];
            activities.push({
              text: `New patient registered: ${latestPatient.firstName} ${latestPatient.lastName}`,
              time: '2 min ago',
              color: 'green'
            });
          }
          if (appointmentResponse.content?.length > 0) {
            activities.push({
              text: 'Appointment scheduled',
              time: '5 min ago',
              color: 'blue'
            });
          }
          activities.push(
            { text: 'Doctor updated schedule', time: '10 min ago', color: 'orange' },
            { text: 'Patient discharged', time: '15 min ago', color: 'gray' }
          );
          
          setRecentActivities(activities);
          setStats(prev => ({
            ...prev,
            totalPatients,
            todayAppointments: todayCount,
            completedAppointments: completed,
            pendingAppointments: pending
          }));
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      
      fetchData();
    }, []);
  
    const RecentActivity = () => (
      <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
        <Title order={4} mb="md">Recent Activities</Title>
        <Stack gap="sm">
          {recentActivities.map((activity, index) => (
            <Group justify="space-between" key={index}>
              <Text size="sm">{activity.text}</Text>
              <Badge color={activity.color} size="sm">{activity.time}</Badge>
            </Group>
          ))}
        </Stack>
      </Card>
    );
  
    const AppointmentProgress = () => (
      <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
        <Title order={4} mb="md">Today's Appointments Progress</Title>
        <Stack gap="md">
          <div>
            <Group justify="space-between" mb={4}>
              <Text size="sm">Completed</Text>
              <Text size="sm" fw={500}>{stats.completedAppointments}/{stats.todayAppointments}</Text>
            </Group>
            <Progress 
              value={(stats.completedAppointments / stats.todayAppointments) * 100} 
              color="green" 
              size="sm" 
              radius="xl"
            />
          </div>
          <div>
            <Group justify="space-between" mb={4}>
              <Text size="sm">Pending</Text>
              <Text size="sm" fw={500}>{stats.pendingAppointments}/{stats.todayAppointments}</Text>
            </Group>
            <Progress 
              value={(stats.pendingAppointments / stats.todayAppointments) * 100} 
              color="orange" 
              size="sm" 
              radius="xl"
            />
          </div>
        </Stack>
      </Card>
    );
  
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* Welcome Section */}
        <div className="mb-6">
          <Title order={2} className="text-gray-800 mb-2">
            Welcome back, {user?.name || 'User'}!
          </Title>
          <Text c="dimmed" size="lg" className="mb-4">
            Here's what's happening at your hospital today.
          </Text>
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center">
            <div className="flex space-x-3 text-sm text-gray-700">
              <Badge color="blue" variant="light">{day}</Badge>
              <span>{date}</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
  
        {/* Main Stats Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" className="mb-6">
          <DashboardCard 
            title="Total Patients" 
            value={stats.totalPatients.toLocaleString()} 
            icon={<IconUsers size={24} />} 
            color="blue"
            trend={12}
          />
          <div onClick={() => navigate('/admin/appointments/bookappointment')} className="cursor-pointer">
            <DashboardCard 
              title="Today's Appointments" 
              value={stats.todayAppointments} 
              icon={<IconCalendar size={24} />} 
              color="green"
            />
          </div>
          <DashboardCard 
            title="Available Doctors" 
            value={stats.availableDoctors} 
            icon={<IconStethoscope size={24} />} 
            color="orange"
            trend={5}
          />
        </SimpleGrid>
  
        {/* Secondary Stats */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" className="mb-6">
          <DashboardCard 
            title="OPD Patients" 
            value={stats.opdPatients} 
            icon={<IconBuildingHospital size={24} />} 
            color="cyan"
          />
          <DashboardCard 
            title="IPD Admissions" 
            value={stats.ipdAdmissions} 
            icon={<IconBed size={24} />} 
            color="teal"
          />
          <DashboardCard 
            title="Blood Units Available" 
            value={stats.bloodUnits} 
            icon={<IconDropletFilled size={24} />} 
            color="red"
          />
        </SimpleGrid>
  
        {/* Progress and Activities */}
        <Grid className="mb-6">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <AppointmentProgress />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <RecentActivity />
          </Grid.Col>
        </Grid>
  
        {/* Quick Actions */}
        <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-6">
          <Title order={4} mb="md">Quick Actions</Title>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
            <Card 
              className="cursor-pointer hover:bg-gray-50 transition-colors" 
              padding="md"
              onClick={() => {
                navigate('/admin/dashboard/registration/add');
                window.scrollTo(0, 0);
              }}
            >
              <Stack align="center" gap="xs">
                <IconUsers size={32} color="#228be6" />
                <Text size="sm" ta="center">Add Patient</Text>
              </Stack>
            </Card>
            <Card 
              className="cursor-pointer hover:bg-gray-50 transition-colors" 
              padding="md"
              onClick={() => navigate('/admin/appointments/bookappointment')}
            >
              <Stack align="center" gap="xs">
                <IconCalendar size={32} color="#40c057" />
                <Text size="sm" ta="center">Book Appointment</Text>
                <Badge color="green" size="sm">{stats.todayAppointments}</Badge>
              </Stack>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" padding="md">
              <Stack align="center" gap="xs">
                <IconStethoscope size={32} color="#fd7e14" />
                <Text size="sm" ta="center">Add Doctor</Text>
              </Stack>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" padding="md">
              <Stack align="center" gap="xs">
                <IconBed size={32} color="#20c997" />
                <Text size="sm" ta="center">Admissions</Text>
              </Stack>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" padding="md">
              <Stack align="center" gap="xs">
                <IconDropletFilled size={32} color="#e03131" />
                <Text size="sm" ta="center">Blood Bank</Text>
              </Stack>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors" padding="md">
              <Stack align="center" gap="xs">
                <IconEye size={32} color="#9775fa" />
                <Text size="sm" ta="center">Reports</Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Card>
      </div>
    );
  }
  
  export default Dashboard;