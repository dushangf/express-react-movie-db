import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/UserSlice';

const Movie = ({ movie }) => {
  const [genre, setGenre] = useState({});

  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;

  const user = useSelector((state) => state.user);
  const allGenres = useSelector((state) => state.movies.genres);

  const dispatch = useDispatch();

  const addFavorites = (movie) => {
    const favortie_ids = user.favorites.map((favorite) => favorite.id);

    if (favortie_ids.indexOf(movie.id) === -1) {
      const details = {
        email: user.email,
        movie: movie,
      };

      return dispatch(addFavorite(details));
    }
    return;
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
    <tr className='h-full border-b border-x first:border-t even:bg-gray-50 odd:bg-gray-100'>
      <td className='flex justify-center py-5'>
        <Link to={`/movies/${movie.id}`}>
          <img
            className='h-36'
            src={imgurl + movie.poster_path}
            alt='not found'
          />
        </Link>
      </td>
      <td className='text-center'>{movie.title}</td>
      <td className='text-center'>{genre && genre.name}</td>
      <td className='text-center'>{movie.vote_average}</td>
      <td className='text-center'>
        {movie.release_date && movie.release_date.split('-')[0]}
      </td>
      <td className='text-center text-2xl'>
        <button
          className='hover:scale-125 duration-200'
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
