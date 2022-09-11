import React from 'react';
import Movie from './Movie';

const MovieList = ({ movies }) => {
  return (
    <table className='w-5/6'>
      {movies.length > 0 && (
        <thead>
          <tr className='bg-gray-300'>
            <th className='text-center py-5'>Image</th>
            <th className='text-center py-5'>Title</th>
            <th className='text-center py-5'>Genre</th>
            <th className='text-center py-5'>Rating</th>
            <th className='text-center py-5'>Year</th>
            <th className='text-center py-5'>Action</th>
          </tr>
        </thead>
      )}

      <tbody className='font-semibold text-lg'>
        {movies.map((movie, idx) => (
          <Movie key={idx} movie={movie} />
        ))}
      </tbody>
    </table>
  );
};

export default MovieList;
