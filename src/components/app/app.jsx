import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favoritesWrap/favoritesWrap';
import Offer from '../offer/offer';
import PageNotFound from '../pageNotFound/pageNotFound';
import {offerProps, reviewProps} from '../propTypes/propTypes';

const App = ({
  offers,
  reviews
}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/offer/:id">
          <Offer offer={offers[0]} otherPlaces={offers} reviews={reviews} />
        </Route>
        <Route exact path="/favorites">
          <Favorites offers={offers} />
        </Route>
        <Route exact path="/">
          <Main offers={offers} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProps)).isRequired,
};

export default App;
