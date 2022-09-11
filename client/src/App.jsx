import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Search from './components/Search';
import MovieList from './components/MovieList';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  const movies = useSelector((state) => state.movies.movie_list);
  return (
    <div>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
        <Route exact path='/'>
          <div className='flex flex-col items-center'>
            <Header />
            <Search movies={movies} />
            <MovieList movies={movies} />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
