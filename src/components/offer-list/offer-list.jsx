import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import {offerProps} from '../prop-types/prop-types';

const OfferList = ({
  currentOffers,
  city
}) => {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffers.length} places to stay in {city}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref={`#icon-arrow-select`}></use>
            </svg>
          </span>
          {/* <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul> */}
        </form>
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
