import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaBookmark } from 'react-icons/fa';

const Header = ({ user, loggedIn }) => {
  const history = useHistory();

  return (
    <div className='w-full flex h-20 justify-end items-center px-8 bg-gray-300'>
      {loggedIn && (
        <button className='text-3xl p-3 mx-2'>
          <Link to='/favorites'>
            <FaBookmark />
          </Link>
        </button>
      )}
      <button
        onClick={() => !loggedIn && history.push('/login')}
        className='text-2xl bg-white rounded-full p-3 mx-2'
      >
        <FaUser />
      </button>
    </div>
  );
};

export default Header;
