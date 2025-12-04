import { Menu, Avatar } from '@mantine/core';
import {
  IconUser,
  IconLogout,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../../Slices/JwtSlice';
import { removeUser } from '../../../Slices/UserSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileMenu=()=> {
  const user=useSelector((state:any)=>state.user);
  const dispatch = useDispatch();
  const jwt=useSelector((state:any)=>state.jwt);
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      console.log('=== LOGOUT DEBUG ===');
      console.log('Token found:', token ? 'Yes' : 'No');
      console.log('Token length:', token ? token.length : 0);
      
      if (token) {
        console.log('Calling logout API at:', 'http://localhost:9000/user/logout');
        const response = await axios.post('http://localhost:9000/user/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Logout API success:', response.data);
        console.log('Response status:', response.status);
      } else {
        console.warn('No token found - skipping logout API call');
      }
    } catch (error) {
      console.error('=== LOGOUT ERROR ===');
      console.error('Error details:', error.response?.data || error.message);
      console.error('Error status:', error.response?.status);
      console.error('Full error:', error);
    } finally {
      // Clear local state regardless of API call result
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      dispatch(removeJwt());
      dispatch(removeUser());
      console.log('=== LOGOUT CLEANUP COMPLETED ===');
    }
  };
  const handleProfile=()=>{
    navigate(`/${user?.role?.toLowerCase()}/profile`);
    console.log('Logout');
  }
  useEffect(()=>{
    console.log(jwt);
  },[]);
  return (
    <Menu shadow="md" width="target">
      <Menu.Target>
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
          <span className="text-sm sm:text-base md:text-lg font-medium text-white truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
            {user.name}
          </span>
          <Avatar
            variant="filled"
            src="/avatar.jpg"
            size={36}
            className="sm:size-10"
            alt="it's me"
          />
        </div>
      </Menu.Target>
  
      <Menu.Dropdown>
        <Menu.Item
          className="font-medium text-sm sm:text-md"
          onClick={handleProfile}
          leftSection={<IconUser size={16} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          className="font-medium text-sm sm:text-md"
          onClick={handleLogout}
          leftSection={<IconLogout size={16} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
  
}

export default ProfileMenu;