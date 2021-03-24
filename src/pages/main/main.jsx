import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import OfferList from '../../components/offer-list/offer-list';
import OfferEmpty from '../../components/offer-empty/offer-empty';
import {offerProps} from '../../components/prop-types/prop-types';
import {connect} from 'react-redux';
import {filterOffersByCity} from "../../utils";
import {sortOffers} from '../../utils';
import {fetchOfferList} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

const Main = ({
  offers,
  city,
  isDataLoaded,
  onLoadData
}) => {
  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!offers.length && `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        <div className="cities">
          {
            offers.length ?
              <OfferList
                currentOffers={offers}
                city={city}
              /> :
              <OfferEmpty city={city} />}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = ({offers, city, currentSort, isDataLoaded}) => ({
  offers: sortOffers(currentSort, filterOffersByCity(city, offers)),
  city,
  isDataLoaded
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOfferList());
  }
});

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerProps)).isRequired,
  city: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
