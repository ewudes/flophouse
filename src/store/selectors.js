import {createSelector} from 'reselect';
import {NameSpace} from './root-reducer';
import {SortType} from '../const';

const getOffers = (state) => state[NameSpace.DATA].offers;
const getCity = (state) => state[NameSpace.MAIN].city;
const getSort = (state) => state[NameSpace.MAIN].currentSort;

export const filterOffersByCity = createSelector(
    [getOffers, getCity],
    (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const sortOffers = createSelector(
    [filterOffersByCity, getSort],
    (offers, currentSort) => {
      const currentOffers = offers.slice();
      switch (currentSort) {
        case SortType.LOW_PRICE:
          return currentOffers.sort((a, b) => a.price - b.price);
        case SortType.HIGH_PRICE:
          return currentOffers.sort((a, b) => b.price - a.price);
        case SortType.TOP_RATED:
          return currentOffers.sort((a, b) => b.rating - a.rating);
        default:
          return offers;
      }
    }
);
