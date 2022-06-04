import React from 'react';
import PropTypes from 'prop-types';
import Offer from '../offer/offer';
import {offerProps} from '../prop-types/prop-types';

const NearPlacesList = ({nearPlaces}) => {
  return (
    <>
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearPlaces.map((place) => <Offer cardOption="offer" {...place} key={place.id} />)}
      </div>
    </>
  );
};

NearPlacesList.propTypes = {
  nearPlaces: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
};

export default React.memo(NearPlacesList);
