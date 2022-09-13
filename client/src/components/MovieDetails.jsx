import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/UserSlice";
import { FaBookmark } from "react-icons/fa";

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
          url + "/movie/" + id + "?api_key=" + api_key
        );

        setmovie(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovieDetails();
  }, [id, api_key, url]);

  const addFavorites = (movie) => {
    const favortie_ids = user.favorites.map((favorite) => favorite.id);

    if (favortie_ids.indexOf(movie.id) == -1) {
      const details = {
        email: user.email,
        movie: movie,
      };

      return dispatch(addFavorite(details));
    }
    return;
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="border p-10 flex relative w-3/5 my-20 items-center h-96">
        <img className="h-full" src={imgurl + movie.poster_path} alt="" />
        <div>
          <h1 className="text-2xl m-2">{movie.title}</h1>
          <h1 className="text-3xl m-2">
            {movie.release_date && movie.release_date.split("-")[0]}
          </h1>
          <h1 className="text-5xl m-3">
            {movie.vote_average && movie.vote_average.toFixed(1)}
            <span className="text-3xl text-gray-600 mx-2">/ 10</span>
          </h1>
          <button
            onClick={() => addFavorites(movie)}
            className="absolute top-14 right-14 text-4xl hover:scale-110 duration-200"
          >
            <FaBookmark />
          </button>
          <div className="m-3">
            <h4 className="text-lg font-semibold">Sypnosis</h4>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
