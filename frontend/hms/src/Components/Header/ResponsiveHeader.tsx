import React, { useState } from 'react';
import { 
  Group, 
  Button, 
  Text, 
  Menu, 
  Avatar, 
  UnstyledButton, 
  rem, 
  Burger,
  Drawer,
  Stack,
  Divider,
  Badge,
  ActionIcon,
  Indicator
} from '@mantine/core';
import { 
  IconChevronDown, 
  IconLogout, 
  IconSettings, 
  IconUser, 
  IconBell,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

interface ResponsiveHeaderProps {
  sidebarOpen?: boolean;
  handleSidebarToggle?: () => void;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ 
  sidebarOpen, 
  handleSidebarToggle 
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const jwt = useSelector((state: any) => state.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    navigate('/login');
    close();
  };

  const UserMenu = ({ inDrawer = false }) => (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${inDrawer ? 'w-full' : ''}`}>
          <Avatar size={32} radius="xl" color="blue">
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <div className="text-left flex-1">
            <Text size="sm" fw={500}>
              {user?.name || 'User'}
            </Text>
            <Text size="xs" c="dimmed">
              {user?.role || 'Role'}
            </Text>
          </div>
          {!inDrawer && <IconChevronDown size={16} />}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
          Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item 
          color="red" 
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  const NotificationButton = () => (
    <Indicator inline label={notifications} size={16} disabled={notifications === 0}>
      <ActionIcon variant="light" size="lg" radius="md">
        <IconBell size={18} />
      </ActionIcon>
    </Indicator>
  );

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <Group justify="space-between">
          {/* Logo/Title */}
          <Group>
            {(isMobile || handleSidebarToggle) && (
              <Burger
                opened={sidebarOpen || opened}
                onClick={handleSidebarToggle || open}
                size="sm"
                aria-label="Toggle navigation"
              />
            )}
            <div>
              <Text size={isMobile ? "lg" : "xl"} fw={600} className="text-gray-800">
                {isMobile ? "HMS" : "Hospital Management System"}
              </Text>
              {!isMobile && (
                <Text size="xs" c="dimmed">
                  Digital Healthcare Solutions
                </Text>
              )}
            </div>
          </Group>
          
          {/* Desktop Actions */}
          {!isMobile && jwt && (
            <Group gap="md">
              <NotificationButton />
              <UserMenu />
            </Group>
          )}

          {/* Mobile Actions */}
          {isMobile && jwt && (
            <Group gap="xs">
              <NotificationButton />
              <Avatar size={32} radius="xl" color="blue" onClick={open}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </Group>
          )}

          {/* Login Button for non-authenticated users */}
          {!jwt && (
            <Button onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Group>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group>
            <Avatar size={40} radius="xl" color="blue">
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <div>
              <Text size="sm" fw={500}>
                {user?.name || 'User'}
              </Text>
              <Badge size="xs" variant="light" color="blue">
                {user?.role || 'Role'}
              </Badge>
            </div>
          </Group>
        }
        padding="md"
        size="sm"
        position="left"
      >
        <Stack gap="md">
          <Divider />
          
          {/* Quick Stats */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <Text size="xs" c="dimmed" mb="xs">Today's Overview</Text>
            <Group justify="space-between">
              <div className="text-center">
                <Text size="lg" fw={700} c="blue">28</Text>
                <Text size="xs" c="dimmed">Appointments</Text>
              </div>
              <div className="text-center">
                <Text size="lg" fw={700} c="green">15</Text>
                <Text size="xs" c="dimmed">Patients</Text>
              </div>
              <div className="text-center">
                <Text size="lg" fw={700} c="orange">8</Text>
                <Text size="xs" c="dimmed">Pending</Text>
              </div>
            </Group>
          </div>

          <Divider />

          {/* Navigation Items */}
          <Stack gap="xs">
            <Button variant="light" fullWidth justify="start" leftSection={<IconUser size={16} />}>
              Profile
            </Button>
            <Button variant="light" fullWidth justify="start" leftSection={<IconSettings size={16} />}>
              Settings
            </Button>
            <Button variant="light" fullWidth justify="start" leftSection={<IconBell size={16} />}>
              Notifications
              {notifications > 0 && (
                <Badge size="xs" color="red" ml="auto">
                  {notifications}
                </Badge>
              )}
            </Button>
          </Stack>

          <Divider />

          {/* Logout Button */}
          <Button 
            color="red" 
            variant="light" 
            fullWidth 
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default ResponsiveHeader;