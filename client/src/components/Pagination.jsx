import React from 'react';

const Pagination = ({ moviesPerPage, totalMovies, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='p-8'>
      {pageNumbers.map((number) => (
        <button
          className={`border py-2 px-4 rounded hover:bg-gray-200 duration-200 font-semibold text-xl ${
            currentPage == number && 'bg-gray-200'
          }`}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
