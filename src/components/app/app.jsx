import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/not-found/not-found';
import {AppRoute} from '../../const';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';

const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <PrivateRoute exact path={AppRoute.LOGIN} render={()=> <Login />} />
        <Route exact path={AppRoute.OFFER}>
          <Offer />
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES} render={() => <Favorites />} />
        <Route exact path={AppRoute.MAIN}>
          <Main />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
