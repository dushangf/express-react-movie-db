import React from 'react';
import { FaTrash } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, deleteSelect } from '../redux/UserSlice';

const Favorite = ({ movie }) => {
  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteFavorite = (movieID) => {
    const details = {
      email: user.email,
      movieID: movieID,
    };

    dispatch(removeFavorite(details));
  };

  const selectDelete = {
    id: movie.id,
    value: !movie.delete,
  };

  return (
    <tr className='h-full border-b border-x first:border-t even:bg-gray-50 odd:bg-gray-100 px-5'>
      <td className='h-full text-center'>
        <input
          onChange={() => dispatch(deleteSelect(selectDelete))}
          className='form-check-input appearance-none h-4 w-4 border border-gray-500 rounded-full bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain cursor-pointer p-2'
          value={movie.delete}
          type='checkbox'
        />
      </td>
      <td className='flex justify-center py-5'>
        <img
          className='h-36'
          src={imgurl + movie.poster_path}
          alt='not found'
        />
      </td>
      <td className='text-center'>{movie.title}</td>
      <td className='text-center'>{movie.vote_count}</td>
      <td className='text-center'>{movie.vote_average}</td>
      <td className='text-center'>
        {movie.release_date && movie.release_date.split('-')[0]}
      </td>
      <td className='text-center text-2xl'>
        <button onClick={() => deleteFavorite(movie.id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default Favorite;
