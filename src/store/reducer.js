import {offers} from "../mocks/offers";
import {ActionType} from './action';

const initialState = {
  city: `Paris`,
  offers
};

const getOffers = (city) => {
  offers.filter((offer) => offer.city.name === city);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: getOffers(state.city)
      };
    default:
      return state;
  }
};

export {reducer};
