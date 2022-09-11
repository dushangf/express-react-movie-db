import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './MoviesSlice';
import userReducer from './UserSlice';

export default configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});
