import React from 'react';
import PropTypes from 'prop-types';
import Offer from '../offer/offer';
import Map from '../map/map';
import {offerProps} from '../prop-types/prop-types';
import Sort from '../sort/sort';

const OfferList = ({
  currentOffers,
  sortedOffers,
  city,
}) => {

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} places to stay in {city}</b>
        <Sort/>
        <div className="cities__places-list places__list tabs__content">
          {sortedOffers.map((offer) => <Offer cardOption="main" {...offer} key={offer.id} />)}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            points={currentOffers}
            city={city}
            cardOption={`main`}
          />
        </section>
      </div>
    </div>
  );
};

OfferList.propTypes = {
  currentOffers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  city: PropTypes.string.isRequired
};

export default React.memo(OfferList);
