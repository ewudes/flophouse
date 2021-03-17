
export const ActionType = {
  CHANGE_CITY: `changeCity`,
  SET_ACTIVE_PIN: `setActivePin`,
  DELETE_ACTIVE_PIN: `deleteActivePin`,
  CHANGE_SORT: `changeSort`,
  LOAD_OFFERS: `loadOffers`,
  SET_OFFER: `setOffer`,
  SET_REVIEWS: `setReviews`,
  SET_NEARBY_OFFERS: `setNearbyOffers`,
  REQUIRED_AUTHORIZATION: `requiredAuthorization`
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
