import { ActionIcon, Button } from '@mantine/core';
import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapse,
  IconLogout,
  IconMenu2,
} from '@tabler/icons-react';
import ProfileMenu from '../Doctor/Sidebar/ProfileMenu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';

interface HeaderProps {
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
  onMenuClick: () => void; // ✅ Add this line
}

const Header = ({ sidebarOpen, handleSidebarToggle }: HeaderProps) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state: any) => state.jwt);

  const handleLogout = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    console.log('Logout');
  };

  useEffect(() => {
    console.log(jwt);
  }, []);

  return (
    <header className="bg-[#202A44] shadow-xl w-full h-16 flex justify-between items-center px-5">
  <div className="flex items-center gap-2">
    {/* Toggle Button (Mobile + Desktop) */}
    <ActionIcon
      variant="transparent"
      aria-label="Toggle sidebar"
      size="xl"
      onClick={handleSidebarToggle}
    >
      {sidebarOpen ? (
        <IconLayoutSidebarLeftCollapse className="text-orange-500" stroke={1.5} />
      ) : (
        <IconMenu2 className="text-orange-500" stroke={1.5} />
      )}
    </ActionIcon>
  </div>

  <div className="flex items-center gap-4">
    <ActionIcon variant="transparent" aria-label="Notifications" size="md">
      <IconBellRinging className="text-orange-500" stroke={2} />
    </ActionIcon>

    {jwt ? (
      <>
        <Button
          className="bg-[#202A44] text-orange-500 hover:bg-white hover:text-orange-500"
          onClick={handleLogout}
        >
          <IconLogout />
        </Button>
        <ProfileMenu />
      </>
    ) : (
      <Link to="login">
        <Button>Login</Button>
      </Link>
    )}
  </div>
</header>

  );
  
};

export default Header;
