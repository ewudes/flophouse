import {createReducer} from '@reduxjs/toolkit';
import {
  loadOffers,
  setFavorites,
  setNearbyOffers,
  setOffer,
  setReviews,
  addFavorites,
  removeFavorites,
  toggleFavorite
} from '../action';

const getItem = (list, id) => {
  const listId = list.map((item) => item.id);
  return listId.indexOf(id);
};

const addFavoritess = (newFavorite, currentFavorites) => {
  return [...currentFavorites, newFavorite];
};

const toggleFavoritee = (offer, currentOffers) => {
  const cardId = getItem(currentOffers, offer.id);
  return cardId !== -1
    ? [...currentOffers.slice(0, cardId), offer, ...currentOffers.slice((cardId + 1), currentOffers.length)]
    : currentOffers;
};

const removeFavoritess = (offerId, currentFavorites) => {
  const cardId = getItem(currentFavorites, offerId);
  return (
    [...currentFavorites.slice(0, cardId), ...currentFavorites.slice((cardId + 1), currentFavorites.length)]
  );
};

const initialState = {
  offers: [],
  offer: {},
  isDataLoaded: false,
  reviews: [],
  nearbyOffers: [],
  isFavoritesLoaded: false,
  favorites: [],
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(setOffer, (state, action) => {
    state.offer = action.payload;
  });

  builder.addCase(setReviews, (state, action) => {
    state.reviews = action.payload;
  });

  builder.addCase(setNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload;
  });

  builder.addCase(setFavorites, (state, action) => {
    state.favorites = action.payload;
    state.isFavoritesLoaded = true;
  });

  builder.addCase(addFavorites, (state, action) => {
    state.favorites = addFavoritess(action.payload, state.favorites);
  });

  builder.addCase(removeFavorites, (state, action) => {
    state.favorites = removeFavoritess(action.payload, state.favorites);
  });

  builder.addCase(toggleFavorite, (state, action) => {
    state.offers = toggleFavoritee(action.payload, state.offers);
    state.nearbyOffers = toggleFavoritee(action.payload, state.nearbyOffers);
    state.offer = Object.assign({}, state.offer, {isFavorite: !state.offer.isFavorite});
  });
});

export {data};
