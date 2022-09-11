import React from 'react';
import { FaUser, FaBookmark } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='w-full flex h-20 justify-end items-center px-8 bg-gray-300'>
      <button className='text-3xl p-3 mx-2'>
        <FaBookmark />
      </button>
      <button className='text-2xl bg-white rounded-full p-3 mx-2'>
        <FaUser />
      </button>
    </div>
  );
};

export default Header;
