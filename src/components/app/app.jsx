import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favoritesWrap/favoritesWrap';
import Offer from '../offer/offer';
import PageNotFound from '../pageNotFound/pageNotFound';
import {cardProps, commentProps} from '../propTypes/propTypes';

const App = ({
  cards,
  comments
}) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/offer/:id">
          <Offer card={cards[0]} otherPlaces={cards} comments={comments} />
        </Route>
        <Route exact path="/favorites">
          <Favorites cards={cards} />
        </Route>
        <Route exact path="/">
          <Main cards={cards} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(cardProps)).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentProps)).isRequired,
};

export default App;
