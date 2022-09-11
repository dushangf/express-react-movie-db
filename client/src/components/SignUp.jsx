import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');

  const history = useHistory();

  const signUp = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_ACCOUNTS_API;
    try {
      const body = {
        first_name,
        last_name,
        email,
        password,
      };
      const response = await axios.post(url + '/users/register', body);
      response.status = 200 ? history.push('/login') : window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='border-2 border-gray-600 p-5 text-xl w-1/4'>
        <h2 className='w-full font-semibold my-7 mt-0 text-2xl'>Sign Up</h2>
        <form
          onSubmit={(e) => {
            signUp(e);
          }}
          className='w-full my-7'
        >
          <div className='w-full my-7'>
            <label className='font-semibold' htmlFor='first-name'>
              First Name
            </label>
            <input
              onChange={(e) => setfirst_name(e.target.value)}
              className='w-full border-2 border-gray-700 p-2'
              type='text'
              name='first-name'
              required
            />
          </div>
          <div className='w-full my-7'>
            <label className='font-semibold' htmlFor='last-name'>
              Last Name
            </label>
            <input
              onChange={(e) => setlast_name(e.target.value)}
              className='w-full border-2 border-gray-700 p-2'
              type='text'
              name='last-name'
              required
            />
          </div>
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
          <div className='w-full my-7'>
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
          <div className='w-full my-7'>
            <label className='font-semibold' htmlFor='confirm-password'>
              Confirm Password
            </label>
            <input
              onChange={(e) => setconfirm_password(e.target.value)}
              onBlur={() =>
                password.length > 0 &&
                password !== confirm_password &&
                alert('passwords do not match')
              }
              className='w-full border-2 border-gray-700 p-2'
              type='password'
              name='confirm-password'
              required
            />
          </div>
          <button
            className='bg-gray-500 text-gray-100 w-full p-4'
            type='submit'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
