import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import OfferList from '../../components/offer-list/offer-list';
import OfferEmpty from '../../components/offer-empty/offer-empty';
import {useDispatch, useSelector} from 'react-redux';
import {filterOffersByCity, sortOffers} from '../../utils';
import {fetchOfferList} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';
import {setActivePin, setOffer} from '../../store/action';

const Main = () => {
  const {city} = useSelector((state) => state.MAIN);
  const {isDataLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();
  const currentOffers = useSelector(filterOffersByCity);
  const sortedOffers = useSelector(sortOffers);

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchOfferList());
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      dispatch(setActivePin(``));
      dispatch(setOffer({}));
    }
  }, [city]);

  if (!isDataLoaded) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <ErrorMessage/>
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
                sortedOffers={sortedOffers}
                city={city}
              /> :
              <OfferEmpty city={city} />}
        </div>
      </main>
    </div>
  );
};

export default Main;
