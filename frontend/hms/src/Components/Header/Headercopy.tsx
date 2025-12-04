import { ActionIcon, Burger, Button } from '@mantine/core'
import { IconBellRinging, IconLayoutSidebarLeftCollapse, IconLogout } from '@tabler/icons-react'
import ProfileMenu from '../Doctor/Sidebar/ProfileMenu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { removeUser } from '../../Slices/UserSlice'
import { removeJwt } from '../../Slices/JwtSlice'
import axios from 'axios';

interface HeaderProps {
  toggleSidebar: () => void; // Explicitly typing toggleSidebar as a function with no parameters and no return
}
const Headercopy : React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const jwt=useSelector((state:any)=>state.jwt);
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
  useEffect(()=>{
    console.log(jwt);
  },[]);
  return (
    <div className='bg-[#202A44] shadow-xl w-full h-16 flex justify-between px-5 items-center'>
        <ActionIcon variant="transparent" aria-label="Settings" size="xl">
          <Burger opened={false} onClick={toggleSidebar} className="md:hidden" />
            <IconLayoutSidebarLeftCollapse className="text-orange-500" style={{ width: '90%', height: '90%' }} stroke={1.5} />
        </ActionIcon>
        <div className='flex gap-5 items-center'>
            <ActionIcon variant="transparent" aria-label="Settings" size="md">
                <IconBellRinging className="text-orange-500" style={{ width: '90%', height: '90%' }} stroke={2} />
            </ActionIcon>
            {jwt?<Button className="bg-[#202A44] text-orange-500 hover:bg-white hover:text-orange-500" onClick={handleLogout}><IconLogout/></Button>:<Link to="login"><Button >Login</Button></Link>}
            {jwt&&<ProfileMenu/>}
        </div>
    </div>
  )
}

export default Headercopy
