import React from 'react';
import { FaBookmark } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/UserSlice';

const Movie = ({ movie }) => {
  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addFavorites = (movie) => {
    const details = {
      email: user.email,
      movie: movie,
    };
    dispatch(addFavorite(details));
  };

  return (
    <tr className='h-full border-b border-x first:border-t even:bg-gray-50 odd:bg-gray-100'>
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
        <button
          onClick={() => {
            addFavorites(movie);
          }}
        >
          <FaBookmark />
        </button>
      </td>
    </tr>
  );
};

export default Movie;
