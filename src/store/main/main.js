import {createReducer} from '@reduxjs/toolkit';
import {SortType} from '../../const';
import {
  changeCity,
  deleteActivePin,
  setActivePin,
  changeSort
} from '../action';

const initialState = {
  city: `Paris`,
  activeOffer: false,
  currentSort: SortType.POPULAR,
};

const main = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setActivePin, (state, action) => {
    state.activeOffer = action.payload;
  });

  builder.addCase(deleteActivePin, (state, action) => {
    state.activeOffer = action.payload;
  });

  builder.addCase(changeSort, (state, action) => {
    state.currentSort = action.payload;
  });
});

export {main};
