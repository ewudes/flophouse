import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import {offerProps} from '../prop-types/prop-types';

const FavoritesItems = ({city, offers}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <Card cardOption="favorites" {...offer} key={offer.id} />)}
      </div>
    </li>
  );
};

FavoritesItems.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
};

export default FavoritesItems;
