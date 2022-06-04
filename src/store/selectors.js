import {createSelector} from 'reselect';
import {NameSpace} from './root-reducer';
import {SortType} from '../const';

const getOffers = (state) => state[NameSpace.DATA].offers;

export const getOffer = (state) => state[NameSpace.DATA].offer;
export const getNearbyOffers = (state) => state[NameSpace.DATA].nearbyOffers;
export const getReviews = (state) => state[NameSpace.DATA].reviews;
export const getFavorites = (state) => state[NameSpace.DATA].favorites;
export const checkFavoritesLoaded = (state) => state[NameSpace.DATA].isFavoritesLoaded;
export const checkDataLoaded = (state) => state[NameSpace.DATA].isDataLoaded;
export const getReviewLoadingStatus = (state) => state[NameSpace.DATA].reviewLoadingStatus;

export const getCity = (state) => state[NameSpace.MAIN].city;
export const getActiveOffer = (state) => state[NameSpace.MAIN].activeOffer;
export const getSort = (state) => state[NameSpace.MAIN].currentSort;

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getErrorMessage = (state) => state[NameSpace.USER].errorMessage;
export const getUserName = (state) => state[NameSpace.USER].userName;
export const getAvatarUrl = (state) => state[NameSpace.USER].avatarUrl;

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

