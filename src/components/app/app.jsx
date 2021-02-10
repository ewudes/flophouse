import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';

const App = ({
  cards
}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main cards={cards} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites cards={cards} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  cards: PropTypes.array.isRequired
};

export default App;
