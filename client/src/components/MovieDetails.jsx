import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/UserSlice';
import { FaBookmark } from 'react-icons/fa';

const MovieDetails = () => {
  const [movie, setmovie] = useState({});
  const [genres, setgenres] = useState([]);

  const user = useSelector((state) => state.user);
  const allGenres = useSelector((state) => state.movies.genres);

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

        setgenres(
          allGenres.filter((genre) => movie.genre_ids.includes(genre.id))
        );
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
    <div className='h-full w-full flex flex-col items-center'>
      <div className='border p-10 flex relative w-3/5 my-20 items-center h-max'>
        <img className='h-96' src={imgurl + movie.poster_path} alt='' />
        <div className='mx-5'>
          <h1 className='text-3xl m-2 font-semibold'>{movie.title}</h1>
          <h1 className='text-4xl m-2 font-semibold'>
            {movie.release_date && movie.release_date.split('-')[0]}
          </h1>
          <div>
            {genres &&
              genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
          </div>
          <h1 className='text-6xl m-3 font-bold'>
            {movie.vote_average && movie.vote_average.toFixed(1)}
            <span className='text-3xl text-gray-600 mx-2'>/ 10</span>
          </h1>
          <button
            onClick={() => addFavorites(movie)}
            className={`absolute top-14 right-14 text-4xl p-4 rounded-xl ${
              favorite_status && 'bg-gray-100'
            }`}
          >
            <FaBookmark className='hover:scale-110 duration-200' />
          </button>
          <div className='m-3'>
            <h4 className='text-xl font-semibold'>Sypnosis</h4>
            <p className='text-lg my-2'>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
