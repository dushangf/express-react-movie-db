import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/UserSlice';

const MovieDetails = () => {
  const [movie, setmovie] = useState({});

  const user = useSelector((state) => state.user);

  const url = process.env.REACT_APP_MOVIE_API;
  const imgurl = process.env.REACT_APP_MOVIE_IMG_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(
          url + '/movie/' + id + '?api_key=' + api_key
        );

        setmovie(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovieDetails();
  }, [id, api_key, url]);

  const favortie_ids = user.favorites.map((favorite) => favorite.id);

  const favorite_status = favortie_ids.indexOf(movie.id) !== -1;

  const addFavorites = (movie) => {
    if (!favorite_status) {
      const details = {
        email: user.email,
        movie: movie,
      };

      return dispatch(addFavorite(details));
    }
    return;
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-start'>
      <div className='w-full flex items-center p-20'>
        <Link className='mx-1' to='/'>
          Home
        </Link>
        <p className='mx-1'>{'>'}</p>
        <Link className='mx-1' to={`/movies/${movie.id}`}>
          {movie.title}
        </Link>
      </div>
      <div className='border p-10 flex flex-col xl:flex-row relative w-3/5 items-center h-max'>
        <img
          className='xl:h-96 w-3/5 xl:w-auto'
          src={imgurl + movie.poster_path}
          alt='not-found'
        />
        <div className='mx-5 w-full xl:w-max text-center'>
          <h1 className='text-3xl m-2 font-semibold text-center xl:text-left'>
            {movie.title}
          </h1>
          <h1 className='text-4xl m-2 font-semibold text-center xl:text-left'>
            {movie.release_date && movie.release_date.split('-')[0]}
          </h1>
          <div className='text-4xl xl:text-6xl m-3 font-bold flex flex-col xl:flex-row items-end w-full xl:w-max items-center'>
            <h1>
              {movie.vote_average && movie.vote_average.toFixed(1)}
              <span className='text-3xl text-gray-600 mx-2'>/ 10</span>
            </h1>
            <div className='mx-5'>
              <StarRatings
                rating={movie.vote_average && movie.vote_average.toFixed(2) / 2}
                starRatedColor='orange'
                starDimension='25px'
                numberOfStars={5}
              />
            </div>
          </div>
          <div className='flex text-2xl font-semibold m-3 w-full xl:w-max justify-center xl:justify-start'>
            |
            {movie.genres &&
              movie.genres.map((genre) => (
                <p className='pl-1 text-lg' key={genre.id}>
                  {genre.name}
                  <span className='pl-1 text-2xl'>|</span>
                </p>
              ))}
          </div>
          <div className='m-3 w-full xl:w-content text-center xl:text-left'>
            <h4 className='text-xl font-semibold'>Sypnosis</h4>
            <p className='text-lg my-2'>{movie.overview}</p>
          </div>
        </div>
        <button
          onClick={() => addFavorites(movie)}
          className={`absolute top-6 right-6 xl:top-14 xl:right-14 text-4xl p-4 rounded-xl ${
            favorite_status && 'bg-gray-100'
          }`}
        >
          <FaBookmark className='hover:scale-110 duration-200' />
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
