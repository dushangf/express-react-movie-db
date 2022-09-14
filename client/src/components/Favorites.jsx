import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Favorite from './Favorite';

import { removeFavorites } from '../redux/UserSlice';

const Favorites = () => {
  const user = useSelector((state) => state.user);

  const favorites = user.favorites;

  const dispatch = useDispatch();

  const deleteFavorites = () => {
    const favorites_to_remove = [];
    favorites.forEach((movie) => {
      if (movie.delete) {
        return favorites_to_remove.push(movie.id);
      }
    });

    const details = {
      email: user.email,
      movieIDs: favorites_to_remove,
    };

    dispatch(removeFavorites(details));
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-5/6'>
        <div className='w-full flex items-center p-20'>
          <Link className='mx-1' to='/'>
            Home
          </Link>
          <p className='mx-1'>{'>'}</p>
          <Link className='mx-1' to='/favorites'>
            Wishlist
          </Link>
        </div>
        <button
          onClick={() => deleteFavorites()}
          className='border-4 border-black w-56 py-2 rounded-full bg-black text-white hover:bg-neutral-700 font-semibold duration-200'
        >
          Remove Selected
        </button>
      </div>
      <table className='w-5/6 mb-16'>
        <thead>
          <tr></tr>
        </thead>
        <tbody className=''>
          {favorites.map((movie) => (
            <Favorite key={movie.id} movie={movie} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
