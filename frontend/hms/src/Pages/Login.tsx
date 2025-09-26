import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value: string) =>
        value === '' || value == null ? 'Please enter email id' : null,
      password: (value: string) => (!value ? 'Please enter password' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    loginUser(values)
      .then((_data) => {
        // Save token
        localStorage.setItem('token', _data);

        // Decode user details
        const decoded: any = jwtDecode(_data);

        successNotification('Login successful, Welcome to DLS HMIS!');
        dispatch(setJwt(_data));
        dispatch(setUser(decoded));

        // Check for redirect path (saved by axios interceptor on 401/403)
        const redirectPath = localStorage.getItem('redirectPath') || '/dashboard';
        localStorage.removeItem('redirectPath');

        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        errorNotification(error?.response?.data?.errorMessage || 'Login failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{ background: 'url("/hbg2.jpg")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center"
    >
      <div className="py-3 text-[#e23140] flex gap-1 items-center">
        <IconHeartbeat size={45} stroke={2.5} />
        <span className="font-heading font-semibold text-3xl md:text-4xl text-[#202A44]">
          DLS HMIS
        </span>
      </div>
      <div className="w-full max-w-[450px] mx-4 backdrop-blur-md p-5 py-5 rounded-lg">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 [&_input]:placeholder-primary-400 [&_svg]:text-primary-400"
        >
          <div className="self-center font-medium font-heading text-lg md:text-xl text-[#202A44]">
            Login
          </div>
          <TextInput
            {...form.getInputProps('email')}
            size="md"
            radius="md"
            placeholder="Email"
          />
          <PasswordInput
            {...form.getInputProps('password')}
            size="md"
            radius="md"
            placeholder="Password"
          />
          <Button
            radius="md"
            size="md"
            type="submit"
            loading={loading}
            className="bg-[#202A44] hover:bg-orange-500"
          >
            Login
          </Button>
          <div className="text-[#202A44] text-sm self-center">
            Don’t have an account?{' '}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
