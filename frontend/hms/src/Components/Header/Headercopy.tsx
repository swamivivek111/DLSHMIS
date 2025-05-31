import { ActionIcon, Burger, Button } from '@mantine/core'
import { IconBellRinging, IconLayoutSidebarLeftCollapse, IconLogout } from '@tabler/icons-react'
import ProfileMenu from '../Doctor/Sidebar/ProfileMenu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { removeUser } from '../../Slices/UserSlice'
import { removeJwt } from '../../Slices/JwtSlice'
interface HeaderProps {
  toggleSidebar: () => void; // Explicitly typing toggleSidebar as a function with no parameters and no return
}
const Headercopy : React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const jwt=useSelector((state:any)=>state.jwt);
  const handleLogout=()=>{
    dispatch(removeJwt());
    dispatch(removeUser());
    console.log('Logout');
  }
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
