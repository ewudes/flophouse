import React from 'react';
import {connect} from 'react-redux';

import {PropTypes} from 'prop-types';
import {ActionCreator} from '../../store/action';
import {SORT_LIST} from '../../const';

const Sort = ({changeSort, currentSort}) => {
  const handleClickSort = (evt) => {
    changeSort(evt.currentTarget.dataset.sortType);
  };
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {
        SORT_LIST.map(({text, type}) =>
          <li
            key={type}
            className={`places__option ${currentSort === type ? `places__option--active` : ``}`}
            data-sort-type={type}
            tabIndex={0}
            onClick={handleClickSort}
          >
            {text}
          </li>
        )
      }
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeSort(currentSort) {
    dispatch(ActionCreator.changeSort(currentSort));
  }
});

const mapStateToProps = (state) => ({
  currentSort: state.currentSort
});

Sort.propTypes = {
  changeSort: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired
};


export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
