import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_ACCOUNTS_API;

export const userLogin = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post(url + '/users/login', credentials);

  localStorage.setItem('auth-token', response.data.token);

  return response.data;
});

const userSlice = createSlice({
  name: 'user/login',
  initialState: {
    name: '',
    email: '',
    token: '',
    message: '',
    status: '',
    pending: null,
  },
  reducers: {
    localUpdate: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.first_name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.name = action.payload.user;
      state.email = action.payload.email;
      state.token = action.payload.token;
      console.log(action.payload);
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.pending = false;
    },
    [userLogin.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { localUpdate } = userSlice.actions;

export default userSlice.reducer;
