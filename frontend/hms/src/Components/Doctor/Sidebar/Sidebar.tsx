import { IconCalendarCheck, IconHeartbeat, IconLayoutGrid, IconMoodHeart, IconSettings, IconStethoscope, IconUser, IconVaccine } from '@tabler/icons-react'
import { Avatar, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

const links=[
    {
        name:"Dashbord", url:"/doctor/dashboard", icon:<IconLayoutGrid stroke={2} />
    },
    {
        name:"Profile", url:"/doctor/profile", icon:<IconUser stroke={2} />
    },
    {
        name:"Doctors", url:"/doctor/doctors", icon:<IconStethoscope stroke={2} />
    },
    {
        name:"Patients", url:"/doctor/patients", icon:<IconMoodHeart stroke={2} />
    },
    {
        name:"Appointments", url:"/doctor/appointments", icon:<IconCalendarCheck stroke={2} />
    },
    {
        name:"Pharmacy", url:"/doctor/pharmacy", icon:<IconVaccine stroke={2} />
    },
    {
        name:"MasteSettings", url:"/doctor/mastersettings", icon:<IconSettings stroke={2} />
    }
]
const Sidebar = () => {
    const user=useSelector((state:any)=>state.user);
  return (
    <div className='flex'>
        <div className='w-64'>

        </div>
        <div className='w-64 fixed h-screen overflow-y-auto bg-dark flex flex-col gap-7 items-center'>
            <div className='fixed z-[500] bg-dark py-3 text-primary-400 flex gap-1 items-center'>
                <IconHeartbeat size={40} stroke={2.5}/>
                <span className='font-heading font-semibold text-3xl'>Pulse</span>
            </div>

            <div className='flex mt-20 flex-col gap-5'>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='pt-1 bg-white rounded-full shadow-lg'>
                        <Avatar variant='filled' src="/avatar.jpg" size='xl' alt="it's me" />
                    </div>
                    <span className='font-medium text-light'>{user.name}</span>
                    <Text c="dimmed" className="text-light" size='xs'>{user.role}</Text>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    {
                        links.map((link)=>{
                            return <NavLink to={link.url} key={link.url} className={({isActive})=>`flex items-center gap-3 w-full h-16 font-medium px-4 px-5 rounded-lg text-light ${isActive?"bg-primary-400 text-dark":"hover:bg-gray-100 hover:text-dark"}`}>
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
