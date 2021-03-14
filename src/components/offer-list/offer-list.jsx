import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import {offerProps} from '../prop-types/prop-types';
import Sort from '../sort/sort';

const OfferList = ({
  currentOffers,
  city,
}) => {

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} places to stay in {city}</b>
        <Sort/>
        <div className="cities__places-list places__list tabs__content">
          {currentOffers.map((card) => <Card cardOption="main" {...card} key={card.id} />)}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            points={currentOffers}
            city={city}
          />
        </section>
      </div>
    </div>
  );
};

OfferList.propTypes = {
  currentOffers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  city: PropTypes.string.isRequired
};

export default OfferList;
