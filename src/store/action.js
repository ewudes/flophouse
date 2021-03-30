import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  SET_ACTIVE_PIN: `main/setActivePin`,
  DELETE_ACTIVE_PIN: `main/deleteActivePin`,
  CHANGE_SORT: `main/changeSort`,
  LOAD_OFFERS: `data/loadOffers`,
  SET_OFFER: `data/setOffer`,
  SET_REVIEWS: `data/setReviews`,
  SET_NEARBY_OFFERS: `data/setNearbyOffers`,
  REQUIRED_AUTHORIZATION: `data/requiredAuthorization`,
  SET_LOADING_REVIEW_STATUS: `data/setLoadingReviewStatus`,
  CHANGE_USER_NAME: `user/changeUserName`,
  CHANGE_USER_AVATAR: `user/changeUserAvatar`,
  SET_FAVORITES: `data/setFavorites`,
  ADD_FAVORITES: `data/addFavorites`,
  REMOVE_FAVORITES: `data/removeFavorites`,
  TOGGLE_FAVORITE: `data/toggleFavorite`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
  SET_ERROR_MESSAGE: `user/setErrorMessage`
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => {
  return {
    payload: city
  };
});

export const setActivePin = createAction(ActionType.SET_ACTIVE_PIN, (id) => {
  return {
    payload: id
  };
});

export const deleteActivePin = createAction(ActionType.DELETE_ACTIVE_PIN);

export const changeSort = createAction(ActionType.CHANGE_SORT, (currentSort) => {
  return {
    payload: currentSort
  };
});

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const setOffer = createAction(ActionType.SET_OFFER, (offer) => {
  return {
    payload: offer
  };
});

export const setReviews = createAction(ActionType.SET_REVIEWS, (reviews) => {
  return {
    payload: reviews
  };
});

export const setLoadingReviewStatus = createAction(ActionType.SET_LOADING_REVIEW_STATUS, (status) => {
  return {
    payload: status
  };
});

export const setNearbyOffers = createAction(ActionType.SET_NEARBY_OFFERS, (nearbyOffers) => {
  return {
    payload: nearbyOffers
  };
});

export const requiredAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

export const changeUserAvatar = createAction(ActionType.CHANGE_USER_AVATAR, (avatarUrl) => {
  return {
    payload: avatarUrl
  };
});

export const changeUserName = createAction(ActionType.CHANGE_USER_NAME, (userName) => {
  return {
    payload: userName
  };
});

export const setFavorites = createAction(ActionType.SET_FAVORITES, (favorites) => {
  return {
    payload: favorites
  };
});

export const addFavorites = createAction(ActionType.ADD_FAVORITES, (favoriteOffer) => {
  return {
    payload: favoriteOffer
  };
});

export const removeFavorites = createAction(ActionType.REMOVE_FAVORITES, (id) => {
  return {
    payload: id
  };
});

export const toggleFavorite = createAction(ActionType.TOGGLE_FAVORITE, (id) => {
  return {
    payload: id
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});

export const setErrorMessage = createAction(ActionType.SET_ERROR_MESSAGE, (message) => {
  return {
    payload: message
  };
});
