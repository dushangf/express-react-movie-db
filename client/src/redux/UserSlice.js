import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_ACCOUNTS_API;

export const userLogin = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post(url + '/users/login', credentials);

  localStorage.setItem('auth-token', response.data.token);

  return response.data;
});

export const getUser = createAsyncThunk('user', async (id) => {
  const headers = {
    headers: { authorization: localStorage.getItem('auth-token') },
  };

  const response = await axios.get(url + '/users/' + id, headers);

  return response.data;
});

export const addFavorite = createAsyncThunk(
  'user/favorites',
  async (details) => {
    const headers = {
      headers: { authorization: localStorage.getItem('auth-token') },
    };

    const response = await axios.put(
      url + '/users/add/favorite',
      details,
      headers
    );

    return response.data;
  }
);

export const removeFavorite = createAsyncThunk(
  'user/favorites',
  async (details) => {
    const headers = {
      headers: { authorization: localStorage.getItem('auth-token') },
    };

    const response = await axios.put(
      url + '/users/remove/favorite',
      details,
      headers
    );

    return response.data;
  }
);

export const removeFavorites = createAsyncThunk(
  'user/favorites',
  async (details) => {
    const headers = {
      headers: { authorization: localStorage.getItem('auth-token') },
    };

    const response = await axios.put(
      url + '/users/remove/favorites',
      details,
      headers
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user/login',
  initialState: {
    name: '',
    id: '',
    email: '',
    token: '',
    favorites: [],
    pending: null,
  },
  reducers: {
    deleteSelect: (state, action) => {
      state.favorites.forEach((movie) => {
        if (movie.id === action.payload.id) {
          movie.delete = action.payload.value;
        }
      });
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.name = action.payload.user;
      state.id = action.payload._id;
      state.favorites = action.payload.favorites;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.pending = false;
    },
    [userLogin.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [getUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.user;
      state.email = action.payload.email;
      state.favorites = action.payload.favorites;
      state.pending = false;
    },
    [getUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
    [addFavorite.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.favorites = action.payload.favorites;
      state.pending = false;
    },
    [addFavorite.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { deleteSelect } = userSlice.actions;

export default userSlice.reducer;
