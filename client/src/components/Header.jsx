import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaBookmark } from 'react-icons/fa';

const Header = ({ loggedIn }) => {
  const [optionsStatus, setoptionsStatus] = useState(false);

  const history = useHistory();

  const userLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  };

  const Options = () => {
    return (
      <div className='absolute z-10 right-10 -bottom-6 bg-white font-semibold border rounded py-2 px-4 hover:bg-gray-200 duration-200'>
        <button onMouseDown={() => userLogout()}>Logout</button>
      </div>
    );
  };

  return (
    <div className='w-full flex h-20 justify-end items-center px-8 bg-gray-300 relative'>
      {loggedIn && (
        <button className='text-3xl p-3 mx-2 hover:scale-125 duration-200'>
          <Link to='/favorites'>
            <FaBookmark />
          </Link>
        </button>
      )}
      <button
        onClick={() =>
          !loggedIn ? history.push('/login') : setoptionsStatus(!optionsStatus)
        }
        onBlur={() => {
          setoptionsStatus(false);
        }}
        className='text-2xl bg-white rounded-full p-3 mx-2 hover:scale-110 duration-200'
      >
        <FaUser />
      </button>
      {optionsStatus && <Options />}
    </div>
  );
};

export default Header;
