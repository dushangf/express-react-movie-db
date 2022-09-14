import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Favorite from './Favorite';

import { removeFavorites } from '../redux/UserSlice';

const Favorites = () => {
  const user = useSelector((state) => state.user);

  const favorites = user.favorites;

  const dispatch = useDispatch();

  const deleteFavorites = () => {
    const favorites_to_remove = [];
    favorites.map((movie) => {
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
      <div className='flex justify-end w-5/6'>
        <button
          onClick={() => deleteFavorites()}
          className='text-white bg-black rounded-full px-10 py-3 m-10'
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
