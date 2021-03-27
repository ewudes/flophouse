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
  CHANGE_USER_NAME: `user/changeUserName`,
  CHANGE_USER_AVATAR: `user/changeUserAvatar`,
  SET_FAVORITES: `data/setFavorites`,
  ADD_FAVORITES: `data/addFavorites`,
  REMOVE_FAVORITES: `data/removeFavorites`,
  TOGGLE_FAVORITE: `data/toggleFavorite`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
  SET_ERROR_MESSAGE: `error/setErrorMessage`
};

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city
});

export const setActivePin = (id) => ({
  type: ActionType.SET_ACTIVE_PIN,
  payload: id
});

export const deleteActivePin = () => ({
  type: ActionType.DELETE_ACTIVE_PIN
});

export const changeSort = (currentSort) => ({
  type: ActionType.CHANGE_SORT,
  payload: currentSort
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers
});

export const setOffer = (offer) => ({
  type: ActionType.SET_OFFER,
  payload: offer
});

export const setReviews = (reviews) => ({
  type: ActionType.SET_REVIEWS,
  payload: reviews
});

export const setNearbyOffers = (nearbyOffers) => ({
  type: ActionType.SET_NEARBY_OFFERS,
  payload: nearbyOffers
});

export const requiredAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status
});

export const changeUserAvatar = (avatarUrl) => ({
  type: ActionType.CHANGE_USER_AVATAR,
  payload: avatarUrl
});

export const changeUserName = (userName) => ({
  type: ActionType.CHANGE_USER_NAME,
  payload: userName
});

export const setFavorites = (favorites) => ({
  type: ActionType.SET_FAVORITES,
  payload: favorites
});

export const addFavorites = (favoriteOffer) => ({
  type: ActionType.ADD_FAVORITES,
  payload: favoriteOffer
});

export const removeFavorites = (id) => ({
  type: ActionType.REMOVE_FAVORITES,
  payload: id
});

export const toggleFavorite = (id) => ({
  type: ActionType.TOGGLE_FAVORITE,
  payload: id
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

export const setErrorMessage = (message) => ({
  type: ActionType.SET_ERROR_MESSAGE,
  payload: message
});
