import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    const cgreenentials = { email, password };
    formSubmitHandler(cgreenentials);
  };
  const formSubmitHandler = async (credentials) => {
    try {
      if (!backendUrl) {
        throw new Error('Backend URL is not defined.');
      }

      const url =
        role === 'doctor'
          ? `${backendUrl}/doctor/login-doctor`
          : `${backendUrl}/admin/login-admin`;

      // console.log({ ...credentials, role });

      const { data } = await axios.post(url, { ...credentials, role });

      console.log(role);
      console.log(data.role);

      if (data.success) {
        if (data.role !== role) {
          throw new Error(
            `Invalid role detected. Tried to log in as ${role}, but the credentials are for ${data.role}.`
          );
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('role', role);
        setToken(data.token);
        toast.success('Login successful');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error during login:', error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token && role === 'admin') {
      navigate('/admin-dashboard');
    } else if (token && role === 'doctor') {
      navigate('/doctor-dashboard');
    }
  }, [navigate, role, token]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-custom-gradient">
      <form
        onSubmit={submitForm}
        className="min-w-80 w-2/6 mx-auto border-2 border-blue-300 p-10 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700 "
      >
        <h1 className="text-2xl font-bold text-white mb-5 text-center ">
          {role === 'admin' ? 'Admin' : 'Doctor'} Login
        </h1>

        <div className="mb-5 ">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-green-50 border border-blue-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 "
            placeholder="name@doctor.com"
            required
          />
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-green-50 border border-blue-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 "
            required
            placeholder="*********"
          />
        </div>

        <div className="flex items-center w-full justify-center ">
          <button
            type="submit"
            className="relative hover:bg-blue-600 overflow-hidden font-medium rounded-lg text-sm w-full sm:w-auto text-center transition-all border border-blue-500 bg-blue-500 text-white"
          >
            <span className="block transition-transform  px-5 py-2.5">
              Login
            </span>
            {/*  */}
          </button>
        </div>
        {role === 'admin' ? (
          <p className="text-white mt-4 text-center">
            <span
              onClick={() => setRole('doctor')}
              className="text-blue-200 text-sm font-semibold underline capitalize underline-offset-2 cursor-pointer hover:text-blue-500 opacity-40"
            >
              Login as doctor{' '}
            </span>
          </p>
        ) : (
          <p className="text-white mt-4 text-center">
            <span
              onClick={() => setRole('admin')}
              className="text-blue-200 text-sm font-semibold underline capitalize underline-offset-2 cursor-pointer hover:text-blue-500 opacity-40"
            >
              Login as admin{' '}
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
