import { Menu, Avatar } from '@mantine/core';
import {
  IconUser,
  IconLogout,
} from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../../Slices/UserSlice';
import { removeJwt } from '../../../Slices/JwtSlice';
import axios from 'axios';

const ProfileMenu=()=> {
  const user=useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      
      if (token) {
        await axios.post('http://localhost:9000/user/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      dispatch(removeJwt());
      dispatch(removeUser());
      navigate('/login');
    }
  };

  const handleProfile = () => {
    navigate(`/${user?.role?.toLowerCase()}/profile`);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className='flex items-center gap-3 cursor-pointer'>
            <span className='font-medium text-lg text-neutral-900'>{user.name}</span>
            <Avatar variant='filled' src="/avatar.jpg" size={45} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item 
          leftSection={<IconUser size={14} />}
          onClick={handleProfile}
        >
          Profile
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;