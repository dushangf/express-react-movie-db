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

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);

  const movies = useSelector((state) => state.movies.movie_list);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const local_user = jwtDecode(localStorage.getItem('auth-token'));
      dispatch(getUser(local_user.id));
      setloggedIn(true);
    } catch (error) {
      return;
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route exact path='/favorites'>
          <Favorites />
        </Route>
        <Route exact path='/'>
          <div className='flex flex-col items-center'>
            <Header user={user} loggedIn={loggedIn} />
            <Search movies={movies} />
            <MovieList movies={movies} />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
