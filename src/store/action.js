
export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  SET_ACTIVE_PIN: `main/setActivePin`,
  DELETE_ACTIVE_PIN: `main/deleteActivePin`,
  CHANGE_SORT: `main/changeSort`,
  LOAD_OFFERS: `data/loadOffers`,
  SET_OFFER: `data/setOffer`,
  SET_REVIEWS: `data/setReviews`,
  SET_NEARBY_OFFERS: `data/setNearbyOffers`,
  REQUIRED_AUTHORIZATION: `data/requiredAuthorization`
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  setActivePin: (id) => ({
    type: ActionType.SET_ACTIVE_PIN,
    payload: id
  }),
  deleteActivePin: () => ({
    type: ActionType.DELETE_ACTIVE_PIN
  }),
  changeSort: (currentSort) => ({
    type: ActionType.CHANGE_SORT,
    payload: currentSort
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  setOffer: (offer) => ({
    type: ActionType.SET_OFFER,
    payload: offer
  }),
  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews
  }),
  setNearbyOffers: (nearbyOffers) => ({
    type: ActionType.SET_NEARBY_OFFERS,
    payload: nearbyOffers
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
};
