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
  } from '@mantine/core';
  import {
    IconCalendar,
    IconUser,
    IconStethoscope,
    IconDropletFilled,
    IconBed,
    IconBuildingHospital,
  } from '@tabler/icons-react';
  import { motion } from 'framer-motion';
  import { useEffect, useState } from 'react';
  
  function DashboardCard({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card shadow="md" padding="lg" radius="md" withBorder className="w-full">
          <Group justify="space-between">
            <div>
              <Text size="lg" className="text-gray-500">{title}</Text>
              <Title order={2} className="mt-1">{value}</Title>
            </div>
            <div className={color ?? 'text-purple-600'}>{icon}</div>
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
  
    return (
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        {/* Slogan Marquee */}
        <div className="relative overflow-hidden px-4 py-2 mb-6 rounded">
  <div
    className="
      animate-marquee
      font-semibold 
      inline-block
      max-w-full
      text-sm sm:text-base md:text-lg
      whitespace-normal
      sm:whitespace-nowrap
    "
    style={{
      display: 'inline-block',
      whiteSpace: 'normal',
    }}
  >
    Welcome to DLS HMIS Committed to Compassionate Care & Medical Excellence ❤️
  </div>
</div>
  
        {/* Header with Date & Time <span className="text-gray-500 text-xs">Year: {year}</span> */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6">
        <Title order={2}>Hospital Dashboard</Title>
        <div className="flex space-x-3 text-sm text-gray-700 whitespace-nowrap">
            <Badge color="blue" variant="light">{day}</Badge>
            <span>{date}</span>
            <span>{time}</span>
            
        </div>
        </div>


  
        {/* Summary Cards */}
        <Grid gutter="md" className="mb-8">
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="Total Patients" value="1,250" icon={<IconUser size={40} />} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="Appointments Today" value="78" icon={<IconCalendar size={40} />} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="Doctors Available" value="35" icon={<IconStethoscope size={40} />} />
          </Grid.Col>
        </Grid>
  
        {/* Extended Summary Cards */}
        <Grid gutter="md" className="mb-8">
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="OPD Patients" value="420" icon={<IconBuildingHospital size={40} />} color="text-blue-600" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="IPD Admissions" value="120" icon={<IconBed size={40} />} color="text-teal-600" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <DashboardCard title="Blood Units Available" value="56" icon={<IconDropletFilled size={40} />} color="text-red-500" />
          </Grid.Col>
        </Grid>
  
        {/* Quick Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card shadow="md" padding="lg" radius="md" className="mb-8" withBorder>
            <Title order={4} className="mb-4">Quick Links</Title>
            <div className="flex flex-wrap gap-4">
              <Button variant="light" color="grape" radius="md">Manage Patients</Button>
              <Button variant="light" color="blue" radius="md">Appointments</Button>
              <Button variant="light" color="teal" radius="md">Doctors</Button>
              <Button variant="light" color="orange" radius="md">Billing</Button>
              <Button variant="light" color="red" radius="md">Blood Bank</Button>
              <Button variant="light" color="green" radius="md">Admissions</Button>
            </div>
          </Card>
        </motion.div>
  
        {/* Chart Placeholder */}
        <Paper shadow="xs" radius="md" p="md" className="bg-white">
          <Title order={4} className="mb-4">System Data Overview</Title>
          <Center className="h-48 text-gray-400">
            {/* Replace this with actual chart */}
            Graphical representation (e.g., PieChart, BarChart)
          </Center>
        </Paper>
      </div>
    );
  }
  
  export default Dashboard;