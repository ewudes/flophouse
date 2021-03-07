import React from 'react';
import Card from '../card/card';

const nearPlacesWrap = ({nearPlaces}) => {
  return (
    <>
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearPlaces.map((place) => <Card cardOption="offer" {...place} key={place.id} />)}
      </div>
    </>
  );
};

export default nearPlacesWrap;
