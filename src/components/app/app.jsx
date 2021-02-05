import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const App = ({
  cardCount
}) => {
  return (
    <Main cardCount={cardCount}/>
  );
};

App.propTypes = {
  cardCount: PropTypes.number.isRequired
};

export default App;
