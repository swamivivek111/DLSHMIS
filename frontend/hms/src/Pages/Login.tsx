import { Button, PasswordInput, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link} from 'react-router-dom'
import { loginUser } from '../Services/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  //const navigate=useNavigate();
  const [loading, setLoading]=useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value:string)=>(value=='' || value==null)?'Please enter email id':null,
      password:(value:string) =>(!value?"Please enter password":null)
    },
  });

  const handleSubmit=(values : typeof form.values)=>{
    setLoading(true);
    loginUser(values).then((_data)=>{
      console.log(jwtDecode(_data));
      successNotification("Login successful, Welcome to DSL HMS!");//_data
      dispatch(setJwt(_data));
      dispatch(setUser(jwtDecode(_data)));
      //navigate('/dashboard');
    }).catch((error)=>{
      errorNotification(error.response.data.errorMessage);
    }).finally(()=>{setLoading(false);});
  };

    //[&_input]:placeholder-primary-400 [&_.mantine-Input-input]:!border-black [&_.mantine-Input-input]:!border  focus-within:[&_.mantine-Input-input]:!border-pink-400
  return (
    <div style={{background:'url("/hbg2.jpg")'}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
      <div className='py-3 text-[#e23140] flex gap-1 items-center'>
          <IconHeartbeat size={45} stroke={2.5}/>
          <span className='font-heading font-semibold text-3xl md:text-4xl text-[#202A44]'>DLS HMIS</span>
      </div>
      <div className='w-full max-w-[450px] mx-4 backdrop-blur-md p-5 py-5 rounded-lg'>
        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-primary-400 [&_svg]:text-primary-400'>
            <div className='self-center font-medium font-heading text-lg md:text-xl text-[#202A44]'>Login</div>
            <TextInput {...form.getInputProps('email')} size="md" radius="md" placeholder="Email" />
            <PasswordInput {...form.getInputProps('password')} size="md" radius="md" placeholder="Password"/>
            <Button radius="md" size="md" type='submit' loading={loading} className='bg-[#202A44] hover:bg-orange-500'>Login</Button>
            <div className='text-[#202A44] text-sm self-center'>Dont have an account? <Link to="/register" className="hover:underline">Register</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login
