import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_MOVIE_API;
const api_key = process.env.REACT_APP_API_KEY;

export const searchMovies = createAsyncThunk('movies/search', async (query) => {
  const response = await axios.get(
    url + '/search/movie?api_key=' + api_key + '&query=' + query
  );

  return response.data;
});

export const discoverMovies = createAsyncThunk(
  'movies/discover',
  async (filters) => {
    const response = await axios.get(
      url +
        '/discover/movie?api_key=' +
        api_key +
        '&vote_average.gte=' +
        filters.rating +
        '&release_date.gte=' +
        filters.date +
        '&sort_by=' +
        filters.sort_by +
        '&with_genres=' +
        filters.genre
    );
    return response.data;
  }
);

export const getGenres = createAsyncThunk('movies/genre', async () => {
  const response = await axios.get(
    url + '/genre/movie/list?api_key=' + api_key
  );

  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies/get_movies',
  initialState: {
    genres: [],
    movie_list: [],
    pending: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [searchMovies.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [searchMovies.fulfilled]: (state, action) => {
      state.pending = false;
      state.movie_list = action.payload.results;
    },
    [searchMovies.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [discoverMovies.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [discoverMovies.fulfilled]: (state, action) => {
      state.pending = false;
      state.movie_list = action.payload.results;
    },
    [discoverMovies.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [getGenres.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getGenres.fulfilled]: (state, action) => {
      state.pending = false;
      state.genres = action.payload.genres;
    },
    [getGenres.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export default moviesSlice.reducer;
