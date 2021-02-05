import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const App = ({
  cards
}) => {
  return (
    <Main cards={cards}/>
  );
};

App.propTypes = {
  cards: PropTypes.array.isRequired
};

export default App;
