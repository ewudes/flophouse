import {ActionType} from "./action";
import {AuthorizationStatus, SORT_TYPES} from "../const";

const getItem = (list, id) => {
  const listId = list.map((item) => item.id);
  return listId.indexOf(id);
};

const addFavorites = (newFavorite, currentFavorites) => {
  return [...currentFavorites, newFavorite];
};

const toggleFavorite = (offer, currentOffers) => {
  const cardId = getItem(currentOffers, offer.id);
  return (
    [...currentOffers.slice(0, cardId), offer, ...currentOffers.slice((cardId + 1), currentOffers.length)]
  );
};

const removeFavorites = (offerId, currentFavorites) => {
  const cardId = getItem(currentFavorites, offerId);
  return (
    [...currentFavorites.slice(0, cardId), ...currentFavorites.slice((cardId + 1), currentFavorites.length)]
  );
};

const initialState = {
  city: `Paris`,
  offers: [],
  offer: {},
  activeOffer: false,
  currentSort: SORT_TYPES.POPULAR,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  reviews: [],
  nearbyOffers: [],
  userName: ``,
  isFavoritesLoaded: false,
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case ActionType.SET_ACTIVE_PIN:
      return {
        ...state,
        activeOffer: action.payload
      };
    case ActionType.DELETE_ACTIVE_PIN:
      return {
        ...state,
        activeOffer: false
      };
    case ActionType.CHANGE_SORT:
      return {
        ...state,
        currentSort: action.payload
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };
    case ActionType.SET_OFFER:
      return {
        ...state,
        offer: action.payload,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };
    case ActionType.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ActionType.SET_NEARBY_OFFERS:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case ActionType.CHANGE_USER_NAME:
      return {
        ...state,
        userName: action.payload
      };
    case ActionType.SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        isFavoritesLoaded: true
      };
    case ActionType.ADD_FAVORITES:
      return {
        ...state,
        favoriteList: addFavorites(action.payload, state.favorites),
      };
    case ActionType.REMOVE_FAVORITES:
      return {
        ...state,
        favoriteList: removeFavorites(action.payload, state.favorites),
      };
    case ActionType.TOGGLE_FAVORITE:
      return {
        ...state,
        offers: toggleFavorite(action.payload, state.offers),
      };
    default:
      return state;
  }
};

export {reducer};
