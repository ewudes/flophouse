import {SortType} from '../../const';
import {
  changeCity,
  deleteActivePin,
  setActivePin,
  changeSort
} from '../action';
import {main} from './main';

describe(`Reducer work correctly`, () => {
  it(`Reducer with no additional parameters should return initial state`, () => {
    expect(main(undefined, {}))
      .toEqual({
        city: `Paris`,
        activeOffer: false,
        currentSort: SortType.POPULAR,
      });
  });

  it(`Reducer should change city`, () => {
    const state = {city: `Paris`};

    expect(main(state, changeCity(`Amsterdam`)))
      .toEqual({
        city: `Amsterdam`
      });
  });

  it(`Reducer should set active offer`, () => {
    const state = {activeOffer: false};

    expect(main(state, setActivePin(2)))
      .toEqual({
        activeOffer: 2
      });
  });

  it(`Reducer should remove active offer`, () => {
    const state = {activeOffer: 2};

    expect(main(state, deleteActivePin()))
      .toEqual({
        activeOffer: false
      });
  });

  it(`Reducer should change sorting type`, () => {
    const state = {currentSort: `Popular`};

    expect(main(state, changeSort(`High to low`)))
      .toEqual({
        currentSort: `High to low`
      });
  });
});
