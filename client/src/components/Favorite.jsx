import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, deleteSelect } from '../redux/UserSlice';

const Favorite = ({ movie }) => {
  const [genre, setGenre] = useState({});

  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;

  const user = useSelector((state) => state.user);
  const allGenres = useSelector((state) => state.movies.genres);

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

  useEffect(() => {
    const setGenreName = () => {
      allGenres &&
        movie.genre_ids &&
        setGenre(allGenres.find((genre) => genre.id === movie.genre_ids[0]));
    };

    setGenreName();
  }, [allGenres, movie.genre_ids]);

  return (
    <tr className='h-full font-semibold border-b border-x first:border-t even:bg-gray-50 odd:bg-gray-100 px-5'>
      <td className='h-full text-center pl-4'>
        <input
          onChange={() => dispatch(deleteSelect(selectDelete))}
          className='appearance-none h-4 w-4 border border-gray-500 rounded-full bg-white checked:bg-black checked:border-black duration-200 p-2 cursor-pointer'
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
      <td className='text-center'>{genre.name}</td>
      <td className='text-center'>{movie.vote_average}</td>
      <td className='text-center'>
        {movie.release_date && movie.release_date.split('-')[0]}
      </td>
      <td className='text-center text-2xl pr-4'>
        <button onClick={() => deleteFavorite(movie.id)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default Favorite;
