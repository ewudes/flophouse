import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeSort} from '../../store/action';
import {SortList, SortText} from '../../const';
import {getSort} from '../../store/selectors';

const Sort = () => {
  const currentSort = useSelector(getSort);
  const dispatch = useDispatch();
  const selectRef = useRef();

  const handleClickSelect = () => {
    selectRef.current.classList.toggle(`places__options--opened`);
  };

  const handleClickSortType = (evt) => {
    dispatch(changeSort(evt.currentTarget.dataset.sortType));
    selectRef.current.classList.remove(`places__options--opened`);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={handleClickSelect}
      >
        {SortText[currentSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref={`#icon-arrow-select`}></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={selectRef}>
        {
          SortList.map(({text, type}) =>
            <li
              key={type}
              className={`places__option ${currentSort === type ? `places__option--active` : ``}`}
              data-sort-type={type}
              tabIndex={0}
              onClick={handleClickSortType}
            >
              {text}
            </li>
          )
        }
      </ul>
    </form>
  );
};

export default React.memo(Sort);
