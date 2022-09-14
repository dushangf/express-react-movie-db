import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { userLogin } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';

const Login = ({ loggedIn }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    dispatch(userLogin(credentials));
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      loggedIn && history.push('/');
    };

    checkLoggedIn();
  }, [loggedIn, history]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='border-2 border-gray-600 p-5 text-xl w-1/4'>
        <h2 className='w-full font-semibold my-7 mt-0 text-2xl'>Login</h2>
        <form onSubmit={(e) => handleLogin(e)} className='w-full my-7'>
          <div className='w-full my-7'>
            <label className='font-semibold' htmlFor='email'>
              Email
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              className='w-full border-2 border-gray-700 p-2'
              type='text'
              name='email'
              required
            />
          </div>
          <div className='w-full my-7 relative'>
            <button className='absolute right-0 text-base'>
              Forgot Password?
            </button>
            <label className='font-semibold' htmlFor='password'>
              Password
            </label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              className='w-full border-2 border-gray-700 p-2'
              type='password'
              name='password'
              required
            />
          </div>
          <button
            className='bg-gray-500 text-gray-100 w-full p-2'
            type='submit'
          >
            Login
          </button>
        </form>
        <h4 className='w-full text-center font-semibold before:block before:h-0.5 before:mx-4 before:w-10 before:bg-gray-400 before:w-1/4 after:block after:mx-4 after:h-0.5 after:w-10 after:bg-gray-400 after:w-1/4 flex justify-center items-center my-4'>
          What's new?
        </h4>
        <button className='bg-gray-500 text-gray-100 w-full my-4 p-2'>
          <Link className='w-full h-full' to='/sign-up'>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
