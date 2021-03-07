import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/notFound/notFound';
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
        <Route exact path="/offer/:id"
          render={(props) => <Offer offers={offers} nearPlaces={offers} reviews={reviews} {...props} />}
        >
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
