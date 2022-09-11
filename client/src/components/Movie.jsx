import React from 'react';
import { HiBookmark } from 'react-icons/hi';

const Movie = ({ movie }) => {
  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;

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
        <button>
          <HiBookmark />
        </button>
      </td>
    </tr>
  );
};

export default Movie;
