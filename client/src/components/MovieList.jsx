import React, { useState } from 'react';
import Movie from './Movie';
import Pagination from './Pagination';

const MovieList = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(3);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-full flex flex-col items-center'>
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
          {currentMovies.map((movie, idx) => (
            <Movie key={idx} movie={movie} />
          ))}
        </tbody>
      </table>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MovieList;
