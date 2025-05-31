import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core'
import { IconHeartbeat } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../Services/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';

const Register = () => {
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    //const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate=useNavigate();
    const [loading, setLoading]=useState(false);
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            role:'Patient',
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
    
        validate: {
          name:(value:string)=>(value=='' || value==null)?'Please enter full name':null,
          email: (value:string) =>
            /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email format',
    
          password: (value:string) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)
              ? null
              : 'Password must be 8-15 characters, include uppercase, lowercase, number, and special character',
    
          confirmpassword: (value:string, values:any) =>
            value === values.password ? null : 'Passwords do not match',
        },
      });
    
      const handleSubmit=(values : typeof form.values)=>{
        setLoading(true);
        //console.log(values);
        registerUser(values).then((data)=>{
          successNotification(data.meassage);
          navigate('/login');
          //console.log("handleSubmit : "+data.response.data);
        }).catch((error)=>{
          errorNotification(error.response.data.errorMessage);
          //console.log("handleSubmit : "+error.response.data.errorMessage);
        }).finally(()=>{setLoading(false);});
      };
    
        //[&_input]:placeholder-primary-400 [&_.mantine-Input-input]:!border-black [&_.mantine-Input-input]:!border  focus-within:[&_.mantine-Input-input]:!border-pink-400
      return (
        <div 
          className='min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4' 
          style={{ backgroundImage: 'url("/hbg6.jpg")' }}
        >
          <div className='py-3 text-primary flex gap-1 items-center'>
            <IconHeartbeat size={45} stroke={2.5} />
            <span className='font-heading font-semibold text-2xl md:text-4xl text-primary'>DLS HMIS</span>
          </div>
          <div className='w-full max-w-[450px] mx-4 backdrop-blur-md p-5 rounded-lg'>
            <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-primary-400 [&_svg]:text-primary-400'>
              <div className='self-center font-medium font-heading text-lg md:text-xl'>Register</div>
              <SegmentedControl {...form.getInputProps('role')} fullWidth size="md" radius="md" color='blue' className="border border-orange-600" data={[{label:'Patient',value:'Patient'}, {label:'Doctor',value:'Doctor'}]} />
              <TextInput {...form.getInputProps('name')} size="md" radius="md" placeholder="Full Name" />
              <TextInput {...form.getInputProps('email')} size="md" radius="md" placeholder="Email" />
              <PasswordInput {...form.getInputProps('password')} size="md" radius="md" placeholder="Password" />
              <PasswordInput {...form.getInputProps('confirmpassword')} size="md" radius="md" placeholder="Confirm Password" />
              <Button radius="md" size="md" type='submit' color='blue' loading={loading} fullWidth>Register</Button>
              <div className='text-primary text-sm self-center'>Already have an account? <Link to="/login" className="hover:underline">Login</Link></div>
            </form>
          </div>
        </div>
      )
}

export default Register
