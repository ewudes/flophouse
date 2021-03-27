import {SortType, AuthorizationStatus} from './const';

export const filterOffersByCity = (city, offers) => offers.filter((offer) => offer.city.name === city);

export const sortOffers = (currentSort, offers) => {
  switch (currentSort) {
    case SortType.LOW_PRICE:
      return offers.sort((a, b) => a.price - b.price);
    case SortType.HIGH_PRICE:
      return offers.sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const compareDates = (a, b) => (
  Date.parse(a.date) - Date.parse(b.date)
);

export const isAuthorized = (status) => status === AuthorizationStatus.AUTH;
