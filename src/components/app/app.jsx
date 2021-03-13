import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/not-found/not-found';
import {reviewProps} from '../prop-types/prop-types';

const App = ({
  reviews
}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/offer/:id"
          render={(props) => <Offer reviews={reviews} {...props} />}
        >
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewProps)).isRequired,
};

export default App;
