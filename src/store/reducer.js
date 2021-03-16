import {offers} from "../mocks/offers";
import {ActionType} from "./action";
import {SORT_TYPES} from "../const";

const initialState = {
  city: `Paris`,
  offers,
  activeOffer: false,
  currentSort: SORT_TYPES.POPULAR,
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
    default:
      return state;
  }
};

export {reducer};
