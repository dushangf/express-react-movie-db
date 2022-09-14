import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { searchMovies, discoverMovies, getGenres } from '../redux/MoviesSlice';

const Search = ({ filters, setFilters }) => {
  const [query, setquery] = useState('');

  const genres = useSelector((state) => state.movies.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className='w-full flex flex-col items-center font-semibold'>
      <form
        className='h-10 m-4 flex items-center w-full md:w-1/2'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(searchMovies(query));
        }}
      >
        <button
          className='border-y-2 border-l-2 border-black rounded-l-full text-lg h-full px-3'
          type='submit'
        >
          <FaSearch />
        </button>
        <input
          className='border-y-2 border-r-2 border-black rounded-r-full h-full px-4 w-4/5 focus:border-0'
          placeholder='Search by title...'
          value={query}
          onChange={(e) => setquery(e.target.value)}
          type='text'
        />
        <button
          className='border-2 border-black rounded-full text-lg h-full px-3 mx-4 w-1/5'
          type='submit'
        >
          Search
        </button>
      </form>
      <div className='m-5 flex w-full justify-center'>
        <div className='flex flex-col mx-5 w-48'>
          <label htmlFor='rating' className='px-4'>
            Genre :{' '}
          </label>
          <select
            onChange={(e) => {
              setFilters({ ...filters, genre: e.target.value });
              setquery('');
              dispatch(discoverMovies({ ...filters, genre: e.target.value }));
            }}
            className='py-2 px-3 border rounded-full'
            name='rating'
            value={filters.genre}
          >
            <option value={''}>Select Genre</option>
            {genres.length > 0 &&
              genres.map((genre, idx) => (
                <option value={genre.id} key={idx}>
                  {genre.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-col mx-5 w-48'>
          <label htmlFor='rating' className='px-4'>
            Rating :{' '}
          </label>
          <select
            onChange={(e) => {
              setFilters({ ...filters, rating: Number(e.target.value) });
              setquery('');
              dispatch(
                discoverMovies({ ...filters, rating: Number(e.target.value) })
              );
            }}
            className='py-2 px-3 border rounded-full'
            name='rating'
            value={filters.rating}
          >
            <option value={''}>Select Rating</option>
            <option value={5}>5+</option>
            <option value={6}>6+</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
            <option value={9}>9+</option>
          </select>
        </div>
        <div className='flex flex-col mx-5 w-48'>
          <label htmlFor='year' className='px-4'>
            Year :{' '}
          </label>
          <select
            onChange={(e) => {
              setFilters({ ...filters, date: e.target.value });
              setquery('');
              dispatch(discoverMovies({ ...filters, date: e.target.value }));
            }}
            className='py-2 px-3 border rounded-full'
            name='year'
            value={filters.date}
          >
            <option value={''}>Select Year</option>
            <option value={'1980-01-01'}>1980</option>
            <option value={'1990-01-01'}>1990</option>
            <option value={'2000-01-01'}>2000</option>
            <option value={'2020-01-01'}>2020</option>
          </select>
        </div>
        <div className='flex flex-col mx-5 w-54'>
          <label htmlFor='order-by' className='px-4'>
            Order by :{' '}
          </label>
          <select
            onChange={(e) => {
              setFilters({ ...filters, sort_by: e.target.value });
              setquery('');
              dispatch(discoverMovies({ ...filters, sort_by: e.target.value }));
            }}
            className='py-2 px-3 border rounded-full'
            name='order-by'
            value={filters.sort_by}
          >
            <option value={''}>Order by</option>
            <option value='release_date.dec'>Year - (Newest)</option>
            <option value='release_date.asc'>Year - (Oldest)</option>
            <option value='vote_average.desc'>Rating - (High to Low)</option>
            <option value='vote_average.asc'>Rating - (Low to High)</option>
            <option value='original_title.asc'>Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
