import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import OfferList from '../../components/offer-list/offer-list';
import OfferEmpty from '../../components/offer-empty/offer-empty';
import {offerProps} from '../../components/prop-types/prop-types';
import {connect} from 'react-redux';
import {filterOffersByCity} from "../../utils";

const Main = ({
  offers,
  city
}) => {
  const currentOffers = filterOffersByCity(city, offers);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!currentOffers.length && `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        <div className="cities">
          {
            currentOffers.length ?
              <OfferList
                currentOffers={currentOffers}
                city={city}
              /> :
              <OfferEmpty city={city} />}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  city: PropTypes.string.isRequired
};

const mapStateToProps = ({offers, city}) => ({
  offers,
  city
});

export {Main};
export default connect(mapStateToProps, null)(Main);
