import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getUser } from './redux/UserSlice';

import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';
import { getGenres } from './redux/MoviesSlice';

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);

  const [filters, setFilters] = useState({
    genre: '',
    rating: 0,
    date: '',
    sort_by: '',
  });

  const movies = useSelector((state) => state.movies.movie_list);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getGenres());
      const local_user = jwtDecode(localStorage.getItem('auth-token'));
      dispatch(getUser(local_user.id));
      setloggedIn(true);
    } catch (error) {
      return;
    }
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route exact path='/movies/:id'>
          <MovieDetails />
        </Route>
        <Route exact path='/login'>
          <Login loggedIn={loggedIn} />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
        <Route exact path='/'>
          <div className='flex flex-col items-center'>
            <Header loggedIn={loggedIn} />
            <Search filters={filters} setFilters={setFilters} />
            <MovieList movies={movies} />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
