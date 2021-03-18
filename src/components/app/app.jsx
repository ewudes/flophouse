import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/not-found/not-found';
import {AppRoute} from '../../const';

const App = ({
  userName
}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <Route exact path={AppRoute.OFFER}>
          <Offer userName={userName} />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites userName={userName}/>
        </Route>
        <Route exact path={AppRoute.MAIN}>
          <Main userName={userName}/>
        </Route>
        <Route>
          <PageNotFound userName={userName}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  userName: PropTypes.string,
};

export default App;
