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
      .then((data) => {
        // Extract tokens from response
        const token = data.accessToken;
        const refreshToken = data.refreshToken;
        
        if (!token) {
          throw new Error('No access token received');
        }

        // Save tokens
        localStorage.setItem('token', token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);

        // Decode user details
        const decoded: any = jwtDecode(token);

        successNotification('Login successful, Welcome to DLS HMIS!');
        dispatch(setJwt(token));
        dispatch(setUser(decoded));

        // Check for last visited path or redirect path
        const lastVisitedPath = localStorage.getItem('lastVisitedPath');
        const redirectPath = localStorage.getItem('redirectPath');
        const targetPath = lastVisitedPath || redirectPath || `/${decoded.role.toLowerCase()}/dashboard`;
        
        localStorage.removeItem('lastVisitedPath');
        localStorage.removeItem('redirectPath');

        navigate(targetPath, { replace: true });
      })
      .catch((error) => {
        let errorMessage = 'Login failed. Please try again.';
        
        if (error?.response?.data?.errorMessage) {
          const serverError = error.response.data.errorMessage;
          if (serverError === 'INVALID_CREDENTIALS') {
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          } else if (serverError === 'USER_NOT_FOUND') {
            errorMessage = 'No account found with this email address.';
          } else if (serverError === 'ACCOUNT_LOCKED') {
            errorMessage = 'Your account has been locked. Please contact administrator.';
          } else {
            errorMessage = serverError;
          }
        }
        
        errorNotification(errorMessage);
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
